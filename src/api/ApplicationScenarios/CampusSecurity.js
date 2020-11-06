import {url} from '../main'
import axios from 'axios'

//获取分析数据
export function getData(obj){
    let reqUrl=url+'/HomePage/ApplicationScenarios/CampusSecurity/DataVisual'
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
//获取对应日期的预警列表
export function getWarningList(obj,time){
    let reqUrl=url+'/HomePage/ApplicationScenarios/CampusSecurity/WarningList'
    let data={time}
    axios.post(reqUrl,data).then((res)=>{
        obj.setWarningList(res.data.warningList)
    }).catch((err)=>{
        console.log(err)
    })
}
//获取重要预警列表
export function getImportantWarningList(obj){
    let reqUrl=url+'/HomePage/ApplicationScenarios/CampusSecurity/ImportantWarningList'
    axios.get(reqUrl).then((res)=>{
        obj.setImportantWarning(res.data.importantWarningList)
    }).catch((err)=>{
        console.log(err)
    })
}
//添加重要预警
export function addImportantWarning(time,index,obj){
    let reqUrl=url+'/HomePage/ApplicationScenarios/CampusSecurity/ImportantWarningList/Add'
    let data={time,index}
    axios.post(reqUrl,data).then((res)=>{
        if(res.data.identify){
            alert('添加成功!')
            getWarningList(obj,obj.time)
        }else{
            alert(res.data.errmsg)
        }
    }).catch((err)=>{
        console.log(err)
    })
}
//删除重要预警
export function delImportantWarning(index,obj){
    let reqUrl=url+'/HomePage/ApplicationScenarios/CampusSecurity/ImportantWarningList/Del'
    let data={index}
    axios.post(reqUrl,data).then((res)=>{
        if(res.data.identify){
            alert('删除成功!')
            getImportantWarningList(obj)
        }else{
            alert(res.data.errmsg)
        }
    }).catch((err)=>{
        console.log(err)
    })
}

//最近一周统计图
export function weekRequest(obj){
    let reqUrl=url+'/HomePage/ApplicationScenarios/CampusSecurity/Chart/Week'
    let data
    axios.get(reqUrl).then((res)=>{
        data=res.data
    }).catch((err)=>{
        console.log(err)
    }).finally(()=>{
        obj.week(data)
    })
}

//最近一月统计图
export function monthRequest(obj){
    let reqUrl=url+'/HomePage/ApplicationScenarios/CampusSecurity/Chart/Month'
    let data
    axios.get(reqUrl).then((res)=>{
        data=res.data
    }).catch((err)=>{
        console.log(err)
    }).finally(()=>{
        obj.month(data)
    })
}

//最近一年统计图
export function yearRequest(obj){
    let reqUrl=url+'/HomePage/ApplicationScenarios/CampusSecurity/Chart/Year'
    let data
    axios.get(reqUrl).then((res)=>{
        data=res.data
    }).catch((err)=>{
        console.log(err)
    }).finally(()=>{
        obj.year(data)
    })
}