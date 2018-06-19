require('dotenv').load();
var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

var api = require('../api');
var createToken = require('../middleware/createToken');

// 登录
router.post('/login', function (req, res, next) {
  var name = req.body.account;
  var password = sha1(req.body.checkPass);
  api.getUserByName(req.body.account)
        .then(function (user) {
          if (user && (password == user.password)) {
            res.json({
              code: 200,
              token: createToken(name) // 身份验证成功，服务端生成一个token返回客户端，存入cookie，下次请求时随着HTTP传给服务端，进行身份验证即可
            });
          } else {
            res.json({
              code: -200,
              message: '用户名或密码错误'
            })
          }
        })
        .catch(err => {
          next(err)
          return res.json({
            code: -200,
            message: err.toString()
          })
        })
})

module.exports = router;
