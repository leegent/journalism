var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
    // name is displayed in admin UI
    map: {name: 'title'},
    autokey: {path: 'slug', from: 'title', unique: true}
    // defaultSort: '-createAt',
});

Post.add({
    title: {label:'标题',type: String, required: true},
    state: {
        label:'状态',
        type: Types.Select,
        options: [{label: '草稿', value: 0}, {label: '已发布', value: 1}],
        index: true
    },
    author: {label: '作者', type: String, default: '新闻学院'},
    category: {
        label: '分类',
        type: Types.Select,
        options: [
            {label: '公告', value: 0},
            {label: '团委新闻', value: 1}, 
            {label: '学生会新闻', value: 2}, 
            {label: '研究生会新闻', value: 3}
        ],
        index:true,
        default:0,
        required:true
    },
    publishedDate: {label: '发布日期', type: Types.Date, index: true,dependsOn:{state:1},default:Date.now,format:"YYYY-MM-DD"},
    viewTime: {label: '浏览次数', type: Number, default: 0, noedit: true},
    image: {
        label: '封面图片',
        type: Types.LocalFile,
        dest: 'public/images',
        prefix: '/images',
        format(item, file){
            return '<img src=/images/' + file.filename + '>';
        }
    },
    content: {label: '正文', type: Types.Html, wysiwyg: true, height: 400},
    showOnHomepage: {label: '显示在今日新院', type: Boolean, default: false}
});
// hook, auto set public date
Post.schema.pre('save',function (next) {
    if(this.state === 1) this.publishedDate = Date.now();
    next();
});

Post.defaultColumns = 'title, category, state, publishedDate';
Post.register();
