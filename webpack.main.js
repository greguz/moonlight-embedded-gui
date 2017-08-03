module.exports = {
  devtool: 'source-map',
  target: 'electron-main',
  entry: {
    main: './app/main.js'
  },
  output: {
    filename: './out/[name].js'
  },
  node: {
    __dirname: false,
    __filename: false
  }
}
