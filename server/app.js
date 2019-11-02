const koa = require('koa');
const Router = require('koa-router');
const requireDirectory = require('require-directory');
const koaStatic = require('koa-static');
const compress = require('koa-compress');
const Path = require('path');
const app = new koa();
const router = new Router();

const compressConfig = { threshold: 0 };
app.use(compress(compressConfig));

// const modules = requireDirectory(moudel, path.resolve(__dirname, './api'), {visit: whenLoadMoudel});
const modules = requireDirectory(module, './api', {visit:whenModuleLoad})
function whenModuleLoad (obj) {
    if (obj instanceof Router) {
        app.use(obj.routes());
    }
}

// app.use(koaStatic(Path.resolve(__dirname, '../static',)))

app.listen(3000, ()=>{
    console.log('启动成功')
})