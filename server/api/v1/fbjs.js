const Router = require('koa-router');
const router = new Router({
    prefix: '/api'
});
const axios = require('axios');

router.get('/', (ctx,next) => {
    ctx.body = {
        ket: 'book'
    }
})

module.exports = router;