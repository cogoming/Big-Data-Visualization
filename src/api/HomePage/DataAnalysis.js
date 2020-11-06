import axios from "axios";
import {url} from "@/api/main";

//数据分析页  仪表数据可视化获取设备列表
export function getDeviceList(obj) {
    let deviceListRequestUrl = url + '/HomePage/DataAnalysis/SensingData'
    let devieceList = [
        {
            DeviceID: '123',
            sensorList: ['温度', '湿度', '光照'],
            disabled: false
        },
        {
            DeviceID: '145',
            sensorList: ['温度', '湿度'],
            disabled: false
        },
        {
            DeviceID: '136',
            sensorList: ['湿度', '光照'],
            disabled: false
        },
        {
            DeviceID: '154',
            sensorList: ['温度', '光照'],
            disabled: false
        }
    ]

    axios.get(deviceListRequestUrl).then((res) => {
        devieceList = res.data.deviceList
    }).catch((err) => {
        console.log(err)
    }).finally(() => {
        obj.deviceList = devieceList
    })

}

//数据分析页  仪表数据可视化  获取数据绘制图表
export function getSensorData(obj) {
    let SensorDataRequestUrl = url + '/HomePage/DataAnalysis/SensingData'
    let chartData = []
    let id = []
    obj.select.forEach((item) => {
        id.push(item.deviceId)
    })
    let tep,max
    switch (obj.sensorType) {
        case '温度':
            tep = 'temp';
            break
        case '湿度':
            tep = 'hum';
            break
        case '光照':
            tep = 'lux';
            break
    }
    let select = {
        sensorType: tep,
        deviceId: id,
        startTime: obj.startTime,
        endTime: obj.endTime
    }
    axios.post(SensorDataRequestUrl, select).then((res) => {
        chartData = res.data.dataList
        max=res.data.max
    }).catch((err) => {
        console.log(err)
    }).finally(() => {
        obj.chartOption.series=[]
        obj.addSeries(chartData,max)
        console.log(select)
    })
}

export function trajRequest(obj){
    let requestUrl=url+'/HomePage/DataAnalysis/TrajectoryData'
    let data
    axios.get(requestUrl).then((res)=>{
        data=res.data.path
    }).catch((err)=>{
        console.log(err)
    }).finally(()=>{
        obj.mapInit(data)
    })
}