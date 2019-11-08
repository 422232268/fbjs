/*
 * @Author: za-wangxuezhong
 * @Date: 2019-11-06 17:08:05
 * @LastEditors: za-wangxuezhong
 * @LastEditTime: 2019-11-08 20:30:55
 * @Description: file content
 */
import React from 'react';
import axios from 'axios';
import Test from './test'
class App extends React.Component {
    render() {
        return (
            <div>
                <Test />
            </div>
        );
    }
    async componentDidMount() {
        console.log('hah');
        const result = await axios.post('./api/gdxx');
        // console.log(result);
        // let xAxis = {};
        // let gdrsrq = [];
        // const {_gdrs} = result;
        // _gdrs.map(item => {
        //     data.push(item.rq);
        // })
        // console.log(data);
    }
    async hah() {
    }
}
console.log('hah');
export default App;
