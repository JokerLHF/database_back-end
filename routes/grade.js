var express = require('express');
var router = express.Router();
const { SuccessModal, ErrorModal } = require('../model/index');
const { getGradeDetail, updateGrade, deleteGrade, addGrade } = require('../controller/grade');
const judgeNull = require('../middleware/judgeNull');
const paginationRecord = require('../utils/pagination');
const { getStudentDetail } = require('../controller/student');
const { addLibraryList } = require('../controller/library');
const { makeDate } = require('../utils/moment');



// 根据关键字(年级名或者所属系名)获取具体的年级信息
router.post('/getDetailGrade', function (req, res, next) {
  const { keywords, current = 1, size = 10 } = req.body;
  let gradeResult = getGradeDetail(keywords);
  gradeResult.then(result => {
    if (result) {
      let data = paginationRecord(result, current, size);
      return res.json(new SuccessModal(data));
    }
    return res.json(new ErrorModal('查询失败'));
  })
})




// 修改年级的信息
router.post('/updateGrade', judgeNull('gradeId', 'gradeName'), function (req, res, next) {
  const { gradeId, gradeName } = req.body;
  let data = updateGrade(gradeId, gradeName);
  data.then(result => {
    if (result) {
      return res.json(new SuccessModal('修改成功'));
    }
    return res.json(new ErrorModal('修改失败'));
  })
})

// // 升级年级  毕业处理
// // 1. 找到对应年级的班级的学生
// // 2. 把学生插入历史库
// // 3. 删除这个年级
// // 4. 把1年级改为2年级 2年级改为3年级， 
// // 5. 重新加入1年级
// router.post('/uploadGrade', function (req, res, next) {
//   let gradeResult = getGradeDetail();
//   gradeResult.then(gradeList => { // 获取所有的年级数据
//     return gradeList;
//   })

//     .then(gradeList => { // 获取毕业年级的学生
//       let len = gradeList.length;
//       const gradeId = gradeList[len - 1].id;
//       let studentResult = getStudentDetail({ gradeId });

//       return studentResult.then(studentList => {
//         if (studentList) {
//           return { studentList, gradeList };
//         }
//       })
//     })


//     .then(({ studentList, gradeList }) => { // 插入历史表
//       studentList.forEach(item => {
//         item.born_day = makeDate(item.born_day);
//         item.leave_type = 0;
//       })
//       let insertStudentList = addLibraryList(studentList);
//       return insertStudentList.then(result => {
//         if (result) {
//           return gradeList
//         }
//       })
//     })

//     .then(gradeList => { // 把这个年级删除
//       const gradeId = gradeList[len - 1].id;
//       let deleteGradeResult = deleteGrade(gradeId);
//       return deleteGradeResult.then(result => {
//         if (result) {
//           return gradeList
//         }
//       })
//     })

//     .then(gradeList => { // 修改年级的名称

//     })

//     .then(gradeList => { // 增加一个新的年级
//       let addGradeResult = addGrade('1年级', 1);
//       return addGradeResult.then(result => {
//         if (result.id) {
//           return res.json(new SuccessModal('操作成功'));
//         }
//       })
//     })
// })

module.exports = router;
