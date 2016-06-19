var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	// days of current month
	var today = new Date();
	function getLastDay(day) {
		var y = day.getFullYear();
		var FebLastDay = ((y % 4 === 0 && y % 100 != 0) || y % 400 === 0)?29:28;
		return [31,FebLastDay,31,30,31,30,31,31,30,31,30,31][day.getMonth()];	
	}	
	// 首页需要从数据库获取的数据有：所有本月的“今日新院”，三类新闻的分别最新2个，以及最新的10条公告
	locals.data={
		todays:[],
		ycl:[],
		collegeStu:[],
		graduateStu:[],
		notices:[],
		month:today.getMonth()+1,
		lastDay:getLastDay(today),
		dataEnough() {
			return this.todays.length === 10 && this.ycl.length === 2 && this.collegeStu.length === 2 && this.graduateStu.length === 2 && this.notices.length === 10;
		}
	};
	 // Load all posts
	view.on('init',function (next) {
		'use strict'
		keystone.list('Post').model.find().sort('-publishedDate').exec(function (err, result) {
			if (err || !result.length) {
				return next(err);
			}
			for (let i = 0; i < result.length; i++) {
				// 本月的“今日新院”新闻
				if (result[i].showInCalendar && result[i].publishedDate.getMonth() === today.getMonth()) {
					locals.data.todays.push(result[i]);
				}
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
			// if there's no todays of current month yet, use todays of last month instead
			if(locals.data.todays.length === 0){
				locals.data.month = locals.data.month === 1 ? 12 : locals.data.month - 1;
				locals.data.lastDay = getLastDay(
					new Date(locals.data.month === 12?today.getFullYear()-1:today.getFullYear(), locals.data.month-1, 1)
					);
				for (let i = 0; i < result.length; i++) {
					if (result[i].showInCalendar && result[i].publishedDate.getMonth() === locals.data.month - 1) {
						locals.data.todays.push(result[i]);
					}
				}
			}
			next();
		});		
	});
	locals.section = 'home';
	view.render('home');
};
