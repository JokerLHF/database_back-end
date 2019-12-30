const { exec, escape } = require('../db/mysql');

const login = (userName, password) => {

  const sql = `select * from users where user_name='${userName}' and pass_word='${password}'`
  return exec(sql).then(rows => {
    return rows[0];
  });
}

module.exports = {
  login,
}