const path = require("path");
const merge = require('webpack-merge');

/**
  webpackCommonFactory is a factory function that builds webpack.common.js configs that can be used by any form.
  Assuming that each form follows the same conventions
  (eg: using app.js as the entrypoint, outputting to public/), then
  this webpack.common.root.js will work as a common base for every form.

  @param __dirname: plug in your form's __dirname to resolve all of the filepaths correctly.
    Note: the __dirname in this file will not refer to *this* particular directory,
    it will refer to the form-specific __dirname that you plug in.
  @param formConfigs: extra form-specific configs that will get merged in with the base webpack configs.
    At a minimum, each form should set their own output.publicPath.
**/

const webpackCommonFactory = (__dirname, formConfigs={}) => {
  const baseWebpackConfig = {
    resolve: {
      modules: ["node_modules"],
      extensions: [".js", ".jsx"]
    },
    // context: process.cwd(),
    node: { __filename: true },
    entry: path.resolve(__dirname, "app"),
    output: {
      path: path.resolve(__dirname, "public"),
      publicPath: "/police-complain/",
      filename: "js/app.bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
          ]
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          include: [
            path.resolve(__dirname, '../shared'),
            path.resolve(__dirname, '.')
          ],
          use: {
            loader: "babel-loader",
            options: {
              /**
                Resetting the root directory allows us to transpile jsx code that is
                outside of your form. We can transpile shared chapters or other components from an
                outside directory
              **/
              root: '../..'
            }
          }
        },
        {
          test: /\.css$/,
          loaders: ["style-loader", "css-loader"]
        },
        {
          test: /\.svg/,
          loaders: ["svg-url-loader"]
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          use: {
            loader: "url-loader",
            options: {
              limit: 4096,
              name: "images/[name].[ext]"
            }
          }
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 4096,
              name: "fonts/[name].[ext]",
              mimetype: "application/font-woff"
            }
          }
        },
        {
          test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: {
            loader: "file-loader",
            options: {
              limit: 4096,
              name: "fonts/[name].[ext]"
            }
          }
        }
      ]
    }
  }

  return merge(baseWebpackConfig, formConfigs)
};

module.exports = webpackCommonFactory
