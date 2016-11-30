const webpack = require('webpack');
const path = require('path');
const APP_DIR = path.resolve(__dirname, 'client/src/startup');

const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

const config = {
  entry: APP_DIR + '/serverRegistration.jsx',
  output: {
    filename: 'app/Resources/webpack/server-bundle.js',
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
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    })
  ],
  externals: [
    {
      'isomorphic-fetch': {
        root: 'isomorphic-fetch',
        commonjs2: 'isomorphic-fetch',
        commonjs: 'isomorphic-fetch',
        amd: 'isomorphic-fetch'
      }
    }
  ],
};

module.exports = config;
