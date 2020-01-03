var express = require('express');
var router = express.Router();
const { SuccessModal, ErrorModal } = require('../model/index');
const judgeNull = require('../middleware/judgeNull');
const paginationRecord = require('../utils/pagination');
const { getCourseDetail, addCourse, deleteCourse, updateCourse, getHasTeacherCourse } = require('../controller/course');
const { addUser, deleteUser } = require('../controller/users');
const { makeDate } = require('../utils/moment');

let sameTeacherToCourse = (result) => {
  let list = [].concat(result);
  let tempList = {}; // 格式为课程id: 课程的信息
  list.forEach(item => {
    let { id, teacher_name, teacher_id } = item;
    let index = id + '';
    let courseIdList = Object.keys(tempList);
    if (courseIdList.indexOf(index) === -1) { // 证明里面没有该课程
      tempList[index] = item;
    } else { // 如果里面有该课程， 就把老师信息连接
      tempList[index].teacher_name = tempList[index].teacher_name + `,  ${teacher_name}`;
      tempList[index].teacher_id = tempList[index].teacher_id + `,  ${teacher_id}`;
    }
  })
  return Object.values(tempList);;
}

// 根据分页条件搜索课程
router.post('/getCourseDetail', function (req, res, next) {
  const { current = 1, size = 10 } = req.body;
  let teacherResult = getCourseDetail(req.body);
  teacherResult.then(result => {
    if (result) {
      result.forEach(item => {
        item.exam_time = makeDate(item.exam_time);
        item.course_start_time = makeDate(item.course_start_time);
      })
      result = sameTeacherToCourse(result);
      let data = paginationRecord(result, current, size);
      return res.json(new SuccessModal(data));
    }
    return res.json(new ErrorModal('查询失败'));
  });
});



// 增加课程
router.post('/addCourse', judgeNull("courseName", "examTime", "courseCredit", "courseHours", "CourseStartTime", "courseLocation"), function (req, res, next) {
  let addCourseResult = addCourse(req.body);
  addCourseResult.then(data => {
    if (data.id) {
      return res.json(new SuccessModal(data));
    }
    return res.json(new ErrorModal('新增失败'));
  })
});




// 更新课程
router.post('/updateCourse', judgeNull("courseName", "examTime", "courseCredit", "courseHours", "CourseStartTime", "courseLocation"), function (req, res, next) {
  let result = updateCourse(req.body);
  result.then(responseData => {
    if (responseData) {
      return res.json(new SuccessModal('修改成功'));
    }
    return res.json(new ErrorModal('新建失败'));
  })
});



// 删除课程
router.post('/deleteCourse', judgeNull("courseId"), function (req, res, next) {
  const { courseId } = req.body;
  let data = deleteCourse(courseId);
  data.then(result => {
    if (result) {
      return res.json(new SuccessModal('删除成功'));
    }
    return res.json(new ErrorModal('删除失败'));
  })
});


// 
router.post('/getHasTeacherCourse', function (req, res, next) {
  const { current = 1, size = 10 } = req.body;
  let teacherResult = getHasTeacherCourse(req.body);
  teacherResult.then(result => {
    if (result) {
      result.forEach((item, index) => {
        item.id = index;
        item.exam_time = makeDate(item.exam_time);
        item.course_start_time = makeDate(item.course_start_time);
      })
      // result = sameTeacherToCourse(result);
      let data = paginationRecord(result, current, size);
      return res.json(new SuccessModal(data));
    }
    return res.json(new ErrorModal('查询失败'));
  });
});
module.exports = router;
