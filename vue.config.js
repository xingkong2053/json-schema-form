const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
// 检测循环引用的插件
const circular = require('circular-dependency-plugin');

module.exports = {
  chainWebpack(config){
    config.plugin('monaco').use(new MonacoWebpackPlugin())
    // https://github.com/aackerman/circular-dependency-plugin
    config.plugin('circular').use(new circular({
      exclude: /node_modules/,
    }))
  },
}