const nodeExternals = require('webpack-node-externals')

module.exports = {
  devtool: 'source-map',
  target: 'electron-main',
  entry: {
    main: './app/main.js'
  },
  externals: [
    nodeExternals()
  ],
  output: {
    filename: './out/[name].js'
  },
  node: {
    __dirname: false,
    __filename: false
  }
}
