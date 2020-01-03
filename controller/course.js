const { exec, escape } = require('../db/mysql');




// 根据搜索条件搜索班级
const getCourseDetail = ({ courseName, teacherName }) => {
  let sql = `
  SELECT t.id AS teacher_id, t.teacher_name, co.*
  FROM course co
  LEFT JOIN teacher_course tc ON co.id = tc.course_id
  LEFT JOIN teacher t ON tc.teacher_id = t.id where 1 = 1`
  if (courseName) {
    sql += ` and co.course_name like '%${courseName}%'`;
  }
  if (teacherName) {
    sql += ` and t.teacher_name like '%${teacherName}%'`;
  }
  return exec(sql)
}

// 查询有任课老师的课程并且是改学生没有选过的课程
const getHasTeacherCourse = ({ studentId, courseName, teacherName }) => {
  let sql = `
  SELECT t.id AS teacher_id, t.teacher_name, co.id AS course_id, co.course_name, co.course_credit, co.course_hours, co.course_start_time, co.course_location,  co.exam_time
  FROM course co
  JOIN teacher_course tc ON co.id = tc.course_id
  JOIN teacher t ON tc.teacher_id = t.id
    WHERE tc.course_id NOT IN (
    SELECT scg.course_id
    FROM student_course_grade scg
    WHERE scg.student_id = '${studentId}'
  )`
  if (courseName) {
    sql += ` and co.course_name like '%${courseName}%'`;
  }
  if (teacherName) {
    sql += ` and t.teacher_name like '%${teacherName}%'`;
  }
  return exec(sql)
}

// 增加课程
const addCourse = ({ courseName, examTime, courseCredit, courseHours, CourseStartTime, courseLocation }) => {
  const sql = `insert into course values(null,'${courseName}','${examTime}', '${courseCredit}', '${courseHours}', '${CourseStartTime}','${courseLocation}')`;
  return exec(sql).then(result => {
    return {
      id: result.insertId
    }
  })
}



// 根据id 删除某一个课程
const deleteCourse = (courseId) => {
  let sql = `delete from course where id='${courseId}'`
  return exec(sql).then(result => {
    if (result.affectedRows > 0) {
      return true;
    }
    return false;
  })
}




// 修改课程信息
const updateCourse = ({ courseId, courseName, examTime, courseCredit, courseHours, CourseStartTime, courseLocation }) => {
  const sql = `update course set course_name='${courseName}', exam_time='${examTime}', course_credit='${courseCredit}', course_hours='${courseHours}', Course_start_time='${CourseStartTime}' where id='${courseId}'`;
  return exec(sql).then(result => {
    if (result.affectedRows > 0) {
      return true;
    }
    return false;
  })
}



module.exports = {
  getCourseDetail,
  addCourse,
  deleteCourse,
  updateCourse,
  getHasTeacherCourse
}