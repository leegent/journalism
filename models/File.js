var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * File Model
 * ==========
 */

var File = new keystone.List('File', {
    // name is displayed in admin UI
    map: {name: 'title'},
    autokey: {path: 'slug', from: 'title', unique: true},
    defaultSort: '-uploadedAt',
});

File.add({
    title: {label:'文件名',type: String, required: true},
    fileType: {
        label: '文件类型',
        type: Types.Select,
        options: [
            {label: '图片', value: 0},
            {label: '文档', value: 1}, 
            {label: '表格', value: 2}, 
            {label: '其他', value: 3}
        ],
        index:true,
        default:0,
        required:true
    },
    uploadedAt: {label: '上传日期', type: Types.Date, index: true,default:Date.now,format:"YYYY-MM-DD"},
    content: {
        label: '选择文件',
        type: Types.LocalFile,
        dest: 'public/upload',
        prefix: '/upload'
    },
    filePath:{
        label:'文件路径',
        type:Types.Url,
        noedit:true
    }
});
// hook, auto set public date
File.schema.pre('save',function (next) {
    this.uploadedAt = Date.now();
    // console.dir(this.content);
    this.filePath = '/upload/'+this.content.filename;
    next();
});

File.defaultColumns = 'title|40%, fileType|10%, uploadedAt|10%, filePath';
File.register();