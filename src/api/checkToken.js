import {url} from './main'
import axios from 'axios'

export function checkTokenRequest(obj){
    let reqUrl=url+'/LoginPage/TokenCertify'
    let bool
    axios.get(reqUrl).then((res)=>{
        bool=res.data.identify
    }).catch((err)=>{
        console.log(err)
    }).finally(()=>{
        obj.checkToken(bool)
    })
}