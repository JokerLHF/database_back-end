var express = require('express');
var router = express.Router();
const { SuccessModal, ErrorModal } = require('../model/index');
const judgeNull = require('../middleware/judgeNull');
const paginationRecord = require('../utils/pagination');
const { getStudentDetail, addStudent, deleteStudent, updateStudent, setStudentCourse } = require('../controller/student');
const { addUser, deleteUser } = require('../controller/users');
const { addLibrary } = require('../controller/library');
const { makeDate } = require('../utils/moment');

// 根据分页条件搜索学生
router.post('/getStudentDetail', function (req, res, next) {
  const { current = 1, size = 10 } = req.body;
  let studentResult = getStudentDetail(req.body);
  studentResult.then(result => {
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



// 增加学生 新增学生之后根据学号创建一个初始的账号密码
router.post('/addStudent', judgeNull("studentName", "sex", "bornDay", "admissionGrade", "classId", "gradeId", "departmentId"), function (req, res, next) {
  const { studentName, sex, bornDay, admissionGrade, classId, gradeId, departmentId } = req.body;
  let addStudentResult = addStudent(studentName, sex, bornDay, admissionGrade, classId, gradeId, departmentId);
  addStudentResult.then(data => {
    if (data.id) {
      return data;
    }
    return res.json(new ErrorModal('新增失败'));
  }).then(data => {
    let addUserResult = addUser(data.id);
    addUserResult.then(result => {
      if (result.id) {
        return res.json(new SuccessModal(data));
      }
      return res.json(new ErrorModal('增加用户账号失败'));
    })
  })
});




// 更新学生
router.post('/updateStudent', judgeNull("studentId", "studentName", "sex", "bornDay", "admissionGrade", "classId", "gradeId", "departmentId"), function (req, res, next) {
  let updateStudentResult = updateStudent(req.body);
  updateStudentResult.then(data => {
    if (data) {
      return res.json(new SuccessModal('修改成功'));
    }
    return res.json(new ErrorModal('修改失败'));
  })
});



// 学生退学
router.post('/dropOutStu', function (req, res, next) {
  const { studentId } = req.body;

  let studentResult = getStudentDetail(studentId);
  studentResult.then(result => { // 查询这个学生的具体信息
    if (result) {
      return result[0];
    }
  })

    .then(student => { // 把学生插入到历史记录表中
      student.leave_type = 1;
      student.born_day = makeDate(student.born_day)
      let libraryResult = addLibrary(student);
      libraryResult.then(insertRes => {
        if (insertRes.id) {
          return true;
        }
      })
    })

    .then(isTrue => { // 在student表中删除这个学生
      let data = deleteStudent(studentId);
      data.then(result => {
        if (result) {
          return true;
        }
      })
    })

    .then(isTrue => { // 在user表中删除这个学生
      let deleteUserResult = deleteUser(studentId);
      deleteUserResult.then(deleteRes => {
        if (deleteRes) {
          return res.json(new SuccessModal('删除账号成功'));;
        }
      })
    })

    .catch(e => {
      return res.json(new ErrorModal(e))
    })
})


// 学生选课
router.post('/setStudentCourse', function (req, res, next) {
  const { studentId, courseId } = req.body;
  let setResult = setStudentCourse(studentId, courseId);
  setResult.then(data => {
    if (data) {
      return res.json(new SuccessModal("选课成功"));
    }
    return res.json(new ErrorModal('选课失败'));
  })
})


module.exports = router;
