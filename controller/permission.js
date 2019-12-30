const { exec, escape } = require('../db/mysql');


// 把从数据库获取过来的权限整理为一颗树
const dealTree = (list) => {
  return list;
}

// 获取用户的所有权限
const getPermission = (userId) => {
  const sql = `
    SELECT fm.id AS menu_id, fm.first_menu_name, page_pemission.page_id, page_pemission.second_menu_name, page_pemission.item_id, page_pemission.operate_name
    FROM user_first_permission uf
    JOIN first_menu fm ON uf.first_menu_id = fm.id
    RIGHT JOIN (
      SELECT  sm.id AS page_id, sm.parent_id, sm.second_menu_name, item_permission.id AS item_id, item_permission.operate_name
      FROM user_second_permission us
      JOIN second_menu sm ON us.second_menu_id = sm.id
      RIGHT JOIN (
        SELECT smi.*
        FROM user_second_item_permission usi
        JOIN second_menu_item smi ON usi.second_menu_item_id = smi.id
        WHERE usi.user_id = '${userId}'
      ) item_permission ON item_permission.parent_id = sm.id
      WHERE us.user_id = '${userId}'
    ) page_pemission ON page_pemission.parent_id = fm.id
    WHERE uf.user_id = '${userId}';
  `
  return exec(sql).then(permission => {
    if (!permission.length) {
      permission = dealTree(permission);
    }
    return permission;
  })
}




module.exports = {
  getPermission,
}