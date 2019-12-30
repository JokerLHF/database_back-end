var express = require('express');
var router = express.Router();
const { SuccessModal, ErrorModal } = require('../model/index');
const judgeNull = require('../middleware/judgeNull');
const paginationRecord = require('../utils/pagination');


router.post('/getClass', function (req, res, next) {

});

router.post('/addClass', judgeNull("className", "gradeId", "departmentId"), function (req, res, next) {

})

module.exports = router;
