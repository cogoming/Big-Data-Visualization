import {url} from '../main'
import axios from 'axios'

export function getData(obj){
    let reqUrl=url+'/HomePage/ApplicationScenarios/CampusSecurity/DataViusal'
    axios.get(reqUrl).then((res)=>{
        let data=res.data
        obj.cards[0].num=data.todayNum
        obj.cards[0].decimals=data.todayPercent
        obj.cards[1].num=data.weekNum
        obj.cards[1].decimals=data.weekPercent
        obj.cards[2].num=data.monthNum
        obj.cards[2].decimals=data.monthPercent
    }).catch((err)=>{
        console.log(err)
    })
}
export function getWarningList(obj,time){
    let reqUrl=url+'/HomePage/ApplicationScenarios/CampusSecurity/WarningList'
    let data={time}
    axios.post(reqUrl,data).then((res)=>{
        obj.setWarningList(res.data.warningList)
    }).catch((err)=>{
        console.log(err)
    })
}

export function getImportantWarningList(obj){
    let reqUrl=url+'/HomePage/ApplicationScenarios/CampusSecurity/ImportantWarningList'
    axios.get(reqUrl).then((res)=>{
        obj.setImportantWarning(res.data.importantWarningList)
    }).catch((err)=>{
        console.log(err)
    })
}

export function addImportantWarning(time,index,obj){
    let reqUrl=url+'/HomePage/ApplicationScenarios/CampusSecurity/ImportantWarningList/Add'
    let data={time,index}
    axios.post(reqUrl,data).then((res)=>{
        if(res.data.identify){
            alert('添加成功!')
            getWarningList(obj,obj.time)
        }else{
            alert('添加失败!'+res.data.errmsg)
        }
    }).catch((err)=>{
        console.log(err)
    })
}

export function delImportantWarning(index,obj){
    let reqUrl=url+'/HomePage/ApplicationScenarios/CampusSecurity/ImportantWarningList/Del'
    let data={index}
    axios.post(reqUrl,data).then((res)=>{
        if(res.data.identify){
            alert('删除成功!')
            getImportantWarningList(obj)
        }else{
            alert('删除失败!'+res.data.errmsg)
        }
    }).catch((err)=>{
        console.log(err)
    })
}