const webpack = require('webpack');
const path = require('path');
const APP_DIR = path.resolve(__dirname, 'client/src/startup');
const isProd = (process.env.NODE_ENV === 'production');

var config = {
  entry: APP_DIR + '/ClientRegistration.jsx',
  output: {
    path: './web/assets/build/',
    publicPath: '/assets/build/',
    filename: 'client-bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module : {
    loaders : [
      { test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
    ]
  }
};

function getPlugins() {
  var plugins = [];
  if (isProd) {
    plugins.push(new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')

      }
    }));
  }
  // plugins.push(new webpack.optimize.UglifyJsPlugin({
  //   compress: {
  //     warnings: false
  //   }
  // }));

  return plugins;
}

if(!isProd) {
  config.devtool = 'inline-source-map';
}
config.plugins = getPlugins();

module.exports = config;
