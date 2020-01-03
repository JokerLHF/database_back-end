const { exec, escape } = require('../db/mysql');
const addLibrary = ({ id, student_name, sex, born_day, admission_grade, class_name, grade_name, department_name, leave_type }) => {
  const sql = `insert into history_library values(null,'${id}','${student_name}','${sex}','${born_day}','${admission_grade}','${department_name}','${grade_name}','${class_name}','${leave_type}')`
  return exec(sql).then(result => {
    return {
      id: result.insertId
    }
  })
}

const addLibraryList = (list) => {
  let sql = `insert into history_library values`
  list.forEach((item, index) => {
    const { id, student_name, sex, born_day, admission_grade, class_name, grade_name, department_name, leave_type } = item;
    let insertSql = `('${id}','${student_name}','${sex}','${born_day}','${admission_grade}','${department_name}','${grade_name}','${class_name}','${leave_type}')`
    if (index === list.length - 1) {
      sql += `${insertSql}`
    } else {
      sql += `${insertSql},`
    }
  })
  return exec(sql).then(result => {
    if (result.affectedRows > 0) {
      return true;
    }
    return false;
  })
}




// 根据搜索条件搜索年级
const getHistoryDetail = (keywords) => {
  let sql = `SELECT * from history_library where 1 = 1`;
  if (keywords) {
    sql += ` and student_name like '%${keywords}%' or department_name like '%${keywords}%' or class_name like '%${keywords}%'`;
  }
  console.log(sql);
  return exec(sql)
}

module.exports = {
  addLibrary,
  addLibraryList,
  getHistoryDetail
}