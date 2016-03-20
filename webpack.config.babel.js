import path from 'path'

import webpack from 'webpack'
import merge from 'webpack-merge'
import HTMLWebpack from 'html-webpack-plugin'

const
  DEBUG = 'production' !== process.env.NODE_ENV,

  sharedConfig = {
    'context': __dirname,

    'entry': [ path.join(__dirname, 'src/index.js') ],

    'output': {
      'path': path.resolve(__dirname, 'dist'),
      'filename': '[hash].js'
    },

    'resolve': {
      'modulesDirectories': [ 'node_modules' ],
      'extensions': [ '', '.js', '.elm' ]
    },

    'module': {
      'noParse': /\.elm$/,
      'loaders': [
        { 'test': /\.js$/, 'exclude': /node_modules/, 'loader': 'babel-loader' },
        { 'test': /\.elm$/, 'exclude': [ /node_modules/, /elm-stuff/ ], 'loader': 'elm-webpack' }
      ]
    },

    'plugins': [
      new HTMLWebpack({ 'template': 'src/index.html' })
    ]
  }

let
  webpackConfig

if(DEBUG) {

  webpackConfig = merge(sharedConfig, {
    'entry': [
      'webpack-dev-server/client?http://127.0.0.1:5000'
    ],

    'devServer': {
      'host': '127.0.0.1',
      'port': 5000,
      'noInfo': true
    }
  })

}
else {

  webpackConfig = merge(sharedConfig, {
    'plugins': [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        'minimize': true,
        'compressor': { 'warnings': false }
      })
    ]
  })

}

export default webpackConfig
