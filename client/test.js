/*
 * @Author: za-wangxuezhong
 * @Date: 2019-11-07 23:00:08
 * @LastEditors: za-wangxuezhong
 * @LastEditTime: 2019-11-08 21:24:52
 * @Description: file content
 */
import React, { memo } from 'react'
import ReactEcharts from 'echarts-for-react';
// import option from './data/data';
import option1 from './data/data1';
import axios from 'axios';

class test extends React.Component{
    constructor (props) {
        super(props);
    }
    state = {
        option: {},
    }

    render(){
        console.log(this.state.option1);
        return(
            <div>
                {/* <ReactEcharts
                    option={option}
                    style={{height: '400px', width: '600px'}}
                    opts={{renderer: 'svg'}}
                    className='react_for_echarts' /> */}
                <ReactEcharts
                    option={this.state.option}
                    style={{height: '400px', width: '600px'}}
                    opts={{renderer: 'svg'}}
                    className='react_for_echarts' />
            </div>
        );
    }
    async componentDidMount() {
        console.log('hah');
        const result = await axios.post('./api/gdxx');
        console.log(result);
        let xAxis = [];
        let series = [];
        let gdrs = [];
        let gj = [];
        const {_gdrs} = result.data;
        _gdrs.map(item => {
            xAxis.push(item.rq);
            gdrs.push(item.gdrs);
            gj.push(item.gj);
        });
        let option = this.state.option;
        let xAxis1 = {
            data: xAxis
        }
        let data = {};
        data.data = gdrs
        series.push(data);
        data.data = gj
        series.push(data);
        option.xAxis = xAxis1;
        option.series = series;
        let option2 = Object.assign({}, option1, option)
        console.log(option2);
        this.setState({option: option2 });
    }
}

export default test;
