module.exports = {
  devtool: 'source-map',
  target: 'electron-renderer',
  entry: {
    rendered: './app/rendered.js'
  },
  output: {
    filename: './out/[name].js'
  },
  module: {
    rules: [{
      test: /\.html$/,
      use: [ {
        loader: 'html-loader',
        options: {
          minimize: false,
          removeComments: false,
          collapseWhitespace: false
        }
      }]
    }]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
}
