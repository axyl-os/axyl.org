-- Seed data for the OrioleDB sample table

-- Clear existing data
TRUNCATE TABLE orioledb_sample_table RESTART IDENTITY;

-- Insert sample data
INSERT INTO orioledb_sample_table (name, description) VALUES
  ('Sample 1', 'This is the first sample record stored using OrioleDB'),
  ('Sample 2', 'This is the second sample record with OrioleDB storage engine'),
  ('Sample 3', 'A third record to demonstrate OrioleDB functionality'),
  ('Sample 4', 'Fourth sample showing OrioleDB performance benefits'),
  ('Sample 5', 'Fifth example of data stored in an OrioleDB table');

-- You can insert more complex data here as needed
