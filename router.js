
var express = require('express')
var fs = require('fs')
var student = require('./student.js')

//创建一个路由容器
var router = express.Router()

//把路由都挂载到router路由容器中

//首页渲染
router.get('/student',(req,res)=>{
    student.findAll(function(err,data){
     if(err) {
         return res.status(505).send('Server err')
     }
     res.render('index.html',
     {
         students:data
     }
     )
    })
    
    
})

//渲染学生添加页面
router.get('/student/new',(req,res)=>{
    res.render('new.html')
})

//处理学生信息添加
router.post('/student/new',(req,res)=>{
   student.add(req.body,function(err){
        return res.status(505).end('Server error!')
   })
   res.redirect('/student')
})
  
    
//渲染学生信息编辑页面
router.get('/student/edit',(req,res)=>{
    student.findOne(req.query,function(err,data){
        if(err){
            res.status(505).end('server error!')
        }
        res.render('edit.html',{
           name:data.name,
           id:data.id,
           gender:data.gender,
           hobbies:data.hobbies,
           age:data.age
         })
    })
 
})

//处理学生信息编辑
router.post('/student/edit',(req,res)=>{
    student.updateById(req.body,function(err){
        if(err){
            res.status(505).end("服务端有毛病")
        }
        res.redirect('/student')  
    })
})

//处理学生删除
router.get('/student/delete',(req,res)=>{
    student.delete(req.query,function(err){
        return res.status(505).end('服务端出错，不管你事！')

    })
    res.redirect('/student')
})


module.exports = router