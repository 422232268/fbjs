const koa = require('koa');
const webpack = require('webpack')
const Router = require('koa-router');
const requireDirectory = require('require-directory');
const compress = require('koa-compress');
const views = require('koa-views');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const devConfig = require('../webpack/webpack.dev');
var opn = require('opn');
var webpackDevMiddleware = require('koa-webpack-dev-middleware');
var webpackHotMiddleware = require('koa-webpack-hot-middleware');
var historyApiFallback = require('koa2-connect-history-api-fallback');
var serve = require('koa-static');
var path = require('path');
var PORT = 3000;

const app = new koa();
const router = new Router();
const compressConfig = { threshold: 2048 };
app.use(compress(compressConfig));

app.keys = ['wxz'];
app.use(session(app));

app.use(bodyParser());

if (!process.env.NODE_ENV) {
    var compile;
    compile = webpack(devConfig);
    app.use(historyApiFallback());
    app.use(webpackDevMiddleware(compile,{
        'noInfo': true,
        'publicPath': devConfig.output.publicPath,
        'stats': {
            'colors': true
        }
    }));
    app.use(webpackHotMiddleware(compile));
}

let koaStaticServe = process.env.DEPLOY_ENV ? {maxage: 300000} : {};

app.use(serve(path.join(__dirname, '../build'), koaStaticServe));
app.use(serve(path.join(__dirname, '../static')));
app.use(views(path.join(__dirname, '../build'), {'extensions': 'html'}))
app.use(async(ctx)=>{
    await ctx.render('index');
})
router.get('/',(ctx) =>{
    ctx.status = 200;
})
// const modules = requireDirectory(moudel, path.resolve(__dirname, './api'), {visit: whenLoadMoudel});
const modules = requireDirectory(module, './api', {visit:whenModuleLoad})
function whenModuleLoad (obj) {
    if (obj instanceof Router) {
        app.use(obj.routes());
    }
}

// app.use(koaStatic(Path.resolve(__dirname, '../static',)))
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
        opn(`http://localhost:${PORT}`, {app: ['google chrome']});
    }
});

