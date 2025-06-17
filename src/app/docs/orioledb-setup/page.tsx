import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OrioleDB Setup Guide | AxylOS',
  description: 'How to set up OrioleDB with Supabase and PostgreSQL',
};

export default function OrioleDBSetupPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-2">OrioleDB Setup Guide</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Learn how to integrate OrioleDB with your Supabase and PostgreSQL setup
      </p>

      <div className="prose max-w-none dark:prose-invert">
        <h2>What is OrioleDB?</h2>
        <p>
          <a href="https://orioledb.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            OrioleDB
          </a> is an open source PostgreSQL extension that provides a new table access method with
          a modern storage engine. It offers several advantages over traditional PostgreSQL storage:
        </p>
        <ul>
          <li>Better write amplification and compression</li>
          <li>Enhanced performance for OLTP workloads</li>
          <li>Reduced storage space requirements</li>
          <li>Faster index operations</li>
          <li>Improved performance for high-concurrency workloads</li>
        </ul>

        <h2>Prerequisites</h2>
        <ol>
          <li>A <a href="https://supabase.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Supabase
          </a> account with an active project</li>
          <li>PostgreSQL 14 or higher (Supabase uses PostgreSQL 15 by default)</li>
          <li>Administrative access to your Supabase project</li>
        </ol>

        <h2>Setup Steps</h2>

        <h3>Step 1: Enable OrioleDB Extension</h3>
        <p>
          First, you need to enable the OrioleDB extension on your Supabase project. Log in to your
          Supabase dashboard, navigate to your project, go to the SQL Editor, and run:
        </p>
        <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-auto">
          <code>
            CREATE EXTENSION IF NOT EXISTS orioledb;
          </code>
        </pre>
        <p>
          To verify that the extension is properly installed, you can run:
        </p>
        <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-auto">
          <code>
            SELECT * FROM pg_extension WHERE extname = 'orioledb';
          </code>
        </pre>

        <p>
          <strong>Note:</strong> If the extension is not available, you may need to contact Supabase
          support to request OrioleDB to be enabled for your project.
        </p>

        <h3>Step 2: Configure PostgreSQL Settings</h3>
        <p>
          OrioleDB requires specific PostgreSQL configuration parameters. These settings can be
          configured in the Supabase dashboard under Database → Configuration.
        </p>
        <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-auto">
          <code>
            # OrioleDB settings
            shared_preload_libraries = 'pg_stat_statements,orioledb'
            orioledb.main_buffers = '256MB'
            orioledb.undo_buffers = '32MB'
            orioledb.shared_pool_size = '64MB'
            orioledb.recovery_queue_size = '1GB'
          </code>
        </pre>

        <p>
          Adjust the buffer sizes based on your project's resources and requirements.
          For Supabase free tier, you may need to use smaller values.
        </p>

        <h3>Step 3: Create Tables with OrioleDB</h3>
        <p>
          To create a table using OrioleDB's storage engine, add the <code>USING orioledb</code> clause
          to your CREATE TABLE statement:
        </p>
        <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-auto">
          <code>
            {`CREATE TABLE my_orioledb_table (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
) USING orioledb;`}
          </code>
        </pre>

        <h3>Step 4: Create Indexes with OrioleDB</h3>
        <p>
          OrioleDB provides optimized indexing with its own B-tree implementation:
        </p>
        <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-auto">
          <code>
            {`CREATE INDEX idx_my_orioledb_table_name
ON my_orioledb_table
USING orioledb_btree(name);`}
          </code>
        </pre>

        <h3>Step 5: Enable Row Level Security (Optional)</h3>
        <p>
          Just like with regular PostgreSQL tables, you should enable Row Level Security (RLS)
          for your OrioleDB tables to ensure proper access control:
        </p>
        <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-auto">
          <code>
            {`-- Enable RLS
ALTER TABLE my_orioledb_table ENABLE ROW LEVEL SECURITY;

-- Create access policies
CREATE POLICY "Allow authenticated read access"
  ON my_orioledb_table FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert access"
  ON my_orioledb_table FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');`}
          </code>
        </pre>

        <h2>Working with OrioleDB Tables</h2>

        <h3>Using OrioleDB with the Supabase Client</h3>
        <p>
          Once you've created OrioleDB tables, you can interact with them using the standard
          Supabase client just like any other table:
        </p>
        <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-auto">
          <code>
            {`// Query data from an OrioleDB table
const { data, error } = await supabase
  .from('my_orioledb_table')
  .select('*')
  .order('id', { ascending: true });

// Insert data into an OrioleDB table
const { data, error } = await supabase
  .from('my_orioledb_table')
  .insert([
    { name: 'Example', description: 'This is stored in OrioleDB' }
  ]);`}
          </code>
        </pre>

        <h3>OrioleDB Management Functions</h3>
        <p>
          OrioleDB provides several management functions to analyze and optimize your tables:
        </p>
        <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-auto">
          <code>
            {`-- View page information
SELECT * FROM orioledb_table_pages('my_orioledb_table');

-- Check tree structure
SELECT * FROM orioledb_table_tree_check('my_orioledb_table');`}
          </code>
        </pre>

        <h2>Converting Existing Tables to OrioleDB</h2>
        <p>
          You can convert existing PostgreSQL tables to use OrioleDB with a simple process:
        </p>
        <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-auto">
          <code>
            {`-- Create a new table with OrioleDB storage
CREATE TABLE new_orioledb_table (LIKE existing_table INCLUDING ALL) USING orioledb;

-- Copy data to the new table
INSERT INTO new_orioledb_table SELECT * FROM existing_table;

-- Rename tables to swap them (optional)
ALTER TABLE existing_table RENAME TO existing_table_backup;
ALTER TABLE new_orioledb_table RENAME TO existing_table;`}
          </code>
        </pre>

        <h2>Performance Comparison</h2>
        <p>
          To compare the performance between standard PostgreSQL tables and OrioleDB tables,
          you can run benchmarks using the same data structure in both formats:
        </p>
        <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-auto">
          <code>
            {`-- Create tables for testing
CREATE TABLE standard_table (id SERIAL PRIMARY KEY, data JSONB);
CREATE TABLE orioledb_table (id SERIAL PRIMARY KEY, data JSONB) USING orioledb;

-- Insert the same test data in both
INSERT INTO standard_table (data)
SELECT ('{"key": "value' || i || '", "num": ' || i || '}')::JSONB
FROM generate_series(1, 100000) i;

INSERT INTO orioledb_table (data)
SELECT ('{"key": "value' || i || '", "num": ' || i || '}')::JSONB
FROM generate_series(1, 100000) i;

-- Compare sizes
SELECT pg_size_pretty(pg_relation_size('standard_table')) AS standard_size;
SELECT pg_size_pretty(pg_relation_size('orioledb_table')) AS orioledb_size;`}
          </code>
        </pre>

        <h2>Limitations and Considerations</h2>
        <ul>
          <li>Supabase hosting may have specific limitations on OrioleDB configuration</li>
          <li>OrioleDB is still maturing, so monitor for any stability issues</li>
          <li>Take regular backups of your data during initial implementation</li>
          <li>Some advanced PostgreSQL features may have different behavior with OrioleDB</li>
        </ul>

        <h2>Conclusion</h2>
        <p>
          OrioleDB provides significant performance and storage benefits for many PostgreSQL workloads.
          By following this guide, you've integrated OrioleDB with your Supabase project and can now
          take advantage of its modern storage engine features.
        </p>
        <p>
          For more detailed information, visit the <a href="https://orioledb.com/docs/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            official OrioleDB documentation
          </a>.
        </p>
      </div>
    </div>
  );
}
