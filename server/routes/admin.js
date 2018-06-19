var express = require('express');
var checkToken = require('../middleware/checkToken');
var router = express.Router();

router.get('/admin', checkToken, function (req, res, next) {
  res.send({
    type: true,
    name: 'zhangyanan'
  });
});

module.exports = router
