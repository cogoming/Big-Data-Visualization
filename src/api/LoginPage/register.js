import {url} from '../main'
import axios from 'axios'

export function registerRequest(obj){
    let requestUrl=url+'/LoginPage/Register'
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
    }).catch((err)=>{
        console.log(err)
    }).finally(()=>{
        obj.register(bool)
    })
}