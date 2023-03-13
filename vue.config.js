module.exports = {
  lintOnSave:false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  chainWebpack: config => {
    config.resolve.set("fallback",{
      crypto: require.resolve("crypto-browserify"),
      stream:require.resolve("stream-browserify"),
      fs:false,
      path:false
    });
      config.plugins.delete("prefetch");
    },
  devServer: {
      port: 9002
    }
}
