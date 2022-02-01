const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
// 检测循环引用的插件
const circular = require('circular-dependency-plugin');

module.exports = {
  chainWebpack(config){
    config.plugin('monaco').use(new MonacoWebpackPlugin())
    config.plugin('circular').use(new circular())
  },
}