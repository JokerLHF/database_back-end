const { exec, escape } = require('../db/mysql');




// 根据搜索条件搜索班级
const getTeacherDetail = ({ teacherId, teacherName, departmentName }) => {
  let sql = `
      SELECT tc.*, de.department_name, de.department_introduction
      FROM teacher tc
      JOIN department de ON de.id = tc.department_id`;
  if (teacherId) {
    sql += ` and tc.id = '${teacherId}'`;
  }
  if (teacherName) {
    sql += ` and tc.teacher_name like '%${teacherName}%'`;
  }
  if (departmentName) {
    sql += ` and de.department_name like '%${departmentName}%'`;
  }

  return exec(sql)
}



// 增加教师
const addTeacher = ({ teacherName, sex, bornDay, jobTitle, departmentId }) => {
  const sql = `insert into teacher values(null,'${teacherName}','${sex}', '${bornDay}', '${jobTitle}', '${departmentId}')`;
  return exec(sql).then(result => {
    return {
      id: result.insertId
    }
  })
}



// 根据id 删除某一个教师
const deleteTeacher = (studentId) => {
  let sql = `delete from teacher where id='${studentId}'`
  return exec(sql).then(result => {
    if (result.affectedRows > 0) {
      return true;
    }
    return false;
  })
}




// 修改教师信息
const updateTeacher = ({ teacherId, teacherName, sex, bornDay, jobTitle, departmentId }) => {
  const sql = `update teacher set teacher_name='${teacherName}', sex='${sex}', born_day='${bornDay}', job_title='${jobTitle}', department_id='${departmentId}' where id='${teacherId}'`;
  return exec(sql).then(result => {
    if (result.affectedRows > 0) {
      return true;
    }
    return false;
  })
}



module.exports = {
  getTeacherDetail,
  addTeacher,
  deleteTeacher,
  updateTeacher,
}