/*
 * @Author: za-zhouchiye
 * @Date: 2018-07-04 12:03:46
 * @Description: ''
 * @Last Modified by: za-zhouchiye
 * @Last Modified time: 2018-11-12 11:12:05
 * @ToDo: ''
 */
var Koa = require('koa');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');
var serve = require('koa-convert');
var views = require('koa-views');
var session = require('koa-session');
var path = require('path');
var webpack = require('webpack');
var compress = require('koa-compress');
const requireDirectory = require('require-directory');
require('colors');
var opn = require('opn');
var webpackDevMiddleware = require('koa-webpack-dev-middleware');
var webpackHotMiddleware = require('koa-webpack-hot-middleware');
var {historyApiFallback} = require('koa2-connect-history-api-fallback');
// var ejs = require('ejs');
// var logger = require('koa-logger');
var config = require('../config');
var conf = require('../env-config');

var devConfig = require('../webpack/webpack.dev');

// koa路由模块

// 端口设置
var PORT = 8086;
// var PORT = conf.port || 8080;

var app = new Koa();
var router = new Router();

var options = {threshold: 2048};
app.use(compress(options));

app.keys = ['some secret hurr'];
app.use(session(app));

app.use(bodyParser());

// app.use(logger());
// 开发环境启用devserver
if (!process.env.DEPLOY_ENV) {
    // 不同环境选用不同webpack配置
    var compile;
    compile = webpack(devConfig);
    app.use(historyApiFallback({enable: true}));
    app.use(webpackDevMiddleware(compile, {
        'noInfo': true,
        'publicPath': devConfig.output.publicPath,
        'stats': {
            'colors': true
        }
    }));

    app.use(webpackHotMiddleware(compile));
}

// 生产环境设置强缓存,5分钟
let koaStaticServe = process.env.DEPLOY_ENV ? {maxage: 300000} : {};
app.use(serve(require('koa-static')(path.join(__dirname, config.dirname)), koaStaticServe));
app.use(serve(require('koa-static')(path.join(__dirname, '../static'))));

// app.use(views(path.join(__dirname, config.dirname), {
//     'extension': 'html'
// }));

// response
requireDirectory(module, './api', {visit: whenModuleLoad});
function whenModuleLoad(obj) {
    if (obj instanceof Router) {
        app.use(obj.routes(), obj.allowedMethods());
    }
}

app.use(async(ctx) => {
    await ctx.render('index');
});

router.get('/health', function(ctx) {
    ctx.status = 200;
});

// 校验登录
// router.all(/^\//, login);

// 接口转发
// router.all(/^\/api/, api);
// router.all(/^\/getUserInfo/, async (ctx) => {
//     ctx.response.body = ctx.session.userInfo;
// });
app.use(router.routes()).use(router.allowedMethods());

// error
app.on('error', (err, ctx) => {
    if (ctx.request.url !== '/__webpack_hmr' && ctx.request.url.indexOf('hot-update.json') < 0) {
        console.error('错误信息:', err);
        console.error('错误信息请求地址:', ctx.request.url);
        console.log('------------------------------------------');
    }
});

app.listen(PORT, () => {
    console.log(`\n\n------------------------------------------------\n`.rainbow);
    console.log(`正在监听: ${PORT}`.red);
    console.log(`当前环境: ${process.env.DEPLOY_ENV || 'local'}`.red);
    console.log(`\n------------------------------------------------\n\n`.rainbow);
    if (!process.env.DEPLOY_ENV) {
        // opn(`http://localhost:${PORT}`, {app: ['google chrome']});
    }
});
