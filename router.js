/*
*router.js 路由模块
* 职责：
*   处理路由
*   根据不同的请求方法 + 请求路径设置具体的请求处理函数
* */

//Express 提供了包装路由的方式
var express = require('express')

var Students = require('./students')

//1.创建一个路由容器
var router = express.Router()

//2.把路由都挂载到 router 容器中
router.get('/',(req,res) => {
  Students.find().then((students) => {
    res.render('index.html',{
      grandes: [
        '一年级',
        '二年级',
        '三年级',
        '四年级',
      ],
      students: students
    })
  }).catch(() => {
    return res.status(500).send('Server error')
  })
})

router.get('/students/new',(req,res) => {
  res.render('new.html')
})

router.post('/students/new',(req,res) => {
  Students.save(req.body).then(() => {
    res.redirect('/')
  }).catch(() => {
    return res.status(500).send('Server error')
  })
})

router.get('/students/edit',(req,res) => {
  Students.findById(parseInt(req.query.id)).then((student,studentGender) => {
    if(parseInt(studentGender) === 0) {
      res.render('edit.html',{
        student: student,
        checkedman: 'checked'
      })
    }else {
      res.render('edit.html',{
        student: student,
        checkedwoman: 'checked'
      })
    }
  }).catch(() => {
    return res.status(500).send('Server error')
  })
})

router.post('/students/edit',(req,res) => {
 Students.updateById(req.body).then(() => {
   res.redirect('/')
 }).catch(() => {
   return res.status(500).send('Server error')
 })
})
router.get('/students/delete',(req,res) => {
  Students.deleteById(req.query.id).then(() => {
    res.redirect('/')
  }).catch(() => {
    return res.status(500).send('Server error')
  })
})

//3.导出路由容器
module.exports = router