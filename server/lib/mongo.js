var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect('mongodb://localhost:27017/mywebsite');
var moment = require('moment'); // 时间格式化
var objectIdToTimestamp = require('objectid-to-timestamp'); // 根据 _id 生成时间戳

// 根据 id 生成创建时间 (created_at 用于创建时间)
mongolass.plugin('addCreateAt', {
  afterFind: function (results) {
    results.forEach(function (item) {
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm:ss')
    })
    return results
  },
  afterFindOne: function (result) {
    if (result) {
      result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm:ss')
    }
    return result
  }
})

// 用户 exec(cd)执行查询，并将查询结果传进回调函数cd中
exports.User = mongolass.model('User', {
  name: { type: 'string' },
  password: { type: 'string' }
})
exports.User.index({ name: 1 }, { unique: true }).exec(); // 根据用户名找到用户信息，用户名全局唯一

// 分类
exports.Classify = mongolass.model('Classify', {
  classify: { type: 'string' }
})
exports.Classify.index({ _id: 1}).exec();

// 文章
exports.Article = mongolass.model('Article', {
  classify: { type: 'string' },
  title: { type: 'stirng'},
  content: { type: 'string' },
  contentToMark: { type: 'string' }
})
exports.Article.index({ _id: 1, classify: -1}).exec();
