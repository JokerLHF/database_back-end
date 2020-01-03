var express = require('express');
var router = express.Router();
const { SuccessModal, ErrorModal } = require('../model/index');
const judgeNull = require('../middleware/judgeNull');
const { setStudentCourse, deleteStudentCourse } = require('../controller/student_course');


// 学生选课
router.post('/setStudentCourse', function (req, res, next) {
  let setResult = setStudentCourse(req.body);
  setResult.then(data => {
    if (data) {
      return res.json(new SuccessModal("选课成功"));
    }
    return res.json(new ErrorModal('选课失败'));
  })
})

// 学生删除选课
router.post('/deleteStudentCourse', function (req, res, next) {
  const { courseId, studentId } = req.body;
  let data = deleteStudentCourse(studentId, courseId);
  data.then(result => {
    if (result) {
      return res.json(new SuccessModal('删除成功'));
    }
    return res.json(new ErrorModal('删除失败'));
  })
})

module.exports = router;
