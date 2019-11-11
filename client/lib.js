/*
 * @Author: za-wangxuezhong
 * @Date: 2019-11-08 23:51:39
 * @LastEditors: za-wangxuezhong
 * @LastEditTime: 2019-11-09 01:40:01
 * @Description: file content
 */
export function transNum(Array) {
    let arr = Array.map(item => {
        if (item.includes('万')) {
            item = item.split('万')[0];
            item = item * 10000;
            item = '' + item;
        }
        if (item.includes('.')) {
            item = item.split('.')[0] + item.split('.')[1];
        }
        item = +item;
        return item;
    })
    return arr;
}
