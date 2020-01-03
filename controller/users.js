const { exec, escape } = require('../db/mysql');

const login = (userName, password) => {

  const sql = `select * from users where user_name='${userName}' and pass_word='${password}'`
  return exec(sql).then(rows => {
    return rows[0];
  });
}

// 在用户表中新增一个账号
const addUser = (userId) => {
  const sql = `insert into users values(null,'${userId}','123456')`;
  return exec(sql).then(result => {
    return {
      id: result.insertId
    }
  })
}

// 删除学生的时候要删除对应的账号
const deleteUser = (userId) => {
  let sql = `delete from users where user_name='${userId}'`
  return exec(sql).then(result => {
    if (result.affectedRows > 0) {
      return true;
    }
    return false;
  })
}

module.exports = {
  login,
  addUser,
  deleteUser,
}