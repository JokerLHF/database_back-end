var express = require('express');
var router = express.Router();
const { SuccessModal, ErrorModal } = require('../model/index');
const paginationRecord = require('../utils/pagination');
const { getHistoryDetail } = require('../controller/library');

// 根据分页条件搜索班级
router.post('/getHistoryDetail', function (req, res, next) {
  const { keywords, current = 1, size = 10 } = req.body;
  let classResult = getHistoryDetail(keywords);
  classResult.then(result => {
    if (result) {
      let data = paginationRecord(result, current, size);
      return res.json(new SuccessModal(data));
    }
    return res.json(new ErrorModal('查询失败'));
  })
});

module.exports = router;
