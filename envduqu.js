/*
读取环境变量
2 2 2 2 2 envduqu.js, tag=读取环境变量, enable=ture
*/
const $ = new Env('读取环境变量');
const notify = require('./sendNotify');
console.log(process.env.JD_COOKIE)
notify.sendNotify('123')