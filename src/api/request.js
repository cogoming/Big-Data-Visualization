import axios from 'axios'

let url = 'http://localhost'

//首页设备监测图表配置
const setDeviceMonitoringOption = (obj, tempData, humidData, accData, illData, smokeData, humanData) => {
    obj.temperatureOption.series[0].data[0].value = tempData;
    obj.temperatureOption.series[1].data[0].value = tempData;
    obj.temperatureOption.series[1].data[2].value = 67 - tempData
    obj.humidityOption.series[0].data = [humidData / 100, humidData / 100, humidData / 100]
    obj.humidityOption.series[0].label.normal.formatter = (humidData / 100 * 100).toFixed(2) + '%'
    obj.AccelerationOption.series[0].data[0].value = accData.x
    if (accData.x >= 0) {
        obj.AccelerationOption.series[0].axisLine.lineStyle.color[0][0] = 0.5 + accData.x / 20
    } else {
        obj.AccelerationOption.series[0].axisLine.lineStyle.color[0][0] = 0.5 - Math.abs(accData.x / 20)
    }
    obj.AccelerationOption.series[0].tooltip.formatter = 'X轴:' + accData.x + "m/s²"
    obj.AccelerationOption.series[1].data[0].value = accData.y
    if (accData.y >= 0) {
        obj.AccelerationOption.series[1].axisLine.lineStyle.color[0][0] = 0.5 + accData.y / 20
    } else {
        obj.AccelerationOption.series[1].axisLine.lineStyle.color[0][0] = 0.5 - Math.abs(accData.x / 20)
    }
    obj.AccelerationOption.series[1].tooltip.formatter = 'Y轴:' + accData.y + "m/s²"
    obj.AccelerationOption.series[2].data[0].value = accData.z
    if (accData.z >= 0) {
        obj.AccelerationOption.series[2].axisLine.lineStyle.color[0][0] = 0.5 + accData.z / 20
    } else {
        obj.AccelerationOption.series[2].axisLine.lineStyle.color[0][0] = 0.5 - Math.abs(accData.x / 20)
    }
    obj.AccelerationOption.series[2].tooltip.formatter = 'Z轴:' + accData.z + "m/s²"
    obj.IlluminationOption.series[0].data[0].value = illData
    obj.smokeFlag = smokeData
    obj.humanFlag = humanData
}

//首页设备监测模块数据请求
export function deviceMonitoringRequest(obj) {
    let deviceMonitoringRequestUrl = url + '/HomePage/Home/DeviceMonitorring'
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
        tempData = res.data.temperature
        humidData = res.data.humidity
        accData = res.data.accelerate
        illData = res.data.illumination
        smokeData = res.data.smog
        humanData = res.data.ray
    }).catch((err) => {
        console.log(err)
    }).finally(() => {
        setDeviceMonitoringOption(obj, tempData, humidData, accData, illData, smokeData, humanData)
    })
}

//首页数据监测图表配置
function setDataMonitoringOption(obj, tempDate, tempData, humidDate, humidData, illDate, illData) {
    obj.temperatureOption.xAxis[0].data = tempDate
    obj.temperatureOption.series[0].data = tempData
    obj.humidityOption.xAxis[0].data = humidDate
    obj.humidityOption.series[0].data = humidData
    obj.IlluminationOption.xAxis[0].data = illDate
    obj.IlluminationOption.series[0].data = illData
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
    axios.get(dataMonitoringRequestUrl).then((res) => {
        for (let i = 0; i < res.data.temperature_data.length; i++) {
            tempData.push(res.data.temperature_data.value)
            let t_date = `${res.data.temperature_data.time.month}.${res.data.temperature_data.time.day}`
            tempDate.push(t_date)

            humidData.push(res.data.humidity_data.value)
            let h_date = `${res.data.humidity_data.time.month}.${res.data.humidity_data.time.day}`
            humidDate.push(h_date)

            illData.push(res.data.illumination_data.value)
            let i_date = `${res.data.illumination_data.time.month}.${res.data.illumination_data.time.day}`
            illDate.push(i_date)
        }
    }).catch((err) => {
        console.log(err)
    }).finally(() => {
        setDataMonitoringOption(obj, tempDate, tempData, humidDate, humidData, illDate, illData)
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
            addsData.push(new BMapGL.Point(res.data.longitude[i], res.data.latitude[i]))
            idData.push(res.data.id[i])
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
            device: '123',
            sensorList: ['温度', '湿度', '光照'],
            disabled: false
        },
        {
            device: '145',
            sensorList: ['温度', '湿度'],
            disabled: false
        },
        {
            device: '136',
            sensorList: ['湿度', '光照'],
            disabled: false
        },
        {
            device: '154',
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

//数据分析也  仪表数据可视化  获取数据绘制图表
export function getSensorData(obj) {
    let colorList=['#0872ea','red','orange','pink','#9272A3']
    let SensorDataRequestUrl = url + ''
    let chartData = []
    let select={
        sensorType:obj.sensorType,
        deviceId:[],
        date:obj.dateValue
    }
    for (let item in obj.select){
        select.deviceId.push(item.deviceId)
    }
    axios.post(SensorDataRequestUrl,select).then((res) => {
        chartData = res.data.chartData
    }).catch((err) => {
        console.log(err)
    }).finally(() => {
        obj.chartOption.series = []
        for (let i=0;i<chartData.length;i++) {
            obj.chartOption.series.push(
                {
                    name: chartData[i].id,
                    type: 'line',
                    smooth: true, //是否平滑
                    showAllSymbol: true,
                    symbol: 'circle',
                    showSymbol: false,
                    symbolSize: this.$rem(0.1),
                    lineStyle: {
                        normal: {
                            color: colorList[i],
                            shadowColor: colorList[i],
                            shadowBlur: 0,
                            shadowOffsetY: 0,
                            shadowOffsetX: 0,
                            width: this.$rem(0.12)
                        },
                    },
                    label: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: colorList[i],
                            fontSize: this.$rem(0.7)
                        }
                    },

                    itemStyle: {
                        color: colorList[i],
                    },
                    tooltip: {
                        show: true,
                    },
                    data: chartData[i].data,
                }
            )
            obj.chartOption.xAxis[0].data=chartData[i].date
        }
    })
}


