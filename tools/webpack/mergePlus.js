const merge = require("webpack-merge");

/**
  Like webpack-merge, only better.

  Uses Object.assign() to consolidate process.env variables from all merged webpackConfig files.
  On conflict, the latest value wins.

  This function expects environment vars to be nested under 'process.env'
  ex:
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        DEPLOYMENT_PATH: JSON.stringify(process.env.DEPLOYMENT_PATH_EN)
      },
    }),
  ]
**/
const mergePlus = (...webpackConfigs) => {
  const mergedWebpack = merge.apply(null, webpackConfigs);

  const plugins = mergedWebpack.plugins;
  if (!plugins) {
    return mergedWebpack
  }

  let primaryDefinitions;
  for (let i=0;i<plugins.length;i++) {
    const plugin = plugins[i];
    const definitions = plugin.definitions
    if (definitions) {
      if (!primaryDefinitions) {
        primaryDefinitions = definitions["process.env"];
      } else {
        primaryDefinitions = Object.assign(primaryDefinitions, definitions["process.env"])
        plugins.splice(i,1);
        i=i-1;
      }
    }
  }

  return mergedWebpack;
}

module.exports = mergePlus;
