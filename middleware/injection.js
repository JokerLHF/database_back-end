const { escape } = require('../db/mysql');
const xss = require('xss');
const rejectInjection = () => {
  return (req, res, next) => {  // obj表示判断的数据对象  rest就是判空的属性名
    const { method, body, query } = req;
    let obj = method.toUpperCase() === 'POST' ? body : query;
    for (let key in obj) {
      obj[key] = escape(xss(obj[key])); // 统一做sql注入和xss攻击
    }
    next();
  }
}
module.exports = rejectInjection;