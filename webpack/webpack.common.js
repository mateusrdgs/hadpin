const path = require('path')
const nodeExtenals = require('webpack-node-externals')

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, '../', 'build'),
    filename: 'index.js'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
  externals: [
    nodeExtenals()
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      contracts: path.resolve(__dirname, '../', './src/contracts'),
      controllers: path.resolve(__dirname, '../', './src/controllers'),
      database: path.resolve(__dirname, '../', './src/database'),
      routes: path.resolve(__dirname, '../', './src/routes'),
      services: path.resolve(__dirname, '../', './src/services'),
      application: path.resolve(__dirname, '../', './src/application'),
      server: path.resolve(__dirname, '../', './src/server')
    }
  }
}
