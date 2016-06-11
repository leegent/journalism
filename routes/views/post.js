var keystone = require('keystone');

exports = module.exports = function (req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;

  locals.data={
    post:null
  }

  // Load the news
  view.on('init', function (next) {
    var q = keystone.list('Post').model.findById(req.query.id).exec(function (err, result) {
      locals.data.post = result;
      locals.section = result.category==='0'?'noticelist':'newslist';
      next(err);
    });
  });
  
  // Render the view
  view.render('post');
};