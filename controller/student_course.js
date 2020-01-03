const { exec, escape } = require('../db/mysql');







// 根据id 删除某一个选课
const deleteStudentCourse = (studentId, courseId) => {
  let sql = `delete from student_course_grade where student_id='${studentId}' and course_id = '${courseId}'`
  return exec(sql).then(result => {
    if (result.affectedRows > 0) {
      return true;
    }
    return false;
  })
}






// 学生选课
const setStudentCourse = ({ studentId, teacherId, courseId }) => {
  const sql = `insert into student_course_grade values('${studentId}','${teacherId}', '${courseId}', null, null, null)`;
  return exec(sql).then(result => {
    if (result.affectedRows > 0) {
      return true;
    }
    return false;
  })
}

module.exports = {
  deleteStudentCourse,
  setStudentCourse
}