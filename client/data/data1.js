/*
 * @Author: za-wangxuezhong
 * @Date: 2019-11-08 09:38:26
 * @LastEditors: za-wangxuezhong
 * @LastEditTime: 2019-11-10 23:18:11
 * @Description: file content
 */
import axios from 'axios';
import {transNum} from '../lib.js';
import _ from 'lodash';
module.exports = async() =>{
    const {data} = await axios.post('./api/gdxx');
    const {_gdrs} = data;
    const {gggjxx} = data;
    console.log(data);
    const gdrs_sjj = _gdrs.reverse();
    let rq = [];
    let gdrs = [];
    let gj = [];
    gdrs_sjj.map(item => {
        rq.push(item.rq);
        gdrs.push(item.gdrs);
        gj.push(item.gj);
    })
    const gdrs_sum = _.reduce(transNum(gdrs) ,(sum, n) => {
        return sum + n;
    }, 0);
    const gj_sum = _.reduce(transNum(gj), (sum, n) => {
        return sum + n;
    }, 0);
    const gdrs_bfb = transNum(gdrs).map(item => {
        item = item/gdrs_sum;
        return item;
    });
    const gj_bfb = transNum(gj).map(item => {
        item = item / gj_sum;
        return item;
    });

    let option = {
        gggjxx: [gggjxx],
        title: {
            text: gggjxx.gp_name,
            // subtext: '纯属虚构'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['股东人数', '股价走势']
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: rq ? rq : ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} %'
            }
        },
        series: [
            {
                name: '股价走势',
                type: 'line',
                data: gdrs_bfb ? gdrs_bfb : [11, 11, 15, 13, 12, 13, 10],
                markPoint: {
                    data: [
                        // {type: 'max', name: '最大值'},
                        // {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            },
            {
                name: '股东人数',
                type: 'line',
                data: gj_bfb ? gj_bfb : [1, -2, 2, 5, 3, 2, 0],
                markPoint: {
                    data: [
                        // {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                        // {type: 'max', name: '最大值'},
                        // {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'},
                        [{
                            symbol: 'none',
                            x: '90%',
                            yAxis: 'max'
                        }, {
                            symbol: 'circle',
                            label: {
                                normal: {
                                    position: 'start',
                                    formatter: '最大值'
                                }
                            },
                            type: 'max',
                            name: '最高点'
                        }]
                    ]
                }
            }
        ]
    };
    return option;
}

