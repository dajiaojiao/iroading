const path = require('path');

module.exports = {
  name: 'LookForPorm',
  view: 'vue',
  lang: 'js',
  ssr: false,
  root: "./",
  alias: {
    build: path.join(__dirname, '../apps/build'),
    shared: path.join(__dirname, '../apps/shared')
  },
  pub: {
    assetsRir: 'dist',
    assetsPath: '',
    sourceMap: false,
    devtool: '#source-map',
    gzip: true,
    gzipExtensions: ['js', 'css'],
    analyzerReport: false,
    loaders: [],
    plugins: []
  },
  dev: {
    subassetsRir: 'static',
    assetsPath: '/',
    host: '0.0.0.0',
    port: 8080,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    showEslintErrorsInOverlay: false,
    devtool: 'cheap-module-eval-source-map',
    cacheBusting: true,
    cssSourceMap: true,
    loaders: [],
    plugins: [],
    quiet: true,
    analyzerReport: false
  }
}
