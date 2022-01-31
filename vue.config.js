module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  chainWebpack: config => {
      config.module.rule('comlink')
        .test('/\.worker\.js$/i')
        .use('comlink-loader')
          .loader('comlink-loader')
          .end();
    },
  devServer: {
      port: 9002
    }
}
