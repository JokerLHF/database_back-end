var express = require('express');
var router = express.Router();
const { SuccessModal, ErrorModal } = require('../model/index');
const judgeNull = require('../middleware/judgeNull');
const paginationRecord = require('../utils/pagination');
const { getTeacherDetail, addTeacher, deleteTeacher, updateTeacher, setTeacherCourse } = require('../controller/teacher');
const { addUser, deleteUser } = require('../controller/users');
const { makeDate } = require('../utils/moment');
// 根据分页条件搜索教师
router.post('/getTeacherDetail', function (req, res, next) {
  const { current = 1, size = 10 } = req.body;
  let teacherResult = getTeacherDetail(req.body);
  teacherResult.then(result => {
    if (result) {
      result.forEach(item => {
        item.born_day = makeDate(item.born_day)
      })
      let data = paginationRecord(result, current, size);
      return res.json(new SuccessModal(data));
    }
    return res.json(new ErrorModal('查询失败'));
  })
});



// 增加教师 新增教师之后根据学号创建一个初始的账号密码
router.post('/addTeacher', judgeNull("teacherName", "sex", "bornDay", "jobTitle", "departmentId"), function (req, res, next) {
  const { teacherName, sex, bornDay, jobTitle, departmentId } = req.body;
  let addTeacherResult = addTeacher(req.body);
  addTeacherResult.then(data => {
    if (data.id) {
      let addUserResult = addUser(data.id);
      addUserResult.then(result => {
        if (result.id) {
          return res.json(new SuccessModal(data));
        }
        return res.json(new ErrorModal('增加用户账号失败'));
      })
    } else {
      return res.json(new ErrorModal('新增失败'));
    }
  })
});




// 更新教师
router.post('/updateTeacher', judgeNull("teacherName", "jobTitle", "departmentId"), function (req, res, next) {
  let result = updateTeacher(req.body);
  result.then(responseData => {
    if (responseData) {
      return res.json(new SuccessModal('修改成功'));
    }
    return res.json(new ErrorModal('新建失败'));
  })
});

// 删除教师
router.post('/deleteTeacher', judgeNull("teacherId"), function (req, res, next) {
  const { teacherId } = req.body;
  let data = deleteTeacher(teacherId);
  data.then(result => {
    if (result) {
      let deleteUserResult = deleteUser(teacherId);
      deleteUserResult.then(deleteRes => {
        if (deleteRes) {
          return res.json(new SuccessModal('删除成功'));
        }
        return res.json(new ErrorModal('删除账号失败'))
      })
    } else {
      return res.json(new ErrorModal('删除失败'));
    }
  })
});


module.exports = router;
