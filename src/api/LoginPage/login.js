import {url} from '../main'
import axios from  'axios'

export function loginRequest(obj){
    let requestUrl=url+'/LoginPage/Login'
    let post={
        user:obj.userName,
        pwd:obj.password
    }
    let bool
    let user={
        id:'',
        gender:'',
        jurisdiction:'',
        name:'',
        nname:'',
        phoneNumber:'',
    }
    axios.post(requestUrl,post).then((res)=>{
        bool=res.data.identify
        user.id=res.data.user
        user.gender=res.data.gender
        user.jurisdiction=res.data.jurisdiction
        user.name=res.data.name
        user.nname=res.data.nname
        user.number=res.data.number
        localStorage.setItem('bdi_iot_token',res.data.token)
        localStorage.setItem('bdi_iot_user',JSON.stringify(user))
    }).catch((err)=>{
        console.log(err)
    }).finally(()=>{
        obj.login(bool)
    })
}