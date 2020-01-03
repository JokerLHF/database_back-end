const { exec, escape } = require('../db/mysql');




// 根据搜索条件搜索自己的所教的
const getTeacherCourseDetail = ({ teacherId, courseName, studentName }) => {
  let sql = `
    SELECT scg.*, tc.teacher_name, co.course_name, st.student_name
    FROM student_course_grade scg 
    JOIN teacher tc ON scg.teacher_id = tc.id
    JOIN course co ON scg.course_id = co.id
    JOIN student st ON scg.student_id = st.id where 1 = 1`;
  if (studentName) {
    sql += ` and st.student_name like '%${studentName}%'`;
  }
  if (courseName) {
    sql += ` and co.course_name like '%${courseName}%'`;
  }
  if (teacherId) {
    sql += ` and tc.id = '${teacherId}'`
  }
  return exec(sql)
}


// 为自己的课程填写成绩
const updateStudentGrade = ({ teacherId, studentId, courseId, examGrade, usualGrade, allGrade }) => {
  const sql = `update student_course_grade set exam_grade='${examGrade}', usual_grade='${usualGrade}', all_grade='${allGrade}' where student_id='${studentId}' and course_id='${courseId}' and teacher_id='${teacherId}'`
  return exec(sql).then(result => {
    if (result.affectedRows > 0) {
      return true;
    }
    return false;
  })
}

let returnVluesSql = (teacherIdList, courseId) => {
  let sql = `insert into teacher_course values`;
  teacherIdList.forEach((teacherId, index) => {
    if (index === teacherIdList.length - 1) {
      sql += `(null,'${teacherId}','${courseId}')`
    } else {
      sql += `(null,'${teacherId}','${courseId}'),`
    }
  })

  return sql;
}
// 为教师派发选课
const setTeacherCourse = (teacherIdList, courseId) => {
  let sql = returnVluesSql(teacherIdList, courseId);
  return exec(sql).then(result => {
    if (result.affectedRows > 0) {
      return true;
    }
    return false;
  })
}


// 根据课程id删除教师的任课
const deleteByCourseId = (courseId) => {
  const sql = `delete from teacher_course where course_id='${courseId}'`;
  return exec(sql).then(result => {
    if (result.affectedRows > 0) {
      return true;
    }
    return false;
  })
}

module.exports = {
  updateStudentGrade,
  getTeacherCourseDetail,
  setTeacherCourse,
  deleteByCourseId
}