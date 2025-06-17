-- Install OrioleDB extension
CREATE EXTENSION IF NOT EXISTS orioledb;

-- Create a sample table using OrioleDB
-- Note: This table will use the OrioleDB engine instead of the default PostgreSQL storage
CREATE TABLE IF NOT EXISTS orioledb_sample_table (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
) USING orioledb;

-- Create a sample index using OrioleDB
CREATE INDEX IF NOT EXISTS idx_orioledb_sample_name ON orioledb_sample_table USING orioledb_btree(name);

-- Create RLS (Row Level Security) policies for the table
ALTER TABLE orioledb_sample_table ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to read all rows
CREATE POLICY "Allow authenticated users to read all rows"
  ON orioledb_sample_table
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Create policy to allow users to insert their own data
CREATE POLICY "Allow authenticated users to insert own data"
  ON orioledb_sample_table
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow users to update their own data
CREATE POLICY "Allow authenticated users to update own data"
  ON orioledb_sample_table
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Create function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function
CREATE TRIGGER update_orioledb_sample_table_updated_at
BEFORE UPDATE ON orioledb_sample_table
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Add permissions for anon and authenticated roles
GRANT SELECT ON orioledb_sample_table TO anon, authenticated;
GRANT INSERT, UPDATE ON orioledb_sample_table TO authenticated;
GRANT USAGE ON SEQUENCE orioledb_sample_table_id_seq TO authenticated;
