#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

console.log("Running postinstall script to fix styled-jsx dependency...");

// Helper function to create directory if it doesn't exist
function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Try to find styled-jsx module locations
function findStyledJsxPaths() {
  // Add all possible paths where styled-jsx might be installed
  const possiblePaths = [
    // Standard npm/yarn paths
    path.resolve(process.cwd(), "node_modules/styled-jsx"),

    // pnpm paths with different React versions
    path.resolve(
      process.cwd(),
      "node_modules/.pnpm/styled-jsx@5.1.6_react@19.1.0/node_modules/styled-jsx",
    ),
    path.resolve(
      process.cwd(),
      "node_modules/.pnpm/styled-jsx@5.1.6_react@18.2.0/node_modules/styled-jsx",
    ),
    path.resolve(
      process.cwd(),
      "node_modules/.pnpm/styled-jsx@5.1.6/node_modules/styled-jsx",
    ),

    // Relative to script location
    path.resolve(__dirname, "../node_modules/styled-jsx"),
    path.resolve(
      __dirname,
      "../node_modules/.pnpm/styled-jsx@5.1.6_react@19.1.0/node_modules/styled-jsx",
    ),
  ];

  const existingPaths = possiblePaths.filter((p) => {
    const exists = fs.existsSync(p);
    if (exists) {
      console.log(`Found styled-jsx at: ${p}`);
    }
    return exists;
  });

  if (existingPaths.length === 0) {
    console.log("Looking for styled-jsx in node_modules directories...");
    // Try to find styled-jsx in any node_modules directory
    try {
      const nodeModulesPath = path.resolve(process.cwd(), "node_modules");
      if (fs.existsSync(nodeModulesPath)) {
        const findPaths = findStyledJsxRecursive(nodeModulesPath);
        console.log(`Found ${findPaths.length} additional styled-jsx paths`);
        existingPaths.push(...findPaths);
      }
    } catch (err) {
      console.log("Error searching for styled-jsx recursively:", err.message);
    }
  }

  return existingPaths;
}

// Recursively find styled-jsx in node_modules
function findStyledJsxRecursive(dir, depth = 0, maxDepth = 3) {
  if (depth > maxDepth) return [];
  const results = [];

  try {
    if (!fs.existsSync(dir)) return results;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (entry.name === "styled-jsx") {
          results.push(fullPath);
        } else if (
          entry.name !== "node_modules" &&
          !entry.name.startsWith(".")
        ) {
          results.push(
            ...findStyledJsxRecursive(fullPath, depth + 1, maxDepth),
          );
        }
      }
    }
  } catch (err) {
    // Ignore permission errors
    console.log(`Skipping directory ${dir} due to: ${err.message}`);
  }

  return results;
}

// Fix the styled-jsx index.js file if it's missing
function fixStyledJsx() {
  const styledJsxPaths = findStyledJsxPaths();

  if (styledJsxPaths.length === 0) {
    console.log("Could not find styled-jsx installation path.");
    return;
  }

  styledJsxPaths.forEach((styledJsxPath) => {
    try {
      const indexPath = path.join(styledJsxPath, "index.js");
      const distPath = path.join(styledJsxPath, "dist/index/index.js");
      const stylePath = path.join(styledJsxPath, "style.js");

      console.log(`Checking styled-jsx at: ${styledJsxPath}`);
      console.log(`- index.js exists: ${fs.existsSync(indexPath)}`);
      console.log(`- dist/index/index.js exists: ${fs.existsSync(distPath)}`);

      // Handle missing index.js
      if (fs.existsSync(distPath) && !fs.existsSync(indexPath)) {
        try {
          // Create a simple proxy file that loads from dist
          const content = `'use strict';
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

          fs.writeFileSync(indexPath, content, "utf8");
          console.log(`Fixed missing index.js at ${indexPath}`);
        } catch (error) {
          console.error(`Error writing index.js at ${indexPath}:`, error);
        }
      }

      // Check if we need to fix package.json
      const packageJsonPath = path.join(styledJsxPath, "package.json");
      if (fs.existsSync(packageJsonPath)) {
        try {
          const packageJson = require(packageJsonPath);
          let needsUpdate = false;

          // Fix React peer dependency if needed
          if (
            packageJson.peerDependencies &&
            packageJson.peerDependencies.react &&
            !packageJson.peerDependencies.react.includes("19.x.x")
          ) {
            packageJson.peerDependencies.react =
              ">= 16.8.0 || 17.x.x || 18.x.x || 19.x.x";
            needsUpdate = true;
          }

          if (needsUpdate) {
            fs.writeFileSync(
              packageJsonPath,
              JSON.stringify(packageJson, null, 2),
              "utf8",
            );
            console.log(
              `Updated package.json at ${packageJsonPath} to support React 19`,
            );
          }
        } catch (err) {
          console.error(
            `Error updating package.json at ${packageJsonPath}:`,
            err,
          );
        }
      }
    } catch (err) {
      console.error(`Error processing styled-jsx at ${styledJsxPath}:`, err);
    }
  });
}

// Run the fix
try {
  fixStyledJsx();
  console.log("Postinstall script completed successfully.");
} catch (err) {
  console.error("Error in postinstall script:", err);
  // Don't exit with error code to avoid failing the build
}
