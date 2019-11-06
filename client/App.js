/*
 * @Author: za-wangxuezhong
 * @Date: 2019-11-06 17:08:05
 * @LastEditors: za-wangxuezhong
 * @LastEditTime: 2019-11-06 22:10:42
 * @Description: file content
 */
import react, {Component} from 'react';
class App extends Component{
    render() {
        return(
            <div onClick={()=>this.hah()}>
                hah1221
            </div>
        )
    }
    componentDidMount = async() => {
        console.log('hah');
        const result = await axios.get('/api/gdxx');
        console.log(result);
    }
}
console.log('hah');
export default App;
