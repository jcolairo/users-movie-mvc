var TestUtils = {
  generateUniqueString: function (prefix) {
    return prefix + Math.random();
  },
  getFirstUserIdFromUserListHTML: function (html) {
    var regExp = /\/users\/[0-9a-f]+/;
    var result = regExp.exec(html)[0];
    var pathElements = result.split('/');

    return pathElements[2];
  }
};

module.exports = TestUtils;
