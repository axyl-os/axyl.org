const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    // You can add remark/rehype plugins here if needed
    // remarkPlugins: [],
    // rehypePlugins: [],
  },
});

module.exports = withMDX({
  // Add any other Next.js config options here
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
});