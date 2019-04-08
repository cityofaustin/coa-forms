const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

require('dotenv').config({ path: path.resolve(__dirname, './deployment/vars/local.sh')});

module.exports = merge(require('./webpack.common.js'), {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        thing: JSON.stringify(process.env.thing),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        FORM_API_URL: JSON.stringify(process.env.FORM_API_URL)
      },
    })
  ]
});
