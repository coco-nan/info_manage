
var express = require('express')
var router = require('./router.js')

//配置body-parse中间件
var bodyParser = require('body-parser')


//创建服务器
var app = express()
//打开文件
var fs = require('fs')

//配置body-parse中间件（插件）这个要在挂载路由之前
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//开启art-template模板引擎
app.engine('html',require('express-art-template'))

//路由
app.use(router)
//监听8888端口
app.listen(8888,()=>console.log('running 8888...'))



//资源开放
app.use('/public/',express.static('./public/'))
    
//开放node_module资源，url必须以node_module为开头
app.use('/node_modules/',express.static('./node_modules/'))

 