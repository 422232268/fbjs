/*
 * @Author: za-wangxuezhong
 * @Date: 2019-11-06 17:08:05
 * @LastEditors: za-wangxuezhong
 * @LastEditTime: 2019-11-07 21:51:33
 * @Description: file content
 */
import React from 'react';
import axios from 'axios';
class App extends React.Component {
    render() {
        return (
            <div onClick={() => this.hah()}>
                hah1221
            </div>
        );
    }
    async componentDidMount() {
        console.log('hah');
    }
    async hah() {
        console.log('jaja');
        const result = await axios.post('./api/gdxx');
        console.log(result);
    }
}
console.log('hah');
export default App;
