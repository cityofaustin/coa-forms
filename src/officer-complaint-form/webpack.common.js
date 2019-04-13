const path = require('path');

//Must source env variables before running webpackCommonFactory
require('dotenv').config({ path: path.resolve(__dirname, './deployment/vars/common.sh')});
const webpackCommonFactory = require('../../tools/webpack/webpackCommonFactory');

module.exports = webpackCommonFactory(__dirname);
