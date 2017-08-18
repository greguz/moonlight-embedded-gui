const nodeExternals = require('webpack-node-externals')

module.exports = {
  devtool: 'source-map',
  target: 'electron-renderer',
  entry: {
    rendered: './app/rendered.js'
  },
  externals: [
    nodeExternals({
      whitelist: [ 'vue' ]
    })
  ],
  output: {
    filename: './out/[name].js'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
}
