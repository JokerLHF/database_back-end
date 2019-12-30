var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const rejectInjection = require('./middleware/injection')

const usersRouter = require('./routes/users'); // 用户路由
const teacherRouter = require('./routes/teacher'); // 教师的路由
const studentRouter = require('./routes/student'); // 学生的路由
const gradeRouter = require('./routes/grade'); // 年级的路由
const departmentRouter = require('./routes/department'); // 系的路由
const classRouter = require('./routes/clazz'); // 班级的路由
const courseRouter = require('./routes/course'); // 课程的路由
const permissionRouter = require('./routes/permission'); // 权限的路由

const app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//  统一处理sql注入的问题
// app.use(rejectInjection());

app.use('/api/users', usersRouter);
app.use('/api/teacher', teacherRouter);
app.use('/api/student', studentRouter);
app.use('/api/grade', gradeRouter);
app.use('/api/department', departmentRouter);
app.use('/api/class', classRouter);
app.use('/api/course', courseRouter);
app.use('/api/permission', permissionRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;
