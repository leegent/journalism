var keystone = require('keystone');

exports = module.exports = function (req, res) {
  var view = new keystone.View(req, res);
  var locals = res.locals;
  switch(req.path){
    case '/overview':
      locals.section = 'overview';
      view.render('overview');
      break;
    case '/framework':
      locals.section = 'framework';
      view.render('framework');
      break;
    case '/contact':
      locals.section = 'contact';
      view.render('contact');
      break;
    case '/links':
      locals.section = 'links';
      view.render('links');
      break;
  }
};