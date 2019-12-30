var express = require('express');
var router = express.Router();
const { SuccessModal, ErrorModal } = require('../model/index');
const { getDepartmentDetail, addDepartment, deleteDepartment, updateDepartment } = require('../controller/department');
const judgeNull = require('../middleware/judgeNull');
const paginationRecord = require('../utils/pagination');



// 根据系名获取具体的系信息
router.post('/getDetailDepartment', function (req, res, next) {
  const { departmentName, page = 1, size = 10 } = req.body;
  let department = getDepartmentDetail(departmentName);
  department.then(result => {
    if (result) {
      let data = paginationRecord(result, page, size);
      return res.json(new SuccessModal(data));
    }
    return res.json(new ErrorModal('查询失败'));
  })
})



// 增加系的信息
router.post('/addDepartment', judgeNull('departmentName', 'departmentIntrouction'), function (req, res, next) {
  const { departmentName, departmentIntrouction } = req.body;
  let result = addDepartment(departmentName, departmentIntrouction);
  result.then(data => {
    if (data.id) {
      return res.json(new SuccessModal(data))
    }
    return res.json(new ErrorModal('新建失败'));
  })
})


// 修改系的信息
router.post('/updateDepartment', judgeNull('departmentId', 'departmentName'), function (req, res, next) {
  const { departmentId, departmentName, departmentIntroduction } = req.body;
  let data = updateDepartment(departmentId, departmentName, departmentIntroduction);
  data.then(result => {
    if (result) {
      return res.json(new SuccessModal('修改成功'));
    }
    return res.json(new ErrorModal('修改失败'));
  })
})

//删除系的信息
router.post('/deleteDepartment', judgeNull('departmentId'), function (req, res, next) {
  const { departmentId } = req.body;
  let data = deleteDepartment(departmentId);
  data.then(result => {
    if (result) {
      return res.json(new SuccessModal('删除成功'));
    }
    return res.json(new ErrorModal('删除失败'));
  })
})
module.exports = router;
