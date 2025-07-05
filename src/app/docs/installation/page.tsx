import { MDXRemote } from 'next-mdx-remote/rsc';
import fs from 'node:fs';
import path from 'node:path';

export default async function InstallationDocsPage() {
  const filePath = path.join(process.cwd(), 'src/app/docs/installation/content.mdx');
  const source = fs.readFileSync(filePath, 'utf8');
  return (
    <article className="prose mx-auto py-8">
      <MDXRemote source={source} />
    </article>
  );
}