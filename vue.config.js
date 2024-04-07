const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('svg')
      .test(/\.(svg)(\?.*)?$/)
      .use('file-loader')
        .loader('file-loader')
        .options({
          name: 'img/[name].[hash:8].[ext]'
        })
  }
}

