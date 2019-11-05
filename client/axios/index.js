import config from '../../config';
import axios from 'axios';
import Lockr from 'lockr';
import {message} from 'antd';
let LANG = '';

// 拦截器
axios.interceptors.request.use(config => {
    // 如果是get请求，后面加上时间戳，防止浏览器缓存
    if (config.method === 'get') {
        let tag = new Date().getTime();
        config.url += `?${tag}`;
    }
    config.headers['Cache-Control'] = 'no-cache';
    return config;
});
axios.interceptors.response.use(
    res => {
        // Do something with response data
        // 接口返回101未登录时，跳转重新登录
        if (res.data.code === '101') {
            if (self !== top) {
                // iframe退出登录
                window.parent.goNsso();
            } else {
                window.location.href = '/logout';
            }
        }
        if (!res.data.success && !res.data.userId) {
            let msg =
                LANG[res.data.errorCode] ||
                res.data.msg ||
                LANG.COMMON_SYS_0000;
            console.log('msg', msg);
            msg && message.error(msg);
        }
        return res;
    },
    error => {
        console.error('error', error);
        // Do something with response error
        message.error(LANG.system_unusual_againTry);
        return Promise.reject(error);
    }
);

export default axios;
