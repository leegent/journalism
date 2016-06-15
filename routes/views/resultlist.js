var keystone = require('keystone');

exports = module.exports = function (req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;

  locals.section = 'search';
  locals.data={
    posts:null,
    keys:decodeURIComponent(req.query.keys).split('|'),
    cutoff:[]
  }

  // Load the news
  view.on('init', function (next) {
    var i = 0,str=[];
    for(;i<locals.data.keys.length;i++){
      str.push(new RegExp(locals.data.keys[i]+'+'));
    }
    console.log(str[1]);
    var q = keystone.list('Post').model.find().where('title',str[0]);
    q = q.sort('-publishedDate');
    q.exec(function (err, result) {
      if(str.length>1 && result.length>0){
        var j;
        for(i=1;i<str.length;i++){
          for(j=0;j<result.length;j++){
            if(!str[i].test(result[j].title)){
              result.splice(j--,1);
            }
          }
        }
      }
      locals.data.posts = result;
      next(err);
    });
  });

  // Render the view
  view.render('resultlist');
};
