const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/**
  webpackCommonFactory is a factory function that builds webpack configs that are common to both local and production builds.
  It is invoked in each form's webpack.config.js.
  Assuming that each form follows the same file structure conventions
  (eg: using src/app.js as the entrypoint, outputting to public/).

  You can overwrite or add additional configs specific to your form by plugging them into
  extraCommonConfigs within your form's webpack.config.js.

  Source environment variables with 'dotenv' library in your form's webpack.config.js before running webpackCommonFactory.
  All `process.env.___` variables in this factory function will be plugged in with your form's specific variables.

  @param __dirname: plug in your form's __dirname to resolve all of the filepaths correctly.
    Note: the __dirname in this file will not refer to *this* particular directory,
    it will refer to the form-specific __dirname that you plug in at webpack.config.js.
**/

const webpackCommonFactory = (__dirname) => {
  const config = {
    resolve: {
      modules: ["node_modules"],
      extensions: [".js", ".jsx"],
      alias: {
        chapters: path.resolve(__dirname, `../../shared/chapters/${process.env.CHAPTERS_DIR}/index.js`)
      }
    },
    context: __dirname,
    node: { __filename: true },
    entry: path.resolve(__dirname, "src/app.js"),
    output: {
      path: path.resolve(__dirname, "public"),
      publicPath: `/${process.env.DEPLOYMENT_PATH_EN}/`,
      filename: "js/app.bundle.js"
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          FORM_API_URL: JSON.stringify(process.env.FORM_API_URL),
          DEPLOYMENT_PATH: JSON.stringify(process.env.DEPLOYMENT_PATH_EN),
          DEPLOYMENT_PATH_EN: JSON.stringify(process.env.DEPLOYMENT_PATH_EN),
          DEPLOYMENT_PATH_ES: JSON.stringify(process.env.DEPLOYMENT_PATH_ES),
        },
      }),
      new CopyPlugin([
        {from: `${__dirname}/src/index.html`},
      ]),
    ],
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
            path.resolve(__dirname, '../../shared'),
            path.resolve(__dirname, '.')
          ],
          use: {
            loader: "babel-loader?cacheDirectory",
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

  if (process.env.RUN_BUNDLE_ANALYZER === "true") {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: 'stats/bundle.html',
        generateStatsFile: true,
        statsFilename: 'stats/bundle.json'
      })
    )
  }

  return config;
};

module.exports = webpackCommonFactory
