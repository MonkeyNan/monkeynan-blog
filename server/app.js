var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./routes');

// express中间件，对post请求的请求体进行解析
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// 跨域
app.all('*',function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // 任意域名请求
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type"); // 预检请求使用，可以支持的请求头
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"); // 预检请求使用，可以支持的请求方法
  next();
});
// 路由
routes(app);
// 设置端口，监听程序
app.set('port', process.env.PORT || 3001);
app.listen(app.get('port'), function () {
  console.log('Express server listening on port' + app.get('port'));
});

