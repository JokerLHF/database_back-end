const { exec, escape } = require('../db/mysql');




// 根据搜索条件搜索班级
const getClazzDetail = () => {
  const sql = ``
  return exec(sql).then( => { })
}

// 增加班级
const addClazz = () => {
  const sql = ``
  return exec(sql).then( => { })
}

// 根据id 删除某一个班级
const deleteClazz = () => {
  const sql = ``
  return exec(sql).then( => { })
}

// 修改班级名称
const updateClazz = () => {
  const sql = ``
  return exec(sql).then( => { })
}


module.exports = {
  getAllClazz,
  getClazzDetail,
  addClazz,
  deleteClazz,
  updateClazz
}