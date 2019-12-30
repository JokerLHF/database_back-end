const { exec, escape } = require('../db/mysql');


// 根据搜索条件搜索年级
const getGradeDetail = (keywords) => {
  let sql = `SELECT * from grade where 1 = 1`;
  if (keywords) {
    sql += ` and  grade_name like '%${keywords}%'`;
  }
  return exec(sql)
}


// // 根据id 删除某一个年级
// const deleteGrade = (id) => {
//   let sql = `delete from grade where id='${id}'`
//   return exec(sql).then(result => {
//     if (result.affectedRows > 0) {
//       return true;
//     }
//     return false;
//   })
// }

// 修改年级  可通过修改名称
const updateGrade = (gradeId, gradeName) => {
  const sql = `update grade set grade_name='${gradeName}' where id='${gradeId}'`

  return exec(sql).then(result => {
    if (result.affectedRows > 0) {
      return true;
    }
    return false;
  })
}


module.exports = {

  getGradeDetail,
  // deleteGrade,
  updateGrade
}