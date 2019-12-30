const { ErrorModal } = require('../model/index');

/**
 *  type 表示请求的类型 
 *      get 请求就在res.query判空
 *      post 请求就是res.body判空
 */




let judgeNull = (...keyList) => {
  return (req, res, next) => {  // obj表示判断的数据对象  rest就是判空的属性名
    const { method, body, query } = req;
    let obj = method.toUpperCase() === 'POST' ? body : query;
    for (let key in keyList) {
      let val = keyList[key];
      if (!obj[val]) {
        res.json(new ErrorModal(`${val}不能为空`));
        return;
      }
    }
    next();
  }
}



module.exports = judgeNull;