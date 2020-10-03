const path = require('path')
const webpack = require("webpack");
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const CompressionWebpackPlugin = require('compression-webpack-plugin');
function resolve(dir) {
  return path.join(__dirname, dir)
}
let publicPath = './'
module.exports = {
  //子网站使用
  publicPath,
  outputDir: '../tomato-app/dist-web',
  devServer: {
    hotOnly:true,
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  pages: {
    index: {
      // page 的入口
      entry: 'src/index.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Index Page',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production'){
      config.plugin("CompressionWebpack")
        .use(
          new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: productionGzipExtensions,
            threshold: 2048,
            minRatio: 0.8
          })
        ).end()
    }
    config.plugin("DllReference")
      .use(
        new webpack.DllReferencePlugin({
          context: process.cwd(),
          manifest: require("./build/vendor/vendor-manifest.json")
        })
      ).end()
    config.plugin("assetsAdd")
      .use(
        new AddAssetHtmlPlugin({
          filepath: path.resolve(__dirname, './build/vendor/*.js'),
          // dll 引用路径
          publicPath: publicPath + '/vendor',
          // dll最终输出的目录
          outputPath: './vendor'
        })
      ).end()
    config
      .module
      .rule('ico')
      .test(/\.ico$/)
      .use('file')
      .loader('file-loader')
      .end()
    config
      .module
      .rule('node')
      .test(/\.node$/)
      .use('file')
      .loader('file-loader')
      .end()
    return config
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.js',
        assets: resolve('src/assets'),
          components: resolve('src/component'),
          vendor: resolve('src/vendor'),
          config: resolve('src/config'),
          router: resolve('src/router'),
          pages: resolve('src/pages'),
          mixs: resolve('src/mixs'),
          store: resolve('src/store'),
          utils: resolve('src/utils'),
          api: resolve('src/api'),
          test: resolve('src/test'),
          model: resolve('src/model'),
      }
    }
  }
}