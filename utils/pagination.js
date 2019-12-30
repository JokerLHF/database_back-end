/**
 *  处理分页的逻辑, 从数据库获取全部数据在业务逻辑上进行处理
 * @param {从数据库获取的全部数据} list 
 * @param {用户传过来获取第几页， 默认获取第一页} page 
 * @param {用户传过来每一页有多少条数据，默认是10条} size 
 */
const paginationRecord = (list, page = 1, size = 10) => {
  let records = [], len = list.length;
  let pageTotal = Math.ceil(len / size);  // 现在数据库数据可以分为多少页
  if (pageTotal >= page) { // 证明获取不超过 比如现在数据库只有1页前端获取第二页的数据就超过了
    let start = (page - 1) * size; // 开始的条数
    let tempEnd = len - start;
    let end = tempEnd < size ? tempEnd : start + size;
    records = list.splice(start, end); // slice方法包含开始， 不包含结束
  }
  return {
    total: len,
    records,
    current: page,
  }
}

module.exports = paginationRecord;