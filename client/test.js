/*
 * @Author: za-wangxuezhong
 * @Date: 2019-11-07 23:00:08
 * @LastEditors: za-wangxuezhong
 * @LastEditTime: 2019-11-08 09:42:08
 * @Description: file content
 */
import React, { memo } from 'react'
import ReactEcharts from 'echarts-for-react';
import option from './data/data'
import option1 from './data/data1'
class test extends React.Component{
    constructor (props) {
        super(props);
    }
    state = {}

    render(){
        return(
            <div>
                <ReactEcharts
                    option={option}
                    style={{height: '400px', width: '600px'}}
                    opts={{renderer: 'svg'}}
                    className='react_for_echarts' />
                <ReactEcharts
                    option={option1}
                    style={{height: '400px', width: '600px'}}
                    opts={{renderer: 'svg'}}
                    className='react_for_echarts' />
            </div>
        );
    }
}

export default test;
