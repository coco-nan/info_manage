/**
 * 数据操作模块
 * 操作文件中的数据
 * 不关心业务
 */
var fs = require('fs')
const dbPath = './db.json'

 //查询所有学生
 //回调函数
  exports.findAll = function(callback){
    fs.readFile(dbPath,(err,data) => {
        if(err){
            callback(err)
        }
         callback(null,JSON.parse(data).students)
       })

    }

   //添加数据
   exports.add = function(student_data,callback){
    fs.readFile(dbPath,function(err,data){
        if(err){
            callback(err)
        }
        var obj ={}
        var student = JSON.parse(data).students

        //添加id,重复
        student_data.id = student[student.length -1].id +1;
        student.push(student_data)
        obj.students = student

        //写入文件
        fs.writeFile(dbPath,JSON.stringify(obj),function(err){
            callback(err)
        })
      })   
   }



   //删除数据
   exports.delete = function(student,callback){
       var id = student.id

       fs.readFile(dbPath,'utf8',function(err,data){
          var students = JSON.parse(data).students
         
          students.forEach(element => {
              if(element.id == id){
                students.splice(students.indexOf(element),1) 
              } 
              
          })
          var obj = {}
          obj.students = students
    
          fs.writeFile(dbPath,JSON.stringify(obj),function(err){
              callback(err)
          })
       })

   }
 



  //获取单个人的数据
  exports.findOne = function(student_id,callback){
      var studentId = student_id.id
      fs.readFile(dbPath,'utf8',function(err,data){
        var arr =  JSON.parse(data).students
        arr.forEach(element=>{
            if(element.id == studentId ){
                callback(null,element)
            }
        })
        if(err)callback(err)

      })
  }

  //修改数据
  exports.updateById = function(student,callback){
      //读取数据库文件
      fs.readFile(dbPath,'utf8',function(err,data){
          //读取失败后的调用
          if(err){
              callback(err)
          } 

          //读取成功后
          //读取请求体中的id数据
         var studentId = student.id

         //读取数据库中students学生中的数组
         var arr = JSON.parse(data).students

         //循环数组内容 在es6的find函数、和遍历拷贝对象
         /**
          * for(key in student){
          * //用find找到的对象
          * stu[key] = student[key]
          * }
          */

         arr.forEach(element=>{
             //匹配与请求体相同id的
             if(studentId == element.id){
                 //数组内容替换
                arr.splice(arr.indexOf(element),1,student) 
             }
         })

         //重新整合数据库内容
         var ret = JSON.stringify({
             students:arr
         })

         //写入数据库
         fs.writeFile(dbPath,ret,function(err){
             callback(err)
         })
      
      })


  }  



//