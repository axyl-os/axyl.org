"use client";

// Mock implementation of styled-jsx/babel.js
// This file provides compatibility for styled-jsx in Next.js with React 19

/**
 * This is a stub for the babel plugin that would normally process styled-jsx syntax
 * Since we're not using the actual styled-jsx functionality, this just provides the API
 */

// Main plugin export
module.exports = function() {
  return {
    visitor: {
      // Empty visitor that does nothing
    }
  };
};

// Add named exports that match the original API
module.exports.default = module.exports;
module.exports.getLocalIdent = function(filename, styleText) {
  return 'jsx-' + Math.floor(Math.random() * 10000);
};

// These are commonly used options in the babel plugin
module.exports.options = {
  optimizeForSpeed: true,
  sourceMaps: false,
  vendorPrefixes: true
};
