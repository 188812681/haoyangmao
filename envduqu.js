/*
读取环境变量
[task_local]
#读取环境变量
cron:2 2 2 2 2
2 2 2 2 2 envduqu.js, tag=读取环境变量, enable=ture
*/
const notify = require('./sendNotify');
console.log(process.env.JD_COOKIE)
notify.sendNotify('123')