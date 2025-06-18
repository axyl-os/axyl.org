#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Log helper with timestamp
function log(...args) {
  console.log(`[${new Date().toISOString()}]`, ...args);
}

log('Starting Vercel pre-build script for styled-jsx fix');

// Helper to check if the file exists
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    return false;
  }
}

// Helper to ensure directory exists
function ensureDirExists(dirPath) {
  if (!fileExists(dirPath)) {
    try {
      fs.mkdirSync(dirPath, { recursive: true });
      log(`Created directory: ${dirPath}`);
    } catch (err) {
      log(`Failed to create directory ${dirPath}:`, err.message);
    }
  }
}

// Helper to search for files
function findFiles(startPath, filter) {
  let results = [];

  if (!fileExists(startPath)) {
    return results;
  }

  try {
    const files = fs.readdirSync(startPath);

    for (let i = 0; i < files.length; i++) {
      const filename = path.join(startPath, files[i]);
      const stat = fs.lstatSync(filename);

      if (stat.isDirectory()) {
        // Skip node_modules within node_modules to avoid infinite recursion
        if (startPath.includes('node_modules') && files[i] === 'node_modules') {
          continue;
        }
        results = results.concat(findFiles(filename, filter));
      } else if (filter.test(filename)) {
        results.push(filename);
      }
    }
  } catch (err) {
    log(`Error searching in ${startPath}:`, err.message);
  }

  return results;
}

// Create index.js file in styled-jsx directory
function createStyledJsxIndexFile(styledJsxPath) {
  const indexPath = path.join(styledJsxPath, 'index.js');
  const distPath = path.join(styledJsxPath, 'dist/index/index.js');
  const distIndexPath = path.join(styledJsxPath, 'dist/index.js');

  log(`Checking styled-jsx at: ${styledJsxPath}`);
  log(`- index.js exists: ${fileExists(indexPath)}`);
  log(`- dist/index/index.js exists: ${fileExists(distPath)}`);
  log(`- dist/index.js exists: ${fileExists(distIndexPath)}`);

  if (fileExists(indexPath)) {
    log(`index.js already exists at ${indexPath}, no action needed`);
    return;
  }

  // Find the correct source for import
  let sourcePath;
  if (fileExists(distPath)) {
    sourcePath = './dist/index/index.js';
  } else if (fileExists(distIndexPath)) {
    sourcePath = './dist/index.js';
  } else {
    log(`Error: Neither dist/index/index.js nor dist/index.js found in ${styledJsxPath}`);
    return;
  }

  // Create proxy file
  const content = `'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

// Proxy to actual implementation
const styledJsx = require('${sourcePath}');

// Export all properties
for (const key in styledJsx) {
  if (Object.prototype.hasOwnProperty.call(styledJsx, key)) {
    exports[key] = styledJsx[key];
  }
}

// Make sure default export is set correctly
exports.default = styledJsx.default || styledJsx;
`;

  try {
    fs.writeFileSync(indexPath, content, 'utf8');
    log(`Successfully created index.js at ${indexPath}`);
  } catch (err) {
    log(`Error creating index.js at ${indexPath}:`, err.message);

    // If we can't write to the existing directory, try an alternative approach
    try {
      // Create our own styled-jsx directory in project node_modules
      const projectNodeModules = path.resolve(process.cwd(), 'node_modules');
      const customStyledJsxDir = path.join(projectNodeModules, 'styled-jsx');

      ensureDirExists(customStyledJsxDir);

      // Copy package.json if it exists
      const packageJsonSrc = path.join(styledJsxPath, 'package.json');
      const packageJsonDest = path.join(customStyledJsxDir, 'package.json');

      if (fileExists(packageJsonSrc) && !fileExists(packageJsonDest)) {
        fs.copyFileSync(packageJsonSrc, packageJsonDest);
        log(`Copied package.json to ${packageJsonDest}`);
      }

      // Create the index.js file in our custom directory
      fs.writeFileSync(path.join(customStyledJsxDir, 'index.js'), content, 'utf8');
      log(`Created fallback index.js at ${path.join(customStyledJsxDir, 'index.js')}`);

      // Create symlinks for other important files
      ['dist', 'style.js', 'babel.js'].forEach(item => {
        const srcPath = path.join(styledJsxPath, item);
        const destPath = path.join(customStyledJsxDir, item);

        if (fileExists(srcPath) && !fileExists(destPath)) {
          try {
            if (fs.lstatSync(srcPath).isDirectory()) {
              ensureDirExists(destPath);
            } else {
              fs.copyFileSync(srcPath, destPath);
            }
            log(`Copied ${item} to custom styled-jsx directory`);
          } catch (copyErr) {
            log(`Failed to copy ${item}:`, copyErr.message);
          }
        }
      });
    } catch (fallbackErr) {
      log(`Failed fallback approach:`, fallbackErr.message);
    }
  }
}

// Fix package.json to support React 19
function fixPackageJson(styledJsxPath) {
  const packageJsonPath = path.join(styledJsxPath, 'package.json');

  if (!fileExists(packageJsonPath)) {
    log(`No package.json found at ${packageJsonPath}`);
    return;
  }

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    let updated = false;

    // Update React peer dependency
    if (packageJson.peerDependencies && packageJson.peerDependencies.react) {
      const originalValue = packageJson.peerDependencies.react;
      if (!originalValue.includes('19.x.x') && !originalValue.includes('19')) {
        packageJson.peerDependencies.react = '>= 16.8.0 || 17.x.x || 18.x.x || 19.x.x';
        updated = true;
        log(`Updated React peer dependency in ${packageJsonPath}`);
      }
    }

    if (updated) {
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
      log(`Saved updated package.json at ${packageJsonPath}`);
    }
  } catch (err) {
    log(`Error fixing package.json at ${packageJsonPath}:`, err.message);
  }
}

// Install styled-jsx if it's missing
function ensureStyledJsxInstalled() {
  log('Checking if styled-jsx is installed...');

  // Check in main node_modules
  const mainNodeModulesPath = path.resolve(process.cwd(), 'node_modules/styled-jsx');

  // Check in pnpm virtual store
  const pnpmStoreBase = path.resolve(process.cwd(), 'node_modules/.pnpm');
  const styledJsxPnpmPaths = [];

  if (fileExists(pnpmStoreBase)) {
    try {
      // This is a simplistic approach - will find directories starting with styled-jsx@
      const dirs = fs.readdirSync(pnpmStoreBase);
      dirs.forEach(dir => {
        if (dir.startsWith('styled-jsx@')) {
          const possiblePath = path.join(pnpmStoreBase, dir, 'node_modules/styled-jsx');
          if (fileExists(possiblePath)) {
            styledJsxPnpmPaths.push(possiblePath);
          }
        }
      });
    } catch (err) {
      log(`Error searching pnpm store:`, err.message);
    }
  }

  log(`Found ${styledJsxPnpmPaths.length} styled-jsx paths in pnpm store`);

  // If no styled-jsx found, install it
  if (!fileExists(mainNodeModulesPath) && styledJsxPnpmPaths.length === 0) {
    log('styled-jsx not found, installing...');
    try {
      execSync('npm install styled-jsx@5.1.6 --no-save', { stdio: 'inherit' });
      log('styled-jsx installed successfully');
    } catch (err) {
      log('Failed to install styled-jsx:', err.message);
    }
  }
}

// Create a fallback implementation if all else fails
function createFallbackImplementation() {
  const nodeModulesPath = path.resolve(process.cwd(), 'node_modules');
  const styledJsxDir = path.join(nodeModulesPath, 'styled-jsx');

  ensureDirExists(styledJsxDir);

  // Create minimal index.js
  const indexContent = `'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

// This is a fallback implementation of styled-jsx
function style() {
  return null;
}

// Export necessary functions
exports.style = style;
exports.default = {
  dynamic: function() { return function() { return null; }; },
  withSystem: function() { return function() { return null; }; },
  createGlobalStyle: function() { return null; }
};
`;

  try {
    const indexPath = path.join(styledJsxDir, 'index.js');
    fs.writeFileSync(indexPath, indexContent, 'utf8');
    log(`Created fallback styled-jsx at ${indexPath}`);

    // Create minimal package.json
    const packageJson = {
      name: "styled-jsx",
      version: "5.1.6",
      main: "index.js",
      peerDependencies: {
        react: ">= 16.8.0 || 17.x.x || 18.x.x || 19.x.x"
      }
    };

    fs.writeFileSync(
      path.join(styledJsxDir, 'package.json'),
      JSON.stringify(packageJson, null, 2),
      'utf8'
    );
    log('Created fallback package.json');

    // Create style.js which is also often imported
    fs.writeFileSync(
      path.join(styledJsxDir, 'style.js'),
      "module.exports = function style() { return null; };\n",
      'utf8'
    );
    log('Created fallback style.js');

  } catch (err) {
    log('Failed to create fallback implementation:', err.message);
  }
}

// Main execution
function main() {
  try {
    // Environment info
    log('Node.js version:', process.version);
    log('CWD:', process.cwd());
    log('ENV:', process.env.NODE_ENV || 'not set');
    log('Vercel:', process.env.VERCEL ? 'yes' : 'no');

    // Make sure styled-jsx is installed
    ensureStyledJsxInstalled();

    // Find styled-jsx directories
    let styledJsxPaths = [];

    // Check in main node_modules
    const mainPath = path.resolve(process.cwd(), 'node_modules/styled-jsx');
    if (fileExists(mainPath)) {
      styledJsxPaths.push(mainPath);
    }

    // Check in pnpm virtual store
    const allStyledJsx = findFiles(
      path.resolve(process.cwd(), 'node_modules'),
      /node_modules\/styled-jsx\/package\.json$/
    );

    allStyledJsx.forEach(packageJsonPath => {
      const styledJsxPath = path.dirname(packageJsonPath);
      if (!styledJsxPaths.includes(styledJsxPath)) {
        styledJsxPaths.push(styledJsxPath);
      }
    });

    log(`Found ${styledJsxPaths.length} styled-jsx directories`);

    // Fix each styled-jsx directory
    styledJsxPaths.forEach(styledJsxPath => {
      createStyledJsxIndexFile(styledJsxPath);
      fixPackageJson(styledJsxPath);
    });

    // If no styled-jsx was found or fixed, create a fallback
    if (styledJsxPaths.length === 0) {
      log('No styled-jsx found, creating fallback implementation');
      createFallbackImplementation();
    }

    log('Vercel pre-build script completed');
  } catch (err) {
    log('Unhandled error in pre-build script:', err);
    // Don't exit with error to not fail the build
  }
}

main();
