var express = require('express');
var router = express.Router();
const { SuccessModal, ErrorModal } = require('../model/index');
const judgeNull = require('../middleware/judgeNull');
const { updateStudentGrade, getTeacherCourseDetail, setTeacherCourse, deleteByCourseId } = require('../controller/teacher_course');
const paginationRecord = require('../utils/pagination');



// 教师为学生填写成绩
router.post('/updateStudentGrade', function (req, res, next) {
  let data = updateStudentGrade(req.body);
  data.then(result => {
    if (result) {
      return res.json(new SuccessModal('设置成功'));
    }
    return res.json(new ErrorModal('设置失败'));
  })
})

// 教师搜索
router.post('/getStudentGradeDetail', function (req, res, next) {

  const { current = 1, size = 10 } = req.body;
  let studentCourseResult = getTeacherCourseDetail(req.body);
  studentCourseResult.then(result => {
    if (result) {
      result.forEach((item, index) => {
        item.id = index;
      })
      let data = paginationRecord(result, current, size);
      return res.json(new SuccessModal(data));
    }
    return res.json(new ErrorModal('查询失败'));
  });
})


router.post('/setTeacherToCourse', function (req, res, next) {
  const { teacherIdList, courseId, type } = req.body;
  if (type === 1) {
    let deleteRes = deleteByCourseId(courseId);
    deleteRes.then(deleteData => {
      if (deleteData) {
        return deleteData;
      }
      return res.json(new ErrorModal('派课失败'));
    }).then(deleteData => {
      let setResult = setTeacherCourse(teacherIdList, courseId);
      setResult.then(data => {
        if (data) {
          return res.json(new SuccessModal('派课成功'));
        }
        return res.json(new ErrorModal('派课失败'));
      })
    })
  } else {
    let setResult = setTeacherCourse(teacherIdList, courseId);
    setResult.then(data => {
      if (data) {
        return res.json(new SuccessModal('派课成功'));
      }
      return res.json(new ErrorModal('派课失败'));
    })
  }

})


module.exports = router;
