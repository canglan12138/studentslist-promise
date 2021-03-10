/*
* students-fs.js 数据操作模块
* 职责：
*   操作文件中的数据，只处理数据，不关心业务
*   封装异步 API
* 重点：
*   Promise 异步操作
* */

var fs = require('fs')
var dbPath = './db.json'

/*
* 获取所有学生列表
* */
exports.find = () => {
  var promise = new Promise((resolve,reject) => {
    fs.readFile(dbPath,'utf8',(err,data) => {
      if (err) {
        return reject(err)
      }
      resolve(JSON.parse(data).students)
    })
  })
  return promise
}

/*
* 获取某个学生
* */
exports.findById = (id) => {
  var promise = new Promise((resolve, reject) => {
    fs.readFile(dbPath,'utf8',(err,data) => {
      if (err) {
        return reject(err)
      }
      var students = JSON.parse(data).students
      var ret = students.find((item) => {
        return item.id === parseInt(id)
      })
      resolve(ret,ret.gender)
    })
  })
  return promise
}



/*
* 添加保存学生
* */
exports.save = (student) => {
  var promise = new Promise((resolve, reject) => {
      fs.readFile(dbPath,'utf8',(err,data) => {
        if (err) {
          return reject(err)
        }
        var students = JSON.parse(data).students
        student.id = students[students.length - 1].id + 1
        students.push(student)
        var fileData = JSON.stringify({
          students:students})
        fs.writeFile(dbPath,fileData,(err) => {
          if (err) {
            return reject(err)
          }
          resolve(null)
        })
      })
  })
  return promise
}

/*
* 更新学生
* */
exports.updateById = (student) => {
  var promise = new Promise((resolve, reject) => {
    fs.readFile(dbPath,'utf8',(err,data) => {
      if (err) {
        return reject(err)
      }
      var students = JSON.parse(data).students
      student.id = parseInt(student.id)
      var stu = students.find((item) => {
        return item.id === student.id
      })
      /*
      * 遍历对象中的属性对值进行覆盖
      * 对象里的成员都是键值对
      * */
      for (let key in student) {
        stu[key] = student[key]
      }
      var fileData = JSON.stringify({
        students:students})
      fs.writeFile(dbPath,fileData,(err) => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  })
  return promise
}

/*
* 删除学生
* */
exports.deleteById = (id) => {
  var promise = new Promise((resolve, reject) => {
    fs.readFile(dbPath,'utf8',(err,data) => {
      if (err) {
        return reject(err)
      }
      var students = JSON.parse(data).students
      //findIndex 方法根据条件查找元素的下标
      var deleteId = students.findIndex((item) => {
        return item.id === parseInt(id)
      })
      //根据下标从数组中删除学生
      students.splice(deleteId,1)
      var fileData = JSON.stringify({
        students:students})
      fs.writeFile(dbPath,fileData,(err) => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  })
  return promise
}



