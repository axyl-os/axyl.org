#!/usr/bin/env node

// This script injects a styled-jsx/index.js file during Next.js build
// It's used to fix the ENOENT error with styled-jsx and React 19

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('[inject-styled-jsx] Starting injection script...');

// Minimal styled-jsx index.js content
const indexJsContent = `'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

// This is a compatibility layer for styled-jsx
// to work with Next.js and React 19
try {
  // Try to load from dist
  const styledJsx = require('./dist/index/index.js');

  // Export all properties
  for (const key in styledJsx) {
    if (Object.prototype.hasOwnProperty.call(styledJsx, key)) {
      exports[key] = styledJsx[key];
    }
  }

  // Ensure default export is set
  exports.default = styledJsx.default || styledJsx;
} catch (err) {
  // Fallback implementation
  console.warn('Using fallback styled-jsx implementation');

  // Mock style function
  exports.style = function style() { return null; };

  // Mock default export
  exports.default = {
    dynamic: () => () => null,
    withSystem: () => () => null
  };
}
`;

// Function to ensure directory exists
function ensureDirExists(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`[inject-styled-jsx] Created directory: ${dirPath}`);
    }
  } catch (err) {
    console.error(`[inject-styled-jsx] Error creating directory ${dirPath}:`, err);
  }
}

// Function to write file if it doesn't exist or is different
function writeFileIfNeeded(filePath, content) {
  try {
    let needsWrite = true;

    if (fs.existsSync(filePath)) {
      const existingContent = fs.readFileSync(filePath, 'utf8');
      if (existingContent.trim() === content.trim()) {
        console.log(`[inject-styled-jsx] File already exists with correct content: ${filePath}`);
        needsWrite = false;
      }
    }

    if (needsWrite) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`[inject-styled-jsx] Successfully wrote file: ${filePath}`);
    }
  } catch (err) {
    console.error(`[inject-styled-jsx] Error writing to ${filePath}:`, err);
  }
}

// Find all styled-jsx directories in node_modules
function findStyledJsxDirectories() {
  const results = [];
  const nodeModulesDir = path.join(rootDir, 'node_modules');

  try {
    // Direct path
    const directPath = path.join(nodeModulesDir, 'styled-jsx');
    if (fs.existsSync(directPath)) {
      results.push(directPath);
    }

    // Look in pnpm virtual store
    const pnpmDir = path.join(nodeModulesDir, '.pnpm');
    if (fs.existsSync(pnpmDir)) {
      const entries = fs.readdirSync(pnpmDir);
      for (const entry of entries) {
        if (entry.startsWith('styled-jsx@')) {
          const styledJsxPath = path.join(pnpmDir, entry, 'node_modules', 'styled-jsx');
          if (fs.existsSync(styledJsxPath)) {
            results.push(styledJsxPath);
          }
        }
      }
    }
  } catch (err) {
    console.error('[inject-styled-jsx] Error searching for styled-jsx:', err);
  }

  return results;
}

// Create our own styled-jsx module if needed
function createOwnStyledJsx() {
  const styledJsxDir = path.join(rootDir, 'node_modules', 'styled-jsx');
  ensureDirExists(styledJsxDir);

  // Create index.js
  writeFileIfNeeded(path.join(styledJsxDir, 'index.js'), indexJsContent);

  // Create minimal package.json
  const packageJson = {
    name: "styled-jsx",
    version: "5.1.6",
    description: "Full CSS support for JSX (injected version)",
    main: "index.js",
    peerDependencies: {
      react: ">= 16.8.0 || 17.x.x || 18.x.x || 19.x.x"
    }
  };

  writeFileIfNeeded(
    path.join(styledJsxDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
}

// Create Next.js module alias file
function createNextModuleAlias() {
  const nextConfigPath = path.join(rootDir, 'next.config.js');
  let existingConfig = '';

  if (fs.existsSync(nextConfigPath)) {
    existingConfig = fs.readFileSync(nextConfigPath, 'utf8');
  }

  // Only add the webpack config if it's not already there
  if (!existingConfig.includes('styled-jsx') || !existingConfig.includes('webpack')) {
    const newConfig = `
// This file adds styled-jsx support for React 19
const nextConfig = ${existingConfig || '{}'};

// Add webpack aliases for styled-jsx
if (!nextConfig.webpack) {
  nextConfig.webpack = (config) => {
    // Ensure styled-jsx resolution works
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['styled-jsx'] = require.resolve('styled-jsx');
    return config;
  };
}

module.exports = nextConfig;
`;

    writeFileIfNeeded(nextConfigPath, newConfig);
  }
}

// Main execution
try {
  // Find existing styled-jsx installations
  const styledJsxDirs = findStyledJsxDirectories();
  console.log(`[inject-styled-jsx] Found ${styledJsxDirs.length} styled-jsx directories`);

  // Inject index.js into all found directories
  styledJsxDirs.forEach(dir => {
    writeFileIfNeeded(path.join(dir, 'index.js'), indexJsContent);
  });

  // If no styled-jsx found, create our own
  if (styledJsxDirs.length === 0) {
    console.log('[inject-styled-jsx] No existing styled-jsx found, creating our own');
    createOwnStyledJsx();
  }

  // Create module alias in Next.js config
  createNextModuleAlias();

  console.log('[inject-styled-jsx] Injection complete!');
} catch (err) {
  console.error('[inject-styled-jsx] Unhandled error:', err);
  // Don't exit with error to prevent build failures
}
