const path = require("path");
const merge = require("webpack-merge");

const webpackCommonFactory = require('../../tools/webpack/webpackCommonFactory');
const webpackLocalFactory = require('../../tools/webpack/webpackLocalFactory');
const webpackDeployedFactory = require('../../tools/webpack/webpackDeployedFactory');

module.exports = (env) => {
  require('dotenv').config({ path: path.resolve(__dirname, `./deployment/vars/${env}.env`)});

  // Additional form-specific webpack configs can be entered here
  const extraCommonConfigs = {};
  const extraLocalConfigs = {};
  const extraProdConfigs = {};

  const webpackCommon = merge(
    webpackCommonFactory(__dirname),
    extraCommonConfigs
  );

  const webpackLocal = merge(
    webpackCommon,
    webpackLocalFactory(__dirname),
    extraLocalConfigs
  )

  const webpackDeployed = merge(
    webpackCommon,
    webpackDeployedFactory(__dirname),
    extraProdConfigs
  )

  if (env === "local") {
    return webpackLocal
  } else if (
    (env === "dev") ||
    (env === "staging") ||
    (env === "uat") ||
    (env === "prod")
  ) {
    return webpackDeployed
  } else {
    return {}
  }
}
