let koa = require('koa');
let Static = require('koa-static');
let Path = require('path');
let app = new koa();

app.use(Static(Path.resolve(__dirname, '../static',)))

app.listen(3000, ()=>{
    console.log('启动成功')
})