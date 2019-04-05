const path = require('path');
const webpackCommonFactory = require('../shared/devops/webpackCommonFactory');

module.exports = webpackCommonFactory(__dirname, {
  resolve: {
    alias: {
      chapters: path.resolve(__dirname, '../shared/OPO-chapters/index.js')
    },
  },
  output: {
    publicPath: "/police-complain/"
  }
});
