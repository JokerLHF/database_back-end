
/**
 * 数据库以及redis的基本配置
 */


const env = process.env.NODE_ENV;
let MYSQL_CONF;
let REDIS_CONF;
if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'Aa123@love',
    port: 3306,
    database: 'management_system',
  }
  REDIS_CONF = {
    host: '127.0.0.1',
    port: 6379
  }
}
if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'Aa123@love',
    port: 3306,
    database: 'management_system',
  }
  REDIS_CONF = {
    host: '127.0.0.1',
    port: 6379
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
};