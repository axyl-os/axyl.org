import { supabase } from '@/lib/supabase'

// Types for the OrioleDB sample table
export interface OrioleDBSample {
  id: number
  name: string
  description: string | null
  created_at: string
  updated_at: string
}

/**
 * Fetches all records from the OrioleDB sample table
 * @returns A promise resolving to an array of OrioleDBSample objects
 */
export async function getAllSamples(): Promise<OrioleDBSample[]> {
  const { data, error } = await supabase
    .from('orioledb_sample_table')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching samples from OrioleDB table:', error)
    throw error
  }

  return data || []
}

/**
 * Fetches a single record by ID from the OrioleDB sample table
 * @param id The ID of the record to fetch
 * @returns A promise resolving to an OrioleDBSample object or null if not found
 */
export async function getSampleById(id: number): Promise<OrioleDBSample | null> {
  const { data, error } = await supabase
    .from('orioledb_sample_table')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // Record not found
      return null
    }
    console.error(`Error fetching sample with ID ${id}:`, error)
    throw error
  }

  return data
}

/**
 * Searches for records in the OrioleDB sample table by name
 * @param searchTerm The search term to look for in the name field
 * @returns A promise resolving to an array of matching OrioleDBSample objects
 */
export async function searchSamplesByName(searchTerm: string): Promise<OrioleDBSample[]> {
  const { data, error } = await supabase
    .from('orioledb_sample_table')
    .select('*')
    .ilike('name', `%${searchTerm}%`)
    .order('name', { ascending: true })

  if (error) {
    console.error(`Error searching samples with term "${searchTerm}":`, error)
    throw error
  }

  return data || []
}

/**
 * Creates a new record in the OrioleDB sample table
 * @param sample The sample object to create (without id, created_at, and updated_at fields)
 * @returns A promise resolving to the created OrioleDBSample object
 */
export async function createSample({ name, description }: Omit<OrioleDBSample, 'id' | 'created_at' | 'updated_at'>): Promise<OrioleDBSample> {
  const { data, error } = await supabase
    .from('orioledb_sample_table')
    .insert([{ name, description }])
    .select()
    .single()

  if (error) {
    console.error('Error creating sample in OrioleDB table:', error)
    throw error
  }

  return data
}

/**
 * Updates an existing record in the OrioleDB sample table
 * @param id The ID of the record to update
 * @param updates The fields to update
 * @returns A promise resolving to the updated OrioleDBSample object
 */
export async function updateSample(
  id: number,
  updates: Partial<Omit<OrioleDBSample, 'id' | 'created_at' | 'updated_at'>>
): Promise<OrioleDBSample> {
  const { data, error } = await supabase
    .from('orioledb_sample_table')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error(`Error updating sample with ID ${id}:`, error)
    throw error
  }

  return data
}

/**
 * Deletes a record from the OrioleDB sample table
 * @param id The ID of the record to delete
 * @returns A promise resolving to a boolean indicating success
 */
export async function deleteSample(id: number): Promise<boolean> {
  const { error } = await supabase
    .from('orioledb_sample_table')
    .delete()
    .eq('id', id)

  if (error) {
    console.error(`Error deleting sample with ID ${id}:`, error)
    throw error
  }

  return true
}

/**
 * Gets database statistics for the OrioleDB table
 * This is a custom function that uses raw SQL to fetch OrioleDB-specific information
 * @returns A promise resolving to an object containing table statistics
 */
export async function getOrioleDBTableStats() {
  const { data, error } = await supabase.rpc('get_orioledb_stats', {
    table_name: 'orioledb_sample_table'
  })

  if (error) {
    console.error('Error fetching OrioleDB table statistics:', error)
    throw error
  }

  return data
}
