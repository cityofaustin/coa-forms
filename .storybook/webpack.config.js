// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

module.exports = {
  plugins: [
    // your custom plugins
  ],
  module: {
    rules: [
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
};
