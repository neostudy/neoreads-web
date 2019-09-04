var path = require('path')
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src')
      }
    },
    externals: {
      'vue': 'Vue',
      'element-ui' : 'ELEMENT',
      'mavon-editor': 'MavonEditor',
      'markdown-it': 'MarkdownIt',
      '@fortawesome/fontawesome-svg-core': 'library',
    }
  },
  pluginOptions: {
    i18n: {
      locale: 'zh',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  baseUrl: './',
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/iciba': {
        target: 'http://dict-co.iciba.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/iciba': ''
        }
      },
      '/api': {
        target: 'http://localhost:8090/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      },
      '/content': {
        target: 'http://chapter2.zhuishushenqi.com',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/content': ''
        }
      }
    }
  }
}
