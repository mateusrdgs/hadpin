const path = require('path')
const { merge } = require('webpack-merge')
const NodemonPlugin = require('nodemon-webpack-plugin')

const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  plugins: [
    new NodemonPlugin({
      watch: path.resolve(__dirname, '../', 'build')
    })
  ],
})
