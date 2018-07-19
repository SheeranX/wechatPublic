'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  LOOK_API:'"http://192.168.18.54:8080/DEMO"',
  BASE_API:'"http://192.168.18.12:8888/DEMO"',
  //WECHAT:'"http://15d2652f01.51mypc.cn"'
})
