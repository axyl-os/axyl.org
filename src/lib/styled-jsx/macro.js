"use client";

// Mock implementation of styled-jsx/macro.js
// This file provides compatibility for styled-jsx in Next.js with React 19

/**
 * This is a stub for the babel macro that would normally process styled-jsx syntax
 * Since we're not using the actual styled-jsx functionality, this just provides the API
 */

const createMacro = require === 'function' &&
  typeof require.resolve === 'function' ?
  function() { return () => {}; } :
  function() { return () => {}; };

// Create a mock macro
function styledJsxMacro() {
  return {
    css: function(strings, ...expressions) {
      return { className: 'jsx-macro' };
    },
    resolve: function(styles) {
      return { className: 'jsx-macro-resolve' };
    },
    glob: function(pattern) {
      return { className: 'jsx-macro-glob' };
    }
  };
}

// Export macro as if it was created by babel-plugin-macros
module.exports = createMacro ? createMacro(styledJsxMacro) : styledJsxMacro();
module.exports.default = module.exports;
