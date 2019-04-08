const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, './deployment/vars/common.sh')});
const webpackCommonFactory = require('../../tools/webpack/webpackCommonFactory');

module.exports = webpackCommonFactory(__dirname, {
  resolve: {
    alias: {
      chapters: path.resolve(__dirname, `../shared/chapters/${process.env.chaptersDir}/index.js`)
    },
  },
  output: {
    publicPath: "/police-complain/"
  }
});
