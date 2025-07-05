import { MDXRemote } from 'next-mdx-remote/rsc';
import fs from 'node:fs';
import path from 'node:path';

export const metadata = {
  title: 'OrioleDB Setup Guide | AxylOS',
  description: 'How to set up OrioleDB with Supabase and PostgreSQL',
};

export default async function OrioleDBSetupPage() {
  const filePath = path.join(process.cwd(), 'src/app/docs/orioledb-setup/content.mdx');
  const source = fs.readFileSync(filePath, 'utf8');
  return (
    <article className="prose mx-auto py-8">
      <MDXRemote source={source} />
    </article>
  );
}