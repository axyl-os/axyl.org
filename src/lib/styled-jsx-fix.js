// This file ensures that styled-jsx is properly loaded in Next.js
// It works around issues with React 19 compatibility

'use strict';

// Try loading the actual styled-jsx library
let styledJsx;
try {
  // Try direct import first
  styledJsx = require('styled-jsx');
} catch (e) {
  try {
    // Fall back to requiring from dist
    const path = require('path');
    const fs = require('fs');

    // Try to find styled-jsx in node_modules
    const baseDir = path.resolve(process.cwd(), 'node_modules/styled-jsx');
    if (fs.existsSync(path.join(baseDir, 'dist/index/index.js'))) {
      styledJsx = require(path.join(baseDir, 'dist/index/index.js'));
    } else if (fs.existsSync(path.join(baseDir, 'dist/index.js'))) {
      styledJsx = require(path.join(baseDir, 'dist/index.js'));
    } else {
      // Last resort - create a stub implementation
      console.warn('styled-jsx not found, using minimal implementation');
      styledJsx = {
        style: () => null,
        __esModule: true,
        default: {
          dynamic: () => () => null,
          withSystem: () => () => null
        }
      };
    }
  } catch (innerError) {
    console.error('Failed to load styled-jsx:', innerError);

    // Provide a minimal implementation to prevent crashes
    styledJsx = {
      style: () => null,
      __esModule: true,
      default: {
        dynamic: () => () => null,
        withSystem: () => () => null
      }
    };
  }
}

// Re-export everything from the original module
if (styledJsx.__esModule) {
  module.exports = styledJsx;
} else {
  Object.keys(styledJsx).forEach(key => {
    module.exports[key] = styledJsx[key];
  });
  module.exports.default = styledJsx;
  module.exports.__esModule = true;
}
