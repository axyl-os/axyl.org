#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Starting styled-jsx fix script...');

// Try to find where styled-jsx is installed
function findStyledJsxPaths() {
  const rootDir = path.resolve(__dirname, '../');
  const possiblePaths = [
    path.join(rootDir, 'node_modules/styled-jsx'),
    path.join(rootDir, 'node_modules/.pnpm/styled-jsx@5.1.6_react@19.1.0/node_modules/styled-jsx'),
    path.join(rootDir, 'node_modules/.pnpm/styled-jsx@5.1.6_react@18.2.0/node_modules/styled-jsx'),
    path.join(rootDir, 'node_modules/.pnpm/styled-jsx@5.1.6/node_modules/styled-jsx'),
  ];

  const foundPaths = possiblePaths.filter(p => fs.existsSync(p));

  // If we found nothing, try to search recursively
  if (foundPaths.length === 0) {
    try {
      console.log('Running find command to locate styled-jsx');
      const result = execSync('find node_modules -type d -name styled-jsx',
        { cwd: rootDir, encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });

      if (result) {
        const paths = result.trim().split('\n').filter(Boolean);
        paths.forEach(p => {
          const fullPath = path.join(rootDir, p);
          if (!foundPaths.includes(fullPath)) {
            foundPaths.push(fullPath);
          }
        });
      }
    } catch (error) {
      console.log('Error running find command:', error.message);
    }
  }

  return foundPaths;
}

function createProxyFile(modulePath) {
  const indexPath = path.join(modulePath, 'index.js');
  const distPath = path.join(modulePath, 'dist/index/index.js');

  if (fs.existsSync(distPath) && !fs.existsSync(indexPath)) {
    try {
      console.log(`Creating proxy index.js at ${indexPath}`);
      const content = `'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

// Proxy to actual implementation in dist/
const styledJsx = require('./dist/index/index.js');

// Export all properties
for (const key in styledJsx) {
  if (Object.prototype.hasOwnProperty.call(styledJsx, key)) {
    exports[key] = styledJsx[key];
  }
}`;

      fs.writeFileSync(indexPath, content, 'utf8');
      console.log('Successfully created proxy file');
    } catch (error) {
      console.error('Error creating proxy file:', error);
    }
  } else {
    console.log('No fix needed - index.js exists or dist not found');
  }
}

function updatePackageJson(modulePath) {
  const packageJsonPath = path.join(modulePath, 'package.json');

  if (fs.existsSync(packageJsonPath)) {
    try {
      console.log(`Updating package.json at ${packageJsonPath}`);
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

      // Update React peer dependency to include React 19
      if (packageJson.peerDependencies && packageJson.peerDependencies.react) {
        packageJson.peerDependencies.react = '>= 16.8.0 || 17.x.x || 18.x.x || 19.x.x';
      }

      // Add overrides to ensure React compatibility
      packageJson.overrides = packageJson.overrides || {};
      packageJson.overrides.react = '>=16.8.0 || ^19.0.0';

      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
      console.log('Successfully updated package.json');
    } catch (error) {
      console.error('Error updating package.json:', error);
    }
  }
}

// Find and fix all styled-jsx installations
const styledJsxPaths = findStyledJsxPaths();

if (styledJsxPaths.length === 0) {
  console.log('No styled-jsx installation found. Trying to install it directly...');

  try {
    execSync('npm install styled-jsx@5.1.6 --no-save',
      { cwd: path.resolve(__dirname, '..'), stdio: 'inherit' });

    // Check again after installing
    const newPaths = findStyledJsxPaths();

    if (newPaths.length > 0) {
      console.log(`Found ${newPaths.length} styled-jsx paths after installation`);
      newPaths.forEach(path => {
        createProxyFile(path);
        updatePackageJson(path);
      });
    } else {
      console.log('Still could not find styled-jsx after installation');
    }
  } catch (error) {
    console.error('Error installing styled-jsx:', error);
  }
} else {
  console.log(`Found ${styledJsxPaths.length} styled-jsx installation(s):`);
  styledJsxPaths.forEach((modulePath, index) => {
    console.log(`[${index + 1}] ${modulePath}`);

    createProxyFile(modulePath);
    updatePackageJson(modulePath);
  });
}

console.log('Styled-jsx fix script completed');
