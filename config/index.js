/*
 * @Author: za-wangxuezhong
 * @Date: 2019-11-07 11:03:35
 * @LastEditors: za-wangxuezhong
 * @LastEditTime: 2019-11-07 17:55:34
 * @Description: file content
 */
// const ENV = {
//     default: require('./default.json'),
//     dev: require('./dev.json'),
//     prd: require('./prd.json')
// }[process.env.DEPLOY_ENV || 'default'];

// module.exports = ENV;
module.exports = require('./default.json');
