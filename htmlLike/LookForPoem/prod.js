/**
 * @file 部署配置
 * @author dongkunshan(dongkunshan@xueleyun.com)
 */

function getProd(config, entry) {
  const path = require('path');
  const fs = require('fs-extra');
  const Chalk = require('chalk');
  const webpack = require('webpack');
  const baseConfig = require('./base');
  const merge = require('webpack-merge');
  const Html = require('html-webpack-plugin');
  const CopyPlugin = require('copy-webpack-plugin');
  const Extract = require('mini-css-extract-plugin');
  const TerserJs = require('terser-webpack-plugin');
  const ProgressBar = require('progress-bar-webpack-plugin');
  const FriendlyErrors = require('friendly-errors-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const CSSAssets = require('optimize-css-assets-webpack-plugin');

  const copys = [{
    from: path.resolve(config.root, 'static'),
    to: config.dev.subassetsRir,
    ignore: ['mock/**.*']
  }]

  if (fs.pathExistsSync(path.resolve(config.root, 'src/assets'))) {
    copys.push({
      from: path.resolve(config.root, 'src/assets'),
      to: 'assets',
      ignore: ['css', '*.md']
    })
  }

  let webpackConfig = merge(baseConfig(config, entry), {
    mode: 'production',
    devtool: '#eval-source-map',
    optimization: {
      minimizer: [
        new TerserJs({
          cache: true,
          parallel: true,
          sourceMap: config.pub.sourceMap
        }),
        new CSSAssets({})
      ]
    },
    output: {
      path: path.join(config.root, config.pub.assetsRir),
      filename: 'js/[name].[chunkhash].js',
      chunkFilename: 'js/[name].[chunkhash].js',
      publicPath: config.pub.assetsPath
    },
    performance: {
      hints: false
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [Extract.loader, 'css-loader', 'postcss-loader']
        },
        {
          test: /\.less$/,
          use: [Extract.loader, 'css-loader', 'postcss-loader', 'less-loader']
        }
      ]
    },
    stats: {
      children: false,
      chunks: false,
      modules: false
    },
    // 插件项
    plugins: [
      // webpack迁移插件
      new webpack.LoaderOptionsPlugin({ options: {} }),
      new CleanWebpackPlugin(),
      new FriendlyErrors(),
      new ProgressBar({
        complete: Chalk.green('█'),
        incomplete: Chalk.white('█'),
        format: '  :bar ' + Chalk.green.bold(':percent') + ' :msg',
        clear: false
      }),
      new Extract({
        filename: '[name].[contenthash:12].css',
        chunkFilename: '[name].css'
      }),
      new CopyPlugin(copys)
    ]
  })

  for (const page in entry) {
    webpackConfig.plugins.push(
      new Html({
        filename: page + '.html',
        template: path.join(config.root, entry[page].template),
        inject: true,
        chunks: [page],
        meta: entry[page].meta || [],
        templateParameters: {
          env: 'prod',
          app: '../',
          root: '',
          src: '',
          title: entry[page].title,
          vendor: config.pub.assetsPath + 'static/dll.vendor.js',
          hash: new Date().getTime()
        },
        chunksSortMode: 'dependency'
      })
    )
  }

  if (config.pub.analyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
  }

  if (config.pub.gzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' + config.pub.gzipExtensions.join('|') + ')$'
        ),
        threshold: 10240,
        minRatio: 0.8
      })
    )
  }
  // merge loader
  if (config.pub.loaders.length > 0) {
    config.pub.loaders.forEach(item => {
      item.test = new RegExp(
        '\\.(' + item.test.join('|') + ')$'
      )
      webpackConfig.module.rules.push(item)
    })
  }

  if (config.pub.plugins.length > 0) {
    config.pub.plugins.forEach((item) => {
      webpackConfig.plugins.push(item)
    })
  }

  return webpackConfig
}

module.exports = getProd
