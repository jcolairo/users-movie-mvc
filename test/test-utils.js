// Utilities used by test specs.
// Singleton (so init-cap the object name).
var TestUtils = {
  generateUniqueString: function (prefix) {
    return prefix + Math.random();
  }
};

module.exports = TestUtils;
