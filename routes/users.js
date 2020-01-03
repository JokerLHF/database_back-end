var express = require('express');
var router = express.Router();
const { SuccessModal, ErrorModal } = require('../model/index');
const { login } = require('../controller/users');
const { getPermission } = require('../controller/permission');
const judgeNull = require('../middleware/judgeNull');


router.post('/login', judgeNull("userName", "password"), function (req, res, next) {
  const { userName, password } = req.body;
  let loginResult = login(userName, password);
  loginResult.then(data => {
    if (data) {
      return res.json(new SuccessModal(data));
    }
    return res.json(new ErrorModal('账号或者密码错误'))
  })
  // .then(userId => {
  //   let permission = getPermission(userId);
  //   permission.then(permission => {
  //     if (permission.length) {
  //       res.json(new SuccessModal(permission));
  //       return;
  //     }
  //     return res.json(new ErrorModal('权限获取失败'))
  //   })
  // })
})

module.exports = router;
