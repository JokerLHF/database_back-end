var express = require('express');
var router = express.Router();
const { SuccessModal, ErrorModal } = require('../model/index');
const { login } = require('../controller/users');
const { getPermission } = require('../controller/permission');
const judgeNull = require('../middleware/judgeNull');

router.post('/login', judgeNull("userName", "password"), function (req, res, next) {

})

module.exports = router;
