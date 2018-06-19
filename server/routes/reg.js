require('dotenv').config()
var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

var api = require('../api');
var createToken = require('../middleware/createToken');

// 注册
router.post('/reg', function (req, res, next) {
  var name = req.body.account;
  var password = req.body.checkPass;
  password = sha1(password);
  var user = {
    name: name,
    password: password
  }

  api.create(user)
        .then(() => {
          res.send({
            code: 200,
            token: createToken(name)
          })
        })
        .catch(err => {
          // 操作数据库是发生错误
          if (err.message.match('E11000 duplicate key')) {
            return res.json({
              code: -200,
              message: '用户名重复'
            })
          }
          // 服务器发生错误
          return res.json({
            code: -200,
            message: err.toString()
          })
        })
})

module.exports = router;
