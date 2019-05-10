const webpack = require("webpack");
const path = require("path");

/**
  webpackLocalFactory is a factory function that builds a webpack config for running a local dev server.
  It is invoked in each form's webpack.config.js.
  Assuming that each form follows the same file structure conventions
  (eg: using src/app.js as the entrypoint, outputting to public/, using FORM_API_URL env variable, etc.).

  You can overwrite or add additional configs specific to your form by plugging them into
  extraLocalConfigs within your form's webpack.config.js.

  Source environment variables with 'dotenv' library in your form's webpack.config.js before running webpackLocalFactory.
  All `process.env.___` variables in this factory function will be plugged in with your form's specific variables.

  @param __dirname: plug in your form's __dirname to resolve all of the filepaths correctly.
    Note: the __dirname in this file will not refer to *this* particular directory,
    it will refer to the form-specific __dirname that you plug in.
**/

const webpackLocalFactory = __dirname => {
  return {
    mode: "production",
    devtool: "source-map",
    devServer: {
      contentBase: path.resolve(__dirname, "public"),
      historyApiFallback: true,
      open: true,
      public: `http://localhost:8080/${process.env.DEPLOYMENT_PATH_EN}`,
      writeToDisk: true // This allows page refreshes locally
    }
  };
};

module.exports = webpackLocalFactory;
