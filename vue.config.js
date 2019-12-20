const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
module.exports = {
    //...其他配置
  css: {
   loaderOptions: {
    postcss: {
     plugins: [
      require('postcss-pxtorem')({
       rootValue: 37.5,
       minPixelValue: 2,
       propList: ['*'],
      })
     ]
    }
   }
  },
  chainWebpack: (config) => {
    /* 添加分析工具*/
    if (process.env.NODE_ENV === 'production') {
        if (process.env.npm_config_report) {
            config
                .plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                .end();
            config.plugins.delete('prefetch')
        }
    } }
}