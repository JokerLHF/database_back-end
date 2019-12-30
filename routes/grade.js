var express = require('express');
var router = express.Router();
const { SuccessModal, ErrorModal } = require('../model/index');
const { getGradeDetail, updateGrade } = require('../controller/grade');
const judgeNull = require('../middleware/judgeNull');
const paginationRecord = require('../utils/pagination');




// 根据关键字(年级名或者所属系名)获取具体的年级信息
router.post('/getDetailGrade', function (req, res, next) {
  const { keywords, page = 1, size = 10 } = req.body;
  let gradeResult = getGradeDetail(keywords);
  gradeResult.then(result => {
    if (result) {
      let data = paginationRecord(result, page, size);
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

// //删除年级的信息
// router.post('/deleteGrade', judgeNull('gradeId'), function (req, res, next) {
//   const { gradeId } = req.body;
//   let data = deleteGrade(gradeId);
//   data.then(result => {
//     if (result) {
//       return res.json(new SuccessModal('删除成功'));
//     }
//     return res.json(new ErrorModal('删除失败'));
//   })
// })
module.exports = router;
