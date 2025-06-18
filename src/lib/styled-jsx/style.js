"use client";

// Mock implementation of styled-jsx/style.js
// This file provides compatibility for styled-jsx in Next.js with React 19

/**
 * This function is a stub that mimics the behavior of styled-jsx's style function
 * In the actual library, this would process and apply CSS styles
 */
module.exports = function style() {
  // Return null since we're not actually applying styles
  return null;
};

// Add additional exports to match styled-jsx interface
module.exports.flush = function flush() {
  return [];
};

module.exports.flushToHTML = function flushToHTML() {
  return '';
};
