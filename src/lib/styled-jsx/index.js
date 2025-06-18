/*
 * Minimal styled-jsx implementation for React 19
 * This is a stub implementation that allows Next.js to build without errors
 */

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

// Style component - returns null since we're not using actual styled-jsx features
function style() {
  return null;
}

// Main JSX implementation function
function jsx(strings, ...expressions) {
  return null;
}

// Export functions
exports.style = style;
exports.jsx = jsx;

// Re-export the flush methods that Next.js often uses
exports.flush = function flush() {
  return [];
};

exports.flushToHTML = function flushToHTML() {
  return "";
};

// Create the default export with all required methods
const styledJsx = {
  // Dynamic styled-jsx factory
  dynamic: function (styles) {
    return function () {
      return null;
    };
  },
  // System styles support
  withSystem: function () {
    return function () {
      return null;
    };
  },
  // Allow methods to be called directly
  style: style,
  jsx: jsx,
  flush: exports.flush,
  flushToHTML: exports.flushToHTML,
  // CSS template tag implementation
  css: function css() {
    return { className: "jsx-123456789" };
  },
};

// Export as default
exports.default = styledJsx;

// Make these available as direct imports
module.exports = Object.assign(module.exports, styledJsx);
