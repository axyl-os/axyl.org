#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('Running postinstall script to fix styled-jsx dependency...');

// Helper function to create directory if it doesn't exist
function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Try to find styled-jsx module locations
function findStyledJsxPaths() {
  const possiblePaths = [
    path.resolve(__dirname, '../node_modules/styled-jsx'),
    path.resolve(__dirname, '../node_modules/.pnpm/styled-jsx@5.1.6_react@19.1.0/node_modules/styled-jsx')
  ];

  return possiblePaths.filter(p => fs.existsSync(p));
}

// Fix the styled-jsx index.js file if it's missing
function fixStyledJsx() {
  const styledJsxPaths = findStyledJsxPaths();

  if (styledJsxPaths.length === 0) {
    console.log('Could not find styled-jsx installation path.');
    return;
  }

  styledJsxPaths.forEach(styledJsxPath => {
    const indexPath = path.join(styledJsxPath, 'index.js');
    const distPath = path.join(styledJsxPath, 'dist/index/index.js');

    // Check if the destination file exists but source doesn't
    if (fs.existsSync(distPath) && !fs.existsSync(indexPath)) {
      try {
        // Create a simple proxy file that loads from dist
        const content = `
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

// Proxy to actual implementation in dist/
const styledJsx = require('./dist/index/index.js');

// Export all properties
for (const key in styledJsx) {
  if (Object.prototype.hasOwnProperty.call(styledJsx, key)) {
    exports[key] = styledJsx[key];
  }
}
`;

        fs.writeFileSync(indexPath, content, 'utf8');
        console.log(`Fixed missing index.js at ${indexPath}`);
      } catch (error) {
        console.error(`Error fixing styled-jsx at ${styledJsxPath}:`, error);
      }
    } else {
      console.log(`No fix needed for styled-jsx at ${styledJsxPath}`);
    }
  });
}

// Run the fix
fixStyledJsx();
console.log('Postinstall script completed.');
