/*
 * @Author: za-wangxuezhong
 * @Date: 2019-11-06 17:08:05
 * @LastEditors: za-wangxuezhong
 * @LastEditTime: 2019-11-10 22:44:36
 * @Description: file content
 */
import React from 'react';
import axios from 'axios';
import Echarts from './echarts'
import Table from './table'
import option1 from './data/data1';
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        option: {},
    }
    render() {
        return (
            <div>
                <Table option={this.state.option}/>
                <Echarts option={this.state.option}/>
            </div>
        );
    }
    async componentDidMount() {
        const options = await option1();
        this.setState({option: options})
    }
    async hah() {
    }
}
export default App;
