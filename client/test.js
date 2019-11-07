/*
 * @Author: za-wangxuezhong
 * @Date: 2019-11-07 23:00:08
 * @LastEditors: za-wangxuezhong
 * @LastEditTime: 2019-11-07 23:21:39
 * @Description: file content
 */
import React, { memo } from 'react'
import ReactEcharts from 'echarts-for-react';

class test extends React.Component{
    constructor (props) {
        super(props);
    }
    state = {}

    render(){
        return(
            <div>
                <ReactEcharts
                    option={this.getOption()}
                    style={{height: '400px', width: '100%'}}
                    opts={{renderer: 'svg'}}
                    className='react_for_echarts' />
            </div>
        );
    }
}

export default test;
