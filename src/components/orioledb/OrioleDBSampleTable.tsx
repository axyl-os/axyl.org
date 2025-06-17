'use client';

import { useState, useEffect } from 'react';
import {
  getAllSamples,
  getSampleById,
  createSample,
  updateSample,
  deleteSample,
  searchSamplesByName,
  getOrioleDBTableStats,
  OrioleDBSample
} from '@/lib/orioledb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function OrioleDBSampleTable() {
  const [samples, setSamples] = useState<OrioleDBSample[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newSample, setNewSample] = useState({ name: '', description: '' });
  const [editingSample, setEditingSample] = useState<OrioleDBSample | null>(null);
  const [showStatsDialog, setShowStatsDialog] = useState(false);
  const [tableStats, setTableStats] = useState<any>(null);

  // Load samples
  useEffect(() => {
    async function loadSamples() {
      try {
        setLoading(true);
        const data = await getAllSamples();
        setSamples(data);
        setError(null);
      } catch (err) {
        setError('Failed to load samples: ' + (err instanceof Error ? err.message : String(err)));
      } finally {
        setLoading(false);
      }
    }

    loadSamples();
  }, []);

  // Handle search
  async function handleSearch() {
    try {
      setLoading(true);
      const results = searchTerm
        ? await searchSamplesByName(searchTerm)
        : await getAllSamples();
      setSamples(results);
      setError(null);
    } catch (err) {
      setError('Search failed: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  }

  // Handle create sample
  async function handleCreateSample() {
    try {
      setLoading(true);
      const created = await createSample({
        name: newSample.name,
        description: newSample.description
      });
      setSamples([...samples, created]);
      setNewSample({ name: '', description: '' });
      setShowAddDialog(false);
      setError(null);
    } catch (err) {
      setError('Failed to create sample: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  }

  // Handle update sample
  async function handleUpdateSample() {
    if (!editingSample) return;

    try {
      setLoading(true);
      const updated = await updateSample(editingSample.id, {
        name: editingSample.name,
        description: editingSample.description
      });
      setSamples(samples.map(s => s.id === updated.id ? updated : s));
      setEditingSample(null);
      setError(null);
    } catch (err) {
      setError('Failed to update sample: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  }

  // Handle delete sample
  async function handleDeleteSample(id: number) {
    if (!window.confirm('Are you sure you want to delete this sample?')) {
      return;
    }

    try {
      setLoading(true);
      await deleteSample(id);
      setSamples(samples.filter(s => s.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete sample: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  }

  // Load table statistics
  async function loadTableStats() {
    try {
      setLoading(true);
      const stats = await getOrioleDBTableStats();
      setTableStats(stats);
      setShowStatsDialog(true);
      setError(null);
    } catch (err) {
      setError('Failed to load table stats: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>OrioleDB Sample Data</CardTitle>
          <CardDescription>
            This table demonstrates the data stored in an OrioleDB-powered PostgreSQL table.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="flex gap-4 mb-4">
            <Input
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleSearch}>Search</Button>
            <Button variant="outline" onClick={() => setShowAddDialog(true)}>Add New</Button>
            <Button variant="secondary" onClick={loadTableStats}>View OrioleDB Stats</Button>
          </div>

          <Table>
            <TableCaption>A list of samples stored using OrioleDB engine</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">Loading...</TableCell>
                </TableRow>
              ) : samples.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">No samples found</TableCell>
                </TableRow>
              ) : (
                samples.map((sample) => (
                  <TableRow key={sample.id}>
                    <TableCell>{sample.id}</TableCell>
                    <TableCell>{sample.name}</TableCell>
                    <TableCell>{sample.description}</TableCell>
                    <TableCell>{new Date(sample.created_at).toLocaleString()}</TableCell>
                    <TableCell>{new Date(sample.updated_at).toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingSample(sample)}>
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteSample(sample.id)}>
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Sample</DialogTitle>
            <DialogDescription>
              Create a new sample record in the OrioleDB-powered table.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                value={newSample.name}
                onChange={(e) => setNewSample({...newSample, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea
                id="description"
                value={newSample.description}
                onChange={(e) => setNewSample({...newSample, description: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateSample}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={Boolean(editingSample)} onOpenChange={(open) => !open && setEditingSample(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Sample</DialogTitle>
            <DialogDescription>
              Update an existing sample in the OrioleDB-powered table.
            </DialogDescription>
          </DialogHeader>

          {editingSample && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">Name</Label>
                <Input
                  id="edit-name"
                  value={editingSample.name}
                  onChange={(e) => setEditingSample({...editingSample, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingSample.description || ''}
                  onChange={(e) => setEditingSample({...editingSample, description: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingSample(null)}>Cancel</Button>
            <Button onClick={handleUpdateSample}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stats Dialog */}
      <Dialog open={showStatsDialog} onOpenChange={setShowStatsDialog}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>OrioleDB Table Statistics</DialogTitle>
            <DialogDescription>
              Performance metrics and statistics for the OrioleDB-powered table.
            </DialogDescription>
          </DialogHeader>

          {tableStats && (
            <div className="py-4">
              <Card>
                <CardContent className="pt-6">
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <dt className="font-medium text-gray-500">Table Name:</dt>
                    <dd>{tableStats.table_name}</dd>

                    <dt className="font-medium text-gray-500">Total Rows:</dt>
                    <dd>{tableStats.row_count?.toLocaleString() || 'N/A'}</dd>

                    <dt className="font-medium text-gray-500">Total Pages:</dt>
                    <dd>{tableStats.total_pages?.toLocaleString() || 'N/A'}</dd>

                    <dt className="font-medium text-gray-500">Leaf Pages:</dt>
                    <dd>{tableStats.leaf_pages?.toLocaleString() || 'N/A'}</dd>

                    <dt className="font-medium text-gray-500">Tree Depth:</dt>
                    <dd>{tableStats.max_tree_depth || 'N/A'}</dd>

                    <dt className="font-medium text-gray-500">Average Free Space:</dt>
                    <dd>{tableStats.avg_free_space ? `${Math.round(tableStats.avg_free_space)}%` : 'N/A'}</dd>

                    <dt className="font-medium text-gray-500">Estimated Size:</dt>
                    <dd>
                      {tableStats.estimated_size_bytes
                        ? `${Math.round(tableStats.estimated_size_bytes / 1024)} KB`
                        : 'N/A'}
                    </dd>
                  </dl>

                  {tableStats.indexes && tableStats.indexes.length > 0 && (
                    <>
                      <h4 className="font-semibold mt-4 mb-2">Indexes:</h4>
                      <ul className="list-disc pl-5">
                        {tableStats.indexes.map((idx: any, i: number) => (
                          <li key={i}>{idx.index_name} - {idx.index_size}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  {tableStats.error && (
                    <div className="mt-4 p-3 bg-amber-100 text-amber-800 rounded-md">
                      {tableStats.error}: {tableStats.detail}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setShowStatsDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
