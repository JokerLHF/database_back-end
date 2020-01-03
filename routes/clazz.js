var express = require('express');
var router = express.Router();
const { SuccessModal, ErrorModal } = require('../model/index');
const judgeNull = require('../middleware/judgeNull');
const paginationRecord = require('../utils/pagination');
const { getClazzDetail, addClazz, deleteClazz, updateClazz, getSameNameInGrade, getCasClazz } = require('../controller/clazz');

// 根据分页条件搜索班级
router.post('/getClassDetail', function (req, res, next) {
  const { keywords, current = 1, size = 10 } = req.body;
  let classResult = getClazzDetail(keywords);
  classResult.then(result => {
    if (result) {
      let data = paginationRecord(result, current, size);
      return res.json(new SuccessModal(data));
    }
    return res.json(new ErrorModal('查询失败'));
  })
});

// 增加班级
router.post('/addClass', judgeNull("className", "gradeId", "departmentId"), function (req, res, next) {
  const { className, gradeId, departmentId } = req.body;
  let sameName = getSameNameInGrade(className, gradeId, departmentId);
  sameName.then(data => {
    if (!data) {
      let result = addClazz(className, gradeId, departmentId);
      result.then(responseData => {
        if (responseData.id) {
          return res.json(new SuccessModal(responseData))
        }
        return res.json(new ErrorModal('新建失败'));
      })
    } else {
      return res.json(new ErrorModal('该班级已存在， 请勿重复创建'));
    }
  })
});

// 更新班级
router.post('/updateClass', judgeNull("className", "gradeId", "departmentId"), function (req, res, next) {
  const { classId, className, gradeId, departmentId } = req.body;
  let sameName = getSameNameInGrade(className, gradeId, departmentId);
  sameName.then(data => {
    if (!data) {
      let result = updateClazz(req.body);
      result.then(responseData => {
        if (responseData) {
          return res.json(new SuccessModal('修改成功'));
        }
        return res.json(new ErrorModal('新建失败'));
      })
    } else {
      return res.json(new ErrorModal('该班级名称已存在'));
    }
  })
});

// 删除班级
router.post('/deleteClass', function (req, res, next) {
  const { classId } = req.body;
  let data = deleteClazz(classId);
  data.then(result => {
    if (result) {
      return res.json(new SuccessModal('删除成功'));
    }
    return res.json(new ErrorModal('删除失败'));
  })
});

let deatilWithClazz = (list) => {
  let casList = [].concat(list);
  let tempData = {};
  casList.forEach(item => {

    const { department_id, department_name, grade_id, grade_name, id, class_name } = item;
    let deptId = department_id + '', graId = grade_id + '', classId = id + '';
    let keysList = Object.keys(tempData);

    if (keysList.indexOf(deptId) === -1) { // 证明此时没有这个院系
      let temp = { value: department_id, label: department_name, children: [] }
      let tempGrade = { value: grade_id, label: grade_name, children: [] };
      let tempClazz = { value: id, label: class_name };
      tempGrade.children.push(tempClazz);
      temp.children.push(tempGrade);
      tempData[deptId] = temp;
    } else { // 如果有这个院系
      let gradeList = tempData[deptId].children; // 获取年级列表
      gradeList.forEach((grade, index) => {
        const { value } = grade;
        if (value == grade_id) { // 证明是年级相同
          let clazzObj = { value: id, label: class_name }
          grade.children.push(clazzObj)
        } else { // 是这个院系的新的年级
          let gradeObj = { value: grade_id, label: grade_name, children: [] };
          let classObj = { value: id, label: class_name };
          gradeObj.children.push(classObj)
          tempData[deptId].children.push(gradeObj)
        }
      })
    }
  })
  return Object.values(tempData);
}

// 获取班级的级联数据
router.post('/getCasDepatGradeClazz', function(req, res, next) {
  let data = getCasClazz();
  data.then(result => {
    if(result) {
      return res.json(new SuccessModal(deatilWithClazz(result)))
    }
    return res.json(new ErrorModal('删除失败'));
  })
})
module.exports = router;
