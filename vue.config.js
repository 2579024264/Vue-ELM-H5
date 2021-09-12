module.exports = {
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
    lintOnSave: false
  },
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Provide path to the file with resources
          // 要公用的scss的路径
          resources: './src/assets/style/mixin.scss'
        })
        .end()
    })
  },
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        views: '@/views',
        config: '@/config',
        network: '@/network',
        common: '@/common'
      }
    },
    externals: {
      vue: 'Vue',
      'element-ui': 'ELEMENT',
      vant: 'vant'
    }

  }
}
