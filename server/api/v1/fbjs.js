const Router = require('koa-router');
const router = new Router({
    prefix: '/api'
});
var iconv = require("iconv-lite");
const axios = require('axios');
const http = require('http');
router.get('/', async(ctx, next) => {
    let date = new Date().getTime();
    const count = 40;
    // 前十名股票信息
/** const result = await axios.get(`http://90.push2.eastmoney.com/api/qt/clist/get?cb=jQuery112407051598048877599_1572716745706&pn=1&pz=${count}&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&fid=f3&fs=m:0+t:6,m:0+t:13,m:0+t:80,m:1+t:2,m:1+t:23&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152&_=${date}`);  */
    // http://90.push2.eastmoney.com/api/qt/clist/get?cb=jQuery112408406940805846086_1572718103420&pn=1&pz=20&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&fid=f3&fs=m:0+t:6,m:0+t:13,m:0+t:80,m:1+t:2,m:1+t:23&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152&_=1572718103421
    // f2: 最新价 f3:涨跌幅 f4:涨跌额 f5:成交量（手） f6:成交额 f7:振幅  f8:换手率 f9:市盈率 f12:代码 f14: 名称
    // f15:最高 f16:最低 f17:今开盘 f18 昨收 f23:市净率
    const result = await axios.get(`http://f10.eastmoney.com/ShareholderResearch/ShareholderResearchAjax?code=SZ300793`)
    ctx.body = result.data;
});
router.post('/gdxx', async(ctx, next) => {
    let date = new Date().getTime();
    const count = 40;
    const code = '300429';
    // 前十名股票信息
    /** const result = await axios.get(`http://90.push2.eastmoney.com/api/qt/clist/get?cb=jQuery112407051598048877599_1572716745706&pn=1&pz=${count}&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&fid=f3&fs=m:0+t:6,m:0+t:13,m:0+t:80,m:1+t:2,m:1+t:23&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152&_=${date}`); */
    // f2: 最新价 f3:涨跌幅 f4:涨跌额 f5:成交量（手） f6:成交额 f7:振幅  f8:换手率 f9:市盈率 f12:代码 f14: 名称
    // f15:最高 f16:最低 f17:今开盘 f18 昨收 f23:市净率
    const result_f10 = await axios.get(`http://f10.eastmoney.com/ShareholderResearch/ShareholderResearchAjax?code=SZ${code}`);
    let url = `http://hq.sinajs.cn/list=` + prefixcode(code)
    const gp = await http_xl(url,code);
    // const str = new TextDecoder('gbk').decode(data)
    // var x = new Uint8Array(data);
    // const result_ggxx = data.decode('utf8');
    // var a = data.split(',')[0];
    // var b = a.split('=')[1];
    // var c = iconv.decode(b,'gbk');
    // console.log(data);
    const {gdrs, sdltgd, sdgd, jjcg, sdgdcgbd, xsjj, sdltgd_chart, zlcc, zlcc_rz, kggx} = result_f10.data;
    // gdrs:股东人数, sdltgd:十大流通股东, sdgd:十大股东, jjcg:基金持股, sdgfcgbd:十大股东持股变动， xsjj:限售解禁，
    // sdltgd_chart:十大流通股东, zlcc:机构持仓, zlcc_rz:机构持股日志, kggx:控制人信息
    let result_res = {};
    let _gdrs = [];
    let _sdltgd = [];
    let sdgdcgblhj;
    let _jjcg = [];
    let gdzb = [];
    let sdgdzb = {};
    let _zlcc = [];
    let _zlcc_rz = [];
    if (gdrs !== null) {
        gdrs.map(item => {
            // cmjzd:筹码集中度, gdrs:股东人数, gdrx_jsqbh, :股东人数较上期变化, gj:股价,
            // qsdgdcghj:前十大股东持股合计, qsdltgdcghj:前十大流通股东持股合计
            // rjcgje:人均持股金额, rjltg:人均流通股(股), rjltg_jsqbh:人均流通股较上期变化, rq:日期
            let temp = {};
            temp.rq = item.rq;
            temp.gdrs = item.gdrs;
            temp.gj = item.gj;
            _gdrs.push(temp);
        });
    }
    if (sdltgd !== null) {
        let sdltgdbfb = [];
        sdltgd.map((item, index) => {
            // bdbl:变动比例, cgs:持股数, gdmc:股东名称, gdxz:股东性质, gflx:股份类型, mc:排名, rq:日期, zj:增减, zltgbcgbl:占流通股本持股比例
            item.sdltgd.map(itm => {
                let tem = {};
                if (index === 0) {
                    let temp = {};
                    temp.kggx = kggx.sjkzr;
                    temp.cgbl = kggx.cgbl;
                    temp.gdmc = itm.gdmc;
                    temp.gdxz = itm.gdxz;
                    temp.bdbl = itm.bdbl;
                    _sdltgd.push(temp);
                }
                tem.rq = item.rq;
                tem.cgs = itm.cgs;
                tem.gdmc = itm.gdmc;
                sdltgdbfb.push(tem);
                sdgdzb.sdltgdbfb = sdltgdbfb;
                if (sdltgd_chart !== null) {
                    let sdltgdzs = [];
                    sdltgd_chart.map(it => {
                        let tep = {};
                        tep.rq = it.rq;
                        tep.zs = (+it.sdltgdcg) + (+it.ltsxgf) + (+it.qyltgf);
                        tep.zs = '' + tep.zs;
                        sdltgdzs.push(tep);
                    });
                    sdgdzb.sdltgdzs = sdltgdzs;
                }
            });
        });
    }
    if (sdgd !== null) {
        // rq:日期，sdgd:十大股东
        sdgd.map((item, index) => {
            if (index === 0) {
                let tmpnum = 0;
                item.sdgd.map(itm => {
                    // bdbl:变动比例, cgs:持股数, gdmc:股东名称, gdxz:股东性质, gflx:股份类型, mc:排名, rq:日期, zj:增减, zltgbcgbl:占流通股本持股比例
                    // sdgdcgblhj += item.bdbl * 100;
                    // console.log(toStringBaiFenBi(itm.zltgbcgbl));
                    let tempNum = toStringBaiFenBi(itm.zltgbcgbl)
                    // console.log(tempNum);
                    tmpnum += tempNum;
                });
                // console.log(tmpnum);
                sdgdcgblhj = tmpnum;
            }
        });
    }
    if (jjcg !== null) {
        jjcg.map(item => {
            // rq:日期, jjcg:基金持股
            let temp = {}
            temp.jjcgLength = item.jjcg.length;
            temp.rq = item.rq;
            let __jjcg = [];
            item.jjcg.map(itm => {
                let tem = {};
                // cgs:持股数, cgsz:持仓市值, id: , jjdm:基金code, jjmc:基金名称, order:持股数排名, zjzb:占净值比, zltb:占流通比, zzgbb:
                tem.jjmc = itm.jjmc;
                tem.jjdm = itm.jjdm;
                tem.zltb = itm.zltb;
                __jjcg.push(tem);
                temp.__jjcg = __jjcg;
            })
            _jjcg.push(temp)
        })
    }
    if (sdgdcgbd !== null) {
        // todo
    }
    if (xsjj !== null) {
        // todo
    }
    if (sdltgd_chart !== null) {
        gdzb = sdltgd_chart;
    }
    if (zlcc !== null) {
        _zlcc = zlcc;
    }
    if (zlcc_rz !== null) {
        _zlcc_rz = zlcc_rz;
        // http://f10.eastmoney.com/ShareholderResearch/MainPositionsHodlerAjax?date=2019-06-30&code=SZ300429
    }

    result_res._zlcc = _zlcc;
    result_res._zlcc_rz = _zlcc_rz;
    result_res.sdgdzb = sdgdzb;
    result_res.gdzb = gdzb;
    result_res.sdgdcgblhj = sdgdcgblhj + '%';
    result_res._gdrs = _gdrs;
    result_res._sdltgd = _sdltgd;
    result_res._jjcg = _jjcg;
    result_res.gggjxx = gp;
    ctx.response.body = result_res;
});

function toStringBaiFenBi(str) {
    var num = str.split('%')[0];
    num = +num;
    return num;
}
function prefixcode(code) {
    var tmpArr = code.split('');
    if (tmpArr[0] === '6') {
        code = 'sh' + code;
    } else {
        code = 'sz' + code;
    }
    return code;
}
function http_xl(url,code){
    let resul = new Promise((resolve, reject) => {
        let gp = {};
        var res = http.get(url);
        res.on('response', res => {
            res.on('data', (chunk) => {
                var result = iconv.decode(chunk, 'gbk');
                var gphq = result.split(',');
                var gp_name = gphq[0].split('=')[1].split('"')[1];
                // console.log(gp_name);
                gp.gp_name = gp_name;
                gp.gp_code = code;
                gp.key = code;
                gp.id = code;
                gp.open_jg = gphq[1];
                gp.zrsp_jg = gphq[2];
                gp.dqjg_jg = gphq[3];
                gp.high_jg = gphq[4];
                gp.low_jg = gphq[5];
                gp.buyjj_jg = gphq[6];
                gp.selljj_jg = gphq[7];
                gp.cjl = gphq[8];
                gp.cje = gphq[9];
                gp.buy1_ss = gphq[10];
                gp.buy1_jg = gphq[11];
                gp.buy2_ss = gphq[12];
                gp.buy2_jg = gphq[13];
                gp.buy3_ss = gphq[14];
                gp.buy3_jg = gphq[15];
                gp.buy4_ss = gphq[16];
                gp.buy4_jg = gphq[17];
                gp.buy5_ss = gphq[18];
                gp.buy5_jg = gphq[19];
                gp.sell1_ss = gphq[20];
                gp.sell1_jg = gphq[21];
                gp.sell2_ss = gphq[22];
                gp.sell2_jg = gphq[23];
                gp.sell3_ss = gphq[24];
                gp.sell3_jg = gphq[25];
                gp.sell4_ss = gphq[26];
                gp.sell4_jg = gphq[27];
                gp.sell5_ss = gphq[28];
                gp.sell5_jg = gphq[29];
                gp.rq = gphq[30];
                gp.time = gphq[31];
            });
            res.on('end', () => {
                resolve(gp);
            })
        })
        });
    return resul;
}
module.exports = router;
