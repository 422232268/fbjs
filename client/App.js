import react, {Component} from 'react';
import axios from 'axios';
class App extends Component{
    render() {
        return(
            <div onClick={()=>{this.hah()}}>
                hah
            </div>
        )
    }
    hah = async() => {
        console.log('hah');
        const result = await axios.get('/api/gdxx');
        console.log(result);
    }
}
console.log('hah');
export default App;