module.exports = {
  hooks: {
    readPackage(pkg) {
      // This fixes the React 19 compatibility issue with styled-jsx
      if (pkg.name === 'styled-jsx') {
        if (pkg.peerDependencies && pkg.peerDependencies.react) {
          pkg.peerDependencies.react = ">=16.8.0 || ^19.0.0";
        }
      }
      return pkg;
    }
  }
}
