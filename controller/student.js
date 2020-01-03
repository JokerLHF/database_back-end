const { exec, escape } = require('../db/mysql');




// 根据搜索条件搜索班级
const getStudentDetail = ({ studentId, studentName, className, gradeName }) => {
  let sql = `
    SELECT st.id, st.student_name, st.sex, st.born_day, st.admission_grade, st.department_id, de.department_name, st.grade_id, gr.grade_name, st.class_id, cl.class_name
    FROM student st
    JOIN grade gr ON st.grade_id = gr.id
    JOIN class cl ON st.class_id = cl.id
    JOIN department de ON st.department_id = de.id where 1 = 1`;
  if (studentId) {
    sql += ` and st.id = '${studentId}'`;
  }
  if (studentName) {
    sql += ` and st.student_name like '%${studentName}%'`;
  }
  if (className) {
    sql += ` and cl.class_name like '%${className}%'`;
  }
  if (gradeName) {
    sql += ` and gr.grade_name like '%${gradeName}%'`;
  }
  return exec(sql)
}



// 增加学生
const addStudent = (studentName, sex, bornDay, admissionGrade, classId, gradeId, departmentId) => {
  const sql = `insert into student values(null,'${studentName}','${sex}', '${bornDay}', '${admissionGrade}', '${departmentId}','${classId}', '${gradeId}')`;
  return exec(sql).then(result => {
    return {
      id: result.insertId
    }
  })
}



// 根据id 删除某一个学生
const deleteStudent = (studentId) => {
  let sql = `delete from student where id='${studentId}'`
  return exec(sql).then(result => {
    if (result.affectedRows > 0) {
      return true;
    }
    return false;
  })
}




// 修改学生信息
const updateStudent = ({ studentId, studentName, sex, bornDay, admissionGrade, classId, gradeId, departmentId }) => {
  const sql = `update student set student_name='${studentName}', sex='${sex}', born_day='${bornDay}', admission_grade='${admissionGrade}', class_id='${classId}', grade_id='${gradeId}', department_id='${departmentId}' where id='${studentId}'`;
  return exec(sql).then(result => {
    if (result.affectedRows > 0) {
      return true;
    }
    return false;
  })
}




module.exports = {
  getStudentDetail,
  addStudent,
  deleteStudent,
  updateStudent
}