const path = require("path");
const webpack = require('webpack');

const webpackCommonFactory = require('../../tools/webpack/webpackCommonFactory');
const webpackLocalFactory = require('../../tools/webpack/webpackLocalFactory');
const webpackDeployedFactory = require('../../tools/webpack/webpackDeployedFactory');
const webpackSpanishFactory = require('../../tools/webpack/webpackSpanishFactory');
const mergePlus = require('../../tools/webpack/mergePlus');

module.exports = (env) => {
  // Source environment variables
  let varPath = env;
  if (varPath === "local-es") varPath="local";
  require('dotenv-expand')(require('dotenv').config({ path: path.resolve(__dirname, `./deployment/vars/${varPath}.sh`)}));

  // Additional form-specific webpack configs can be entered here
  const extraCommonConfigs = {};
  const extraLocalConfigs = {};
  const extraDeployedConfigs = {};

  const webpackCommon = mergePlus(
    webpackCommonFactory(__dirname),
    extraCommonConfigs
  );

  const webpackLocal = mergePlus(
    webpackCommon,
    webpackLocalFactory(__dirname),
    extraLocalConfigs
  )

  const webpackLocalSpanish = mergePlus(
    webpackLocal,
    webpackSpanishFactory(__dirname)
  )

  const webpackDeployed = mergePlus(
    webpackCommon,
    webpackDeployedFactory(__dirname),
    extraDeployedConfigs
  )

  const webpackDeployedSpanish = mergePlus(
    webpackDeployed,
    webpackSpanishFactory(__dirname)
  )

  if (env === "local") {
    return webpackLocal
  } else if (env === "local-es") {
    return webpackLocalSpanish
  } else if (
    (env === "dev") ||
    (env === "staging") ||
    (env === "prod")
  ) {
    return [
      webpackDeployed,
      webpackDeployedSpanish
    ]
  } else {
    return {}
  }
}
