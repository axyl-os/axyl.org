import { Metadata } from 'next';
import OrioleDBSampleTable from '@/components/orioledb/OrioleDBSampleTable';

export const metadata: Metadata = {
  title: 'OrioleDB Demo | AxylOS',
  description: 'Demo of OrioleDB functionality with Supabase and PostgreSQL',
};

export default function OrioleDBPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-2">OrioleDB Demo</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Experience the power of OrioleDB with Supabase and PostgreSQL
      </p>

      <div className="grid gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">About OrioleDB</h2>
          <div className="prose max-w-none">
            <p>
              OrioleDB is a new storage engine for PostgreSQL that provides improved performance,
              better compression, and reduced write amplification compared to traditional PostgreSQL storage.
            </p>
            <p>
              Key benefits of OrioleDB include:
            </p>
            <ul>
              <li>Faster write operations due to efficient page management</li>
              <li>Reduced storage requirements through better compression</li>
              <li>Improved query performance for high-concurrency workloads</li>
              <li>Seamless integration with existing PostgreSQL tools and clients</li>
              <li>Enhanced durability and crash recovery</li>
            </ul>
            <p>
              This demo showcases a simple data management interface that uses OrioleDB tables
              through Supabase, demonstrating how you can leverage these performance improvements
              in your application.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">OrioleDB Sample Data</h2>
          <OrioleDBSampleTable />
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Implementation Details</h2>
          <div className="prose max-w-none">
            <p>
              This demo uses the following technologies:
            </p>
            <ul>
              <li><strong>PostgreSQL</strong> - The base database system</li>
              <li><strong>OrioleDB</strong> - The extension that provides the improved storage engine</li>
              <li><strong>Supabase</strong> - Provides the database hosting and API layer</li>
              <li><strong>Next.js</strong> - The React framework powering this application</li>
            </ul>
            <p>
              The data is stored in a table created with the <code>USING orioledb</code> clause,
              which directs PostgreSQL to use the OrioleDB storage engine instead of the default.
              This provides all the benefits of OrioleDB while maintaining compatibility with
              standard SQL operations.
            </p>
            <p>
              For more information on how to set up OrioleDB with your own Supabase project,
              see our <a href="/docs/orioledb-setup" className="text-blue-600 hover:underline">OrioleDB Setup Guide</a>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
