-- Create functions to analyze OrioleDB tables and performance

-- Function to get OrioleDB table statistics
CREATE OR REPLACE FUNCTION get_orioledb_stats(table_name text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result jsonb;
BEGIN
  -- Ensure the table exists
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = table_name) THEN
    RETURN jsonb_build_object('error', 'Table not found');
  END IF;

  -- Get OrioleDB table pages info
  BEGIN
    WITH page_info AS (
      SELECT * FROM orioledb_table_pages(table_name)
    ),
    summary AS (
      SELECT
        count(*) as total_pages,
        sum(level) as total_levels,
        max(level) as max_level,
        sum(tuples) as total_tuples,
        avg(free_space) as avg_free_space,
        sum(CASE WHEN is_leaf THEN 1 ELSE 0 END) as leaf_pages
      FROM page_info
    )
    SELECT
      jsonb_build_object(
        'table_name', table_name,
        'total_pages', total_pages,
        'total_tuples', total_tuples,
        'max_tree_depth', max_level,
        'avg_free_space', avg_free_space,
        'leaf_pages', leaf_pages,
        'estimated_size_bytes', total_pages * 8192
      ) INTO result
    FROM summary;
  EXCEPTION
    WHEN others THEN
      -- The table might not be an OrioleDB table
      result := jsonb_build_object(
        'error', 'Not an OrioleDB table or permission denied',
        'detail', SQLERRM
      );
  END;

  -- Add index information
  DECLARE
    index_info jsonb;
  BEGIN
    SELECT jsonb_agg(
      jsonb_build_object(
        'index_name', i.relname,
        'index_size', pg_size_pretty(pg_relation_size(i.oid))
      )
    )
    INTO index_info
    FROM pg_index x
    JOIN pg_class i ON i.oid = x.indexrelid
    JOIN pg_class t ON t.oid = x.indrelid
    WHERE t.relname = table_name;

    result := result || jsonb_build_object('indexes', COALESCE(index_info, '[]'::jsonb));
  EXCEPTION
    WHEN others THEN
      result := result || jsonb_build_object('indexes_error', SQLERRM);
  END;

  -- Get approximate row count
  BEGIN
    DECLARE
      row_count bigint;
      query text;
    BEGIN
      query := 'SELECT count(*) FROM ' || quote_ident(table_name);
      EXECUTE query INTO row_count;
      result := result || jsonb_build_object('row_count', row_count);
    EXCEPTION
      WHEN others THEN
        result := result || jsonb_build_object('row_count_error', SQLERRM);
    END;
  END;

  RETURN result;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_orioledb_stats(text) TO authenticated;

-- Function to compare a regular PostgreSQL table vs OrioleDB table
CREATE OR REPLACE FUNCTION compare_pg_vs_orioledb(pg_table text, orioledb_table text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result jsonb;
  pg_size bigint;
  orioledb_size bigint;
  pg_info jsonb;
  orioledb_info jsonb;
BEGIN
  -- Get sizes
  SELECT pg_total_relation_size(pg_table::regclass) INTO pg_size;

  -- Try to get OrioleDB table size
  BEGIN
    WITH page_info AS (
      SELECT count(*) as total_pages FROM orioledb_table_pages(orioledb_table)
    )
    SELECT total_pages * 8192 INTO orioledb_size FROM page_info;
  EXCEPTION
    WHEN others THEN
      orioledb_size := NULL;
  END;

  -- Get OrioleDB stats
  SELECT get_orioledb_stats(orioledb_table) INTO orioledb_info;

  -- Build regular table info
  SELECT
    jsonb_build_object(
      'table_name', pg_table,
      'total_size_bytes', pg_size,
      'total_size_pretty', pg_size_pretty(pg_size),
      'approximate_row_count', (SELECT reltuples::bigint FROM pg_class WHERE relname = pg_table)
    ) INTO pg_info;

  -- Build comparison result
  result := jsonb_build_object(
    'postgresql_table', pg_info,
    'orioledb_table', orioledb_info,
    'size_difference_bytes', COALESCE(pg_size - orioledb_size, NULL),
    'size_difference_percent', CASE
      WHEN pg_size > 0 AND orioledb_size > 0
      THEN round(((orioledb_size::numeric / pg_size::numeric) - 1) * 100, 2)
      ELSE NULL
    END,
    'comparison_timestamp', now()
  );

  RETURN result;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION compare_pg_vs_orioledb(text, text) TO authenticated;

-- Helper function to create a copy of a regular table as an OrioleDB table
CREATE OR REPLACE FUNCTION create_orioledb_copy_of_table(source_table text, target_table text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  column_list text;
  create_stmt text;
  insert_stmt text;
BEGIN
  -- Get column list (excluding system columns)
  SELECT string_agg(quote_ident(column_name), ', ')
  INTO column_list
  FROM information_schema.columns
  WHERE table_name = source_table
  AND table_schema = current_schema();

  IF column_list IS NULL THEN
    RETURN 'Error: Source table not found or has no columns';
  END IF;

  -- Create OrioleDB table with same structure
  EXECUTE 'CREATE TABLE IF NOT EXISTS ' || quote_ident(target_table) || ' (LIKE ' ||
          quote_ident(source_table) || ' INCLUDING ALL) USING orioledb';

  -- Copy data
  EXECUTE 'INSERT INTO ' || quote_ident(target_table) ||
          ' SELECT * FROM ' || quote_ident(source_table);

  -- Get row counts for confirmation
  DECLARE
    source_count bigint;
    target_count bigint;
  BEGIN
    EXECUTE 'SELECT count(*) FROM ' || quote_ident(source_table) INTO source_count;
    EXECUTE 'SELECT count(*) FROM ' || quote_ident(target_table) INTO target_count;

    RETURN 'Success: Copied ' || target_count || ' rows from ' || source_table ||
           ' to OrioleDB table ' || target_table ||
           ' (original table has ' || source_count || ' rows)';
  END;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION create_orioledb_copy_of_table(text, text) TO authenticated;
