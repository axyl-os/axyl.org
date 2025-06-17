# OrioleDB Integration with Supabase and PostgreSQL

This document provides instructions for setting up and using OrioleDB with Supabase and PostgreSQL for the AxylOS website.

## What is OrioleDB?

[OrioleDB](https://orioledb.com/) is an open source PostgreSQL extension that provides a new table access method with a modern storage engine. It offers several advantages over traditional PostgreSQL storage:

- Better write amplification and compression
- Enhanced performance for OLTP workloads
- Reduced storage space requirements
- Faster index operations
- Improved performance for high-concurrency workloads

## Prerequisites

1. A [Supabase](https://supabase.com/) account with an active project
2. PostgreSQL 14 or higher (Supabase uses PostgreSQL 15 by default)
3. Administrative access to your Supabase project
4. Familiarity with SQL and PostgreSQL concepts

## Setup Steps

### 1. Enable OrioleDB Extension on Supabase

1. Log in to your [Supabase Dashboard](https://app.supabase.com/)
2. Navigate to your project
3. Go to the SQL Editor
4. Run the following command to enable the OrioleDB extension:

```sql
CREATE EXTENSION IF NOT EXISTS orioledb;
```

5. Verify the extension is installed:

```sql
SELECT * FROM pg_extension WHERE extname = 'orioledb';
```

### 2. Configure PostgreSQL for OrioleDB

Add the following settings to your PostgreSQL configuration in Supabase. This can be done through the Supabase dashboard by navigating to Database → Configuration.

```
# OrioleDB settings
shared_preload_libraries = 'pg_stat_statements,orioledb'
orioledb.main_buffers = '256MB'
orioledb.undo_buffers = '32MB'
orioledb.shared_pool_size = '64MB'
orioledb.recovery_queue_size = '1GB'
```

**Note**: Supabase may not allow direct modification of these settings. If that's the case, you'll need to contact Supabase support to enable OrioleDB for your project.

### 3. Create Tables with OrioleDB

To create a table using the OrioleDB storage engine, use the `USING orioledb` clause:

```sql
CREATE TABLE my_orioledb_table (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
) USING orioledb;
```

### 4. Creating Indexes with OrioleDB

OrioleDB offers optimized indexing:

```sql
CREATE INDEX idx_my_orioledb_table_name 
ON my_orioledb_table 
USING orioledb_btree(name);
```

## Using OrioleDB from Your Application

### Existing Supabase Client Integration

Your application can interact with OrioleDB tables using the standard Supabase client, as the differences are transparent to the client code:

```typescript
import { supabase } from '@/lib/supabase';

// Query an OrioleDB table
const { data, error } = await supabase
  .from('my_orioledb_table')
  .select('*')
  .order('id', { ascending: true });

// Insert into an OrioleDB table
const { data, error } = await supabase
  .from('my_orioledb_table')
  .insert([
    { name: 'Example', description: 'This is stored in OrioleDB' }
  ]);
```

### Migrations

Place your OrioleDB table creation scripts in the Supabase migrations directory:

```
/supabase/migrations/00000001_install_orioledb.sql
```

This ensures your OrioleDB setup is properly versioned and can be deployed consistently across environments.

## Performance Monitoring

To monitor the performance of your OrioleDB tables:

```sql
SELECT * FROM orioledb_table_pages('my_orioledb_table');
```

This provides insight into how OrioleDB is storing your data.

## Common Issues and Solutions

### Error: Extension "orioledb" is not available

If you encounter this error, it means the OrioleDB extension is not installed on your Supabase instance. Contact Supabase support to request the extension.

### Performance Not Improving

If you're not seeing expected performance improvements:

1. Ensure your table was created with `USING orioledb`
2. Verify indexes are using `orioledb_btree`
3. Check that the OrioleDB configuration parameters are appropriate for your workload
4. Consider adjusting the OrioleDB memory settings based on your project's resources

## Additional Resources

- [OrioleDB Official Documentation](https://orioledb.com/docs/)
- [OrioleDB GitHub Repository](https://github.com/orioledb/orioledb)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Supabase Documentation](https://supabase.com/docs)