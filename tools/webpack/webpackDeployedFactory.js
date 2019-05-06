const webpack = require("webpack");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

/**
  webpackDeployedFactory is a factory function that builds a webpack config for a deployed build.
  It is invoked in each form's webpack.config.js.
  Assuming that each form follows the same file structure conventions
  (eg: using src/app.js as the entrypoint, outputting to public/, using FORM_API_URL env variable, etc.).

  You can overwrite or add additional configs specific to your form by plugging them into
  extraDeployedConfigs within your form's webpack.config.js.

  Source environment variables with 'dotenv' library in your form's webpack.config.js before running webpackDeployedFactory.
  All `process.env.___` variables in this factory function will be plugged in with your form's specific variables.

  @param __dirname: plug in your form's __dirname to resolve all of the filepaths correctly.
    Note: the __dirname in this file will not refer to *this* particular directory,
    it will refer to the form-specific __dirname that you plug in.
**/

const webpackDeployedFactory = (__dirname) => {
  return {
    mode: 'production',
    // devtool: 'source-map',
    stats: {
      colors: false,
      hash: true,
      timings: true,
      assets: true,
      chunks: true,
      chunkModules: true,
      modules: true,
      children: true,
    },
    optimization: {
      minimizer: [
        new UglifyJSPlugin({
          sourceMap: true,
          cache: true,
          parallel: true,
          uglifyOptions: {
            compress: {
              inline: false
            }
          }
        })
      ],
      runtimeChunk: false,
      splitChunks: {
        cacheGroups: {
          // default: false,
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            // minChunks: 2
          }
        }
      }
    },
    plugins: [
      new CompressionPlugin({
        cache: true,
        algorithm: 'gzip',
  			// test: /\.(js|css|html|svg)$/,
  		})
    ]
  }
};

module.exports = webpackDeployedFactory
