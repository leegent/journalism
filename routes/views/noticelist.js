var keystone = require('keystone');

exports = module.exports = function (req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = 'noticelist';
  locals.data={
    posts:null
  }

  // Load the news
  view.on('init', function (next) {

    var q = keystone.list('Post').paginate({
      page: req.query.page || 1,
      perPage: 15,
      maxPages: 999
    }).where('category','0').sort('-publishedDate');

    q.exec(function (err, results) {
      locals.data.posts = results.results;
      locals.data.pages = results.pages;
      locals.data.currentPage = results.currentPage;
      locals.data.totalPages = results.totalPages;
      next(err);
    });
  });

  // Render the view
  view.render('noticelist');
};
