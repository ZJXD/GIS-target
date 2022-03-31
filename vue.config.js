const path = require('path')
const resolve = (dir) => path.join(__dirname, dir) // 路径

module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts'
    }
  },
  chainWebpack: (config) => {
    // 配置相关loader，支持修改，添加和替换相关的loader
    config.resolve.alias.set('@', resolve('src'))
  }
}
