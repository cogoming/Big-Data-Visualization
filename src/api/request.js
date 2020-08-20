import axios from 'axios'

// let url = 'http://192.168.1.59:3000'
let url = 'http://localhost'


//首页设备监测模块数据请求
export function deviceMonitoringRequest(obj) {
    let deviceMonitoringRequestUrl = url + '/HomePage/Home/DeviceMonitoring'
    let tempData = Math.floor(Math.random() * 50)
    let humidData = Math.floor(Math.random() * 100)
    let illData = Math.floor(Math.random() * 10000)
    let accData = new Object({
        x: Math.floor(Math.random() * (10)),
        y: Math.floor(Math.random() * (10)),
        z: Math.floor(Math.random() * (10))
    })
    let smokeData = false
    let humanData = false
    axios.get(deviceMonitoringRequestUrl).then((res) => {
        tempData = res.data.temp
        humidData = res.data.hum
        accData = res.data.ac
        illData = res.data.lux
        smokeData = res.data.smog
        humanData = res.data.ray
    }).catch((err) => {
        console.log(err)
    }).finally(() => {
        obj.setDeviceMonitoringOption(tempData, humidData, accData, illData, smokeData, humanData)
    })
}


//首页数据监测数据请求
export function dataMonitoringRequest(obj) {
    let dataMonitoringRequestUrl = url + '/HomePage/Home/DataMonitoring'
    let tempData = [26, 37, 39, 34, 28, 38, 27, 29],
        humidData = [20, 30, 37, 58, 64, 70, 54, 43],
        illData = [3000, 4000, 5000, 3000, 2000, 4000, 7000, 8000]
    let tempDate = ['7.22', '7.22', '7.23', '7.23', '7.24', '7.24', '7.25', '7.25'],
        humidDate = ['7.22', '7.22', '7.23', '7.23', '7.24', '7.24', '7.25', '7.25'],
        illDate = ['7.22', '7.22', '7.23', '7.23', '7.24', '7.24', '7.25', '7.25']
    // let tempData = [],
    //     humidData = [],
    //     illData = [],
    //     tempDate = [],
    //     humidDate = [],
    //     illDate = []
    axios.get(dataMonitoringRequestUrl).then((res) => {
        for (let i = 0; i < res.data.lux_data.length; i++) {
            tempData.push(res.data.temp_data[i].value)
            let t_date = `${res.data.temp_data[i].Time.month}.${res.data.temp_data[i].Time.day}`
            tempDate.push(t_date)

            humidData.push(res.data.hum_data[i].value)
            let h_date = `${res.data.hum_data[i].Time.month}.${res.data.hum_data[i].Time.day}`
            humidDate.push(h_date)

            illData.push(res.data.lux_data[i].value)
            let i_date = `${res.data.lux_data[i].Time.month}.${res.data.lux_data[i].Time.day}`
            illDate.push(i_date)
        }
    }).catch((err) => {
        console.log(err)
    }).finally(() => {
        obj.setDataMonitoringOption(tempDate, tempData, humidDate, humidData, illDate, illData)
    })
}

//首页设备控制模块状态请求
export function deviceControlRequestGet(obj) {

    let deviceControlRequestGetUrl = url + '/HomePage/Home/DeviceControl'
    let buzzerData = false
    let ledData = false
    let electricData = false

    axios.get(deviceControlRequestGetUrl).then((res) => {
        buzzerData = res.data.alarm
        ledData = res.data.led
        electricData = res.data.motor
    }).catch((err) => {
        console.log(err)
    }).finally(() => {
        obj.BuzzerStatus = buzzerData
        obj.LedStatus = ledData
        obj.ElectricStatus = electricData
    })
}

//首页设备控制模块发起控制请求
export function deviceControlRequestPost(obj) {
    let deviceControlRequestPostUrl = url + '/HomePage/Home/DeviceControl'
    axios.post(deviceControlRequestPostUrl, {
        alarm: obj.BuzzerStatus,
        led: obj.LedStatus,
        motor: obj.ElectricStatus
    }).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
}

//首页地图位置数据请求
export function mapRequest(obj, BMapGL) {
    let mapRequestUrl = url + '/HomePage/Home/MapMonitoring'
    let addsData = [new BMapGL.Point(114.40555, 22.707533)],
        idData = [666]

    axios.get(mapRequestUrl).then((res) => {
        for (let i = 0; i < res.data.longitude.length; i++) {
            if (res.data.longitude[i] && res.data.latitude[i] && res.data.Id[i]) {
                addsData.push(new BMapGL.Point(res.data.longitude[i], res.data.latitude[i]))
                idData.push(res.data.Id[i])
            }
        }
    }).catch((err) => {
        console.log(err)
    }).finally(() => {
        obj.adds = addsData
        obj.deviceId = idData
    })
}

//数据分析页  仪表数据可视化获取设备列表
export function getDeviceList(obj) {
    let deviceListRequestUrl = url + ''
    let devieceList = [
        {
            deviceID: '123',
            sensorList: ['温度', '湿度', '光照'],
            disabled: false
        },
        {
            deviceID: '145',
            sensorList: ['温度', '湿度'],
            disabled: false
        },
        {
            deviceID: '136',
            sensorList: ['湿度', '光照'],
            disabled: false
        },
        {
            deviceID: '154',
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
    let SensorDataRequestUrl = url + ''
    let chartData = []
    let id = []
    obj.select.forEach((item) => {
        id.push(item.deviceId)
    })
    let select = {
        sensorType: obj.sensorType,
        deviceId: id,
        startTime: obj.startTime,
        endTime: obj.endTime
    }
    axios.post(SensorDataRequestUrl, select).then((res) => {
        chartData = res.data.dataList
    }).catch((err) => {
        console.log(err)
    }).finally(() => {
        obj.addSeries(chartData)
    })
}


