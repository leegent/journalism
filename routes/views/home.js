var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	// days of current month
	var days = (()=>{
		var y = Date.now.getFullYear();
		var FebLastDay = ((y % 4 === 0 && y % 100 != 0) || y % 400 === 0)?29:28;
		return [31,FebLastDay,31,30,31,30,31,31,30,31,30,31][Date.now().getMonth()];		
	});
	// 首页需要从数据库获取的数据有：所有本月的“今日新院”，三类新闻的分别最新2个，以及最新的10条公告
	locals.data={
		todays:[],
		ycl:[],
		collegeStu:[],
		graduateStu:[],
		notices:[],
		days:days,
		dataEnough() {
			return this.todays.length === 10 && this.ycl.length === 2 && this.collegeStu.length === 2 && this.graduateStu.length === 2 && this.notices.length === 10;
		}
	};
	 // Load all posts
	view.on('init',function (next) {
		'use strict'
		keystone.list('Post').model.find({'state': 1}).sort('-publishedDate').exec(function (err, result) {
			if (err || !result.length) {
				return next(err);
			}
			// 获取了所有已发布的posts
			for (let i = 0; i < result.length; i++) {
				if (result[i].showOnHomepage) locals.data.todays.push(result[i]);
				else {
					// notice
					if (result[i].category === '0' && locals.data.notices.length < 10) {
						locals.data.notices.push(result[i]);
					}
					// Youth Communist League	
					else if (result[i].category === '1' && locals.data.ycl.length < 2) {
						locals.data.ycl.push(result[i]);
					}
					// college students union
					else if (result[i].category === '2' && locals.data.collegeStu.length < 2) {
						locals.data.collegeStu.push(result[i]);
					}
					// graduate students union
					else if (result[i].category === '3' && locals.data.graduateStu.length < 2) {
						locals.data.graduateStu.push(result[i]);
					}
				}
				// 数据量已足够
				if (locals.data.dataEnough()) break;
			}			
		});
		next();
	});
	
	locals.section = 'home';
	view.render('home');
};
