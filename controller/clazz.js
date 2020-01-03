const { exec, escape } = require('../db/mysql');




// 根据搜索条件搜索班级
const getClazzDetail = (keywords) => {
  let sql = `SELECT gr.id AS gradeId, gr.grade_name,  cl.id, cl.class_name, de.id AS departmentId, de.department_name, de.department_introduction
            FROM class cl
            JOIN grade gr ON gr.id = cl.grade_id
            JOIN department de ON de.id = cl.department_id where 1 = 1`;
  if (keywords) {
    sql += ` and class_name like '%${keywords}%' or gr.grade_name like '%${keywords}%' or de.department_name like '%${keywords}%'`;
  }
  return exec(sql)
}


// 获取在同一个年级中是否有相同的班级
const getSameNameInGrade = (className, gradeId, departmentId) => {
  let sql = `select * from class where class.grade_id = '${gradeId}' and class_name = '${className}' and department_id = '${departmentId}'`;
  return exec(sql).then(rows => {
    return rows[0];
  })
}
// 增加班级
const addClazz = (className, gradeId, departmentId) => {
  const sql = `insert into class values(null,'${className}','${gradeId}', '${departmentId}')`;
  return exec(sql).then(result => {
    return {
      id: result.insertId
    }
  })
}

// 根据id 删除某一个班级
const deleteClazz = (classId) => {
  let sql = `delete from class where id='${classId}'`
  return exec(sql).then(result => {
    if (result.affectedRows > 0) {
      return true;
    }
    return false;
  })
}
// 修改班级名称
const updateClazz = ({className, classId, gradeId, departmentId}) => {
  const sql = `update class set class_name='${className}', grade_id='${gradeId}', department_id='${departmentId}' where id='${classId}'`;
  return exec(sql).then(result => {
    if (result.affectedRows > 0) {
      return true;
    }
    return false;
  })
}

const getCasClazz = () => {
  const sql =`SELECT cl.id, cl.class_name, gr.id AS grade_id, gr.grade_name, de.id AS department_id, de.department_name 
  FROM class cl
  JOIN grade gr ON cl.grade_id = gr.id
  JOIN department	de ON cl.department_id = de.id`
  return exec(sql)
}

module.exports = {
  getClazzDetail,
  addClazz,
  deleteClazz,
  updateClazz,
  getSameNameInGrade,
  getCasClazz
}