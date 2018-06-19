// json web token 用来代替常用的 session 机制，服务端不用保存 token ,只需对 token 的身份验证即可
var jwt = require('jsonwebtoken')
module.exports = function (req, res, next) {
  if (req.headers['authorization']) {
    var token = req.headers['authorization'].split(' ')[1]
    var decoded = jwt.decode(token, process.env.JWT_SECRET)
    // 如果过期了就重新登录
    // 验证 token 也需要优化
    if (token && decoded.exp <= Date.now()/1000) {
      return res.send({
        code: 401,
        message: '授权已经过期，请重新登录'
      })
    }
  }
  next();
}
