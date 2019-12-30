const { exec, escape } = require('../db/mysql');




// 根据搜索条件搜索系
const getDepartmentDetail = (departmentName) => {
  let sql = `select * from department where 1 = 1`;
  if (departmentName) {
    sql += ` and department_name like '%${departmentName}%'`;
  }
  return exec(sql)
}

// 增加系
const addDepartment = (departmentName, departmentIntrouction) => {
  const sql = `insert into department values(null,'${departmentName}','${departmentIntrouction}')`
  return exec(sql).then(result => {
    return {
      id: result.insertId
    }
  })
}

// 根据id 删除某一个系
const deleteDepartment = (id) => {
  let sql = `delete from department where id='${id}'`
  return exec(sql).then(result => {
    if (result.affectedRows > 0) {
      return true;
    }
    return false;
  })
}

// 修改系  可通过修改名称 和 简介
const updateDepartment = (departmentId, departmentName, departmentIntroduction) => {
  const sql = `update department set department_name='${departmentName}', department_introduction='${departmentIntroduction}' where id='${departmentId}'`

  return exec(sql).then(result => {
    if (result.affectedRows > 0) {
      return true;
    }
    return false;
  })
}


module.exports = {
  getDepartmentDetail,
  addDepartment,
  deleteDepartment,
  updateDepartment
}