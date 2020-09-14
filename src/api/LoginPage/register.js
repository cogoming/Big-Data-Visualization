import {url} from '../main'
import axios from 'axios'
//注册请求
export function registerRequest(obj){
    let requestUrl=url+'/LoginPage/Register'
    let errmsg
    let post={
        user:obj.user,
        pwd:obj.pwd,
        name:obj.name,
        nname:obj.nname,
        number:obj.phoneNumber,
        gender:obj.gender
    }
    let bool
    axios.post(requestUrl,post).then((res)=>{
        bool=res.data.identify
        errmsg=res.data.errmsg
    }).catch((err)=>{
        console.log(err)
    }).finally(()=>{
        obj.register(bool,errmsg)
    })
}