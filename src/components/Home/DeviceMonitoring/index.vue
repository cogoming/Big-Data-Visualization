<template>
  <div>
    <div class="title">设备监测</div>
    <div class="top-device-container">
      <div class="device-container">
        <div class="top-device-title">温度监测</div>
        <v-chart id="home-temperature-device-monitoring" class="temperature" :options="temperatureOption"/>
      </div>
      <div class="device-container">
        <div class="top-device-title">湿度监测</div>
        <v-chart id="home-humidity-device-monitoring" class="humidity" :options="humidityOption"/>
      </div>
      <div class="device-container">
        <div class="top-device-title">光照监测</div>
        <v-chart id="home-Illumination-device-monitoring" class="illumination" :options="IlluminationOption"/>
      </div>
      <div>
        <div class="top-device-title">人体监测</div>
        <img class="human-icon" v-if="humanStatus" src="../../../assets/img/人red.svg" alt="烟雾"/>
        <img class="human-icon" v-else src="../../../assets/img/人.svg" alt="烟雾"/>
      </div>
    </div>
    <div class="bottom-device-container">
      <div class="bottom-left">
        <div class="bottom-device-title">三轴加速度监测</div>
        <v-chart id="home-Acceleration-device-monitoring" class="acceleration" :options="AccelerationOption"/>
      </div>
      <div class="bottom-right">
        <div class="bottom-device-title">烟雾监测</div>
        <img class="smoke-icon" v-if="smokeStatus" src="../../../assets/img/烟雾red.svg" alt="烟雾"/>
        <img class="smoke-icon" v-else src="../../../assets/img/烟雾.svg" alt="烟雾"/>
      </div>
    </div>
  </div>
</template>
<script>
import 'echarts-liquidfill'
import {deviceMonitoringRequest} from "../../../api/HomePage/Home";
import {mapState} from 'vuex'

export default {
  name: "index",
  data() {
    return {
      //温度仪表配置项   具体参数配置参考eCharts官方配置项手册
      temperatureOption: {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}℃'
        },
        grid: {
          left: 0,
          top: 0,
          bottom: 0,
          right: 0
        },
        series: [
          {
            name: '今日温度',
            type: 'gauge',
            max: 50,
            detail: {
              formatter: ['{value}℃', '{a|今日温度}'].join('\n'),
              fontSize: this.$rem(1),
              width: '100%',
              height: '30%',
              padding: [this.$rem(0), 0, this.$rem(1), 0],
              rich: {
                a: {
                  color: '#cccccc',
                  fontSize: this.$rem(1),
                  padding: [this.$rem(0), 0, this.$rem(-5), 0],
                }
              }
            },
            data: [{value: 30}],
            axisLine: {
              lineStyle: {
                color: [
                  [1, new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0.1,
                      color: "#64d8fd"
                    },
                    {
                      offset: 0.6,
                      color: "#89c2db"
                    },
                    {
                      offset: 1,
                      color: "#fb4770"
                    }
                  ])
                  ]
                ],
                width: this.$rem(0.8)
              }
            },
            splitLine: {
              length: this.$rem(0.8),
              lineStyle: {
                width: this.$rem(0.1)
              }
            },
            axisLabel: {
              distance: this.$rem(-1),
              show: true,
              formatter: function (value) {
                if (value === 0 || value === 50) {
                  return value + '℃'
                }
                return ''
              },
              //   padding: '8 0 0 0'
              lineHeight: this.$rem(-1.5),
              fontSize: this.$rem(1)
            },
            pointer: {
              show: false
            },
            axisTick: {
              show: false
            },

          },
          {
            //进度圆环
            name: '今日温度',
            type: 'pie',
            startAngle: -135,
            clockWise: true,
            radius: ['71%', '72%'],
            itemStyle: {
              normal: {
                label: {
                  show: true
                },
                labelLine: {
                  show: false
                },
              }
            },
            hoverAnimation: false,

            data: [{
              value: 30,
              itemStyle: {
                normal: {
                  color: 'transparent'
                }
              }
            }, {//画中间的图标
              name: "",
              value: 0,
              label: {
                position: 'inside',
                backgroundColor: '#53adf4',
                width: this.$rem(1.33),
                height: this.$rem(1.33),
                borderRadius: this.$rem(1.67),
                borderColor: '#fff',
                borderWidth: this.$rem(0.33),
                padding: this.$rem(0.66)
              }
            }, {
              value: 37,
              name: 'invisible',
              itemStyle: {
                normal: {
                  color: 'transparent', //未完成的圆环的颜色
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  }
                }
              }
            }
            ]
          }
        ]
      },
      //湿度仪表配置项
      humidityOption: {
        title: {
          text: '',
          textStyle: {
            fontWeight: 'normal',
            fontSize: this.$rem(1.25),
            color: 'rgb(97, 142, 205)'
          }
        },
        series: [{
          type: 'liquidFill',
          radius: '45%',
          center: ['50%', '50%'],
          data: [0.4, 0.4, 0.4], // data个数代表波浪数
          backgroundStyle: {
            borderWidth: 1,
            color: 'rgb(255,0,255,0.1)'
          },
          label: {
            normal: {
              formatter: (40 / 100 * 100).toFixed(2) + '%',
              textStyle: {
                fontSize: this.$rem(1.5)
              }
            }
          },
          outline: {
            show: false,
          }
        },
          {
            "type": "pie",
            "center": ["50%", "50%"],
            "radius": ["50%", "52%"],
            "hoverAnimation": false,
            "data": [{
              "name": "",
              "value": 500,
              labelLine: {
                show: false
              },
              itemStyle: {
                color: '#5886f0'
              },
              emphasis: {
                labelLine: {
                  show: false
                },
                itemStyle: {
                  color: '#5886f0'
                },
              }
            },
              { //画中间的图标
                "name": "",
                "value": 4,
                labelLine: {
                  show: false
                },
                itemStyle: {
                  color: '#ffffff',
                  "normal": {
                    "color": "#5886f0",
                    "borderColor": "#5886f0",
                    "borderWidth": this.$rem(1.66),
                    // borderRadius: '100%'
                  },
                },
                label: {

                  borderRadius: '100%'
                },
                emphasis: {
                  labelLine: {
                    show: false
                  },
                  itemStyle: {
                    color: '#5886f0'
                  },
                }

              },
              { // 解决圆点过大后续部分显示明显的问题
                "name": "",
                "value": 4.5,
                labelLine: {
                  show: false
                },
                itemStyle: {
                  color: '#5886f0'
                },
                emphasis: {
                  labelLine: {
                    show: false
                  },
                  itemStyle: {
                    color: '#5886f0'
                  },
                }
              },
              { //画剩余的刻度圆环
                "name": "",
                "value": 88,
                itemStyle: {
                  color: '#050038'
                },
                "label": {
                  show: false
                },
                labelLine: {
                  show: false
                },
                emphasis: {
                  labelLine: {
                    show: false
                  },
                  itemStyle: {
                    color: '#050038'
                  },
                }
              }
            ]
          }

        ]
      },
      //三轴加速度仪表配置项
      AccelerationOption: {
        tooltip: {
          formatter: "{a} <br/>{c} {b}"
        },
        series: [{
          name: 'X',
          type: 'gauge',
          color: ['#f00'],
          min: -30,
          max: 30,
          splitNumber: 10,
          radius: '40%',
          center: ["15%", "55%"],
          axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
              width: this.$rem(0.5),
              color: [
                [0.6, '#64d8fd'],
                [1, '#d9e0e5']
              ]
            },
            backgroundColor: "none"
          },
          tooltip: {
            formatter: function (value) {
              return 'X:' + value + "m/s²";
            }
          },
          pointer: {
            show: true,
            length: this.$rem(5),
            width: this.$rem(0.3)
          },
          axisTick: { // 坐标轴小标记
            length: this.$rem(0.8), // 属性length控制线长
            lineStyle: { // 属性lineStyle控制线条样式
              color: 'auto'
            }
          },
          splitLine: { // 分隔线
            length: this.$rem(0.5), // 属性length控制线长
            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
              color: '#64d8fd',
            }
          },
          axisLabel: {
            borderRadius: 1,
            color: '#64d8fd',
            padding: 1,
            fontSize: this.$rem(0.5)
          },
          title: {
            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            // fontWeight: 'bolder',
            fontSize: this.$rem(0.8),
            fontColor: "black",
            color: "black",
            paddingTop: this.$rem(0.8),
            offsetCenter: [0, '90%']
            // fontStyle: 'italic'
          },
          itemStyle: {
            color: '#1092ff',
          },
          detail: {
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            // borderWidth: 1,
            textBorderColor: '#000',
            textBorderWidth: this.$rem(0.08),
            textShadowBlur: this.$rem(0.1),
            textShadowColor: '#fff',
            textShadowOffsetX: 0,
            textShadowOffsetY: 0,
            paddingTop: this.$rem(0.8),
            fontFamily: 'digital',
            fontSize: this.$rem(1),
            width: 30,
            color: "black",
            rich: {},
            offsetCenter: [0, '65%'],
            formatter: function (value) {
              return (value + 'm/s²');
            }
          },
          data: [{
            value: 6,
            name: 'X轴'
          }]
        },
          {
            name: 'Y轴',
            type: 'gauge',
            color: ['#f00'],
            min: -30,
            max: 30,
            splitNumber: 10,
            radius: '40%',
            center: ["50%", "55%"],
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                width: this.$rem(0.5),
                color: [
                  [0.4, '#64d8fd'],
                  [1, '#d9e0e5']
                ]
              },
              backgroundColor: "none"
            },
            axisTick: { // 坐标轴小标记
              length: this.$rem(0.8), // 属性length控制线长
              lineStyle: { // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              show: true,
              length: this.$rem(5),
              width: this.$rem(0.3)
            },
            tooltip: {
              formatter: (value) => {
                return ('Y:' + value + "m/s²");
              }
            },
            splitLine: { // 分隔线
              length: this.$rem(0.5), // 属性length控制线长
              lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'rgba(255,255,255,0.7)',
              }
            },
            axisLabel: {
              borderRadius: 1,
              color: '#64d8fd',
              padding: 1,
              fontSize: this.$rem(0.5)
            },
            title: {
              fontSize: this.$rem(0.8),
              fontColor: "black",
              color: "black",
              paddingTop: this.$rem(0.8),
              offsetCenter: [0, '90%']
            },
            itemStyle: {
              color: '#1092ff'
            },
            detail: {
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              textBorderColor: '#000',
              textBorderWidth: this.$rem(0.08),
              textShadowBlur: this.$rem(0.1),
              textShadowColor: '#fff',
              textShadowOffsetX: 0,
              textShadowOffsetY: 0,
              paddingTop: this.$rem(0.8),
              fontFamily: 'digital',
              fontSize: this.$rem(1),
              width: 30,
              color: 'black',
              rich: {},
              offsetCenter: [0, '65%'],
              formatter: function (value) {
                return (value + "m/s²");
              }
            },
            data: [{
              value: 4,
              name: 'Y轴'
            }]
          },
          {
            name: 'Z',
            type: 'gauge',
            color: ['#f00'],
            min: -30,
            max: 30,
            splitNumber: 10,
            radius: '40%',
            center: ["85%", "55%"],
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                width: this.$rem(0.5),
                color: [
                  [0.3, '#64d8fd'],
                  [1, '#d9e0e5']
                ]
              },
              backgroundColor: "none"
            },
            axisTick: { // 坐标轴小标记
              length: this.$rem(0.8), // 属性length控制线长
              lineStyle: { // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              show: true,
              length: this.$rem(5),
              width: this.$rem(0.3)
            },
            splitLine: { // 分隔线
              length: this.$rem(0.5), // 属性length控制线长
              lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'rgba(255,255,255,0.7)',
              }
            },
            tooltip: {
              formatter: function (value) {
                return "z:" + value + 'm/s²';
              }
            },
            axisLabel: {
              borderRadius: 1,
              color: '#64d8fd',
              padding: 1,
              fontSize: this.$rem(0.5)
            },
            title: {
              fontSize: this.$rem(0.8),
              fontColor: "black",
              color: "black",
              paddingTop: this.$rem(0.8),
              offsetCenter: [0, '90%']
            },
            itemStyle: {
              color: '#1092ff'
            },
            detail: {
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              textBorderColor: '#000',
              textBorderWidth: this.$rem(0.08),
              textShadowBlur: this.$rem(0.1),
              textShadowColor: '#fff',
              textShadowOffsetX: 0,
              textShadowOffsetY: 0,
              paddingTop: this.$rem(0.8),
              fontFamily: 'digital',
              fontSize: this.$rem(1),
              width: 30,
              color: 'black',
              rich: {},
              offsetCenter: [0, '65%'],
              formatter: function (value) {
                return (value + "m/s²");
              }
            },
            data: [{
              value: 3,
              name: 'Z轴'
            }]
          }
        ]
      },
      //光照强度仪表配置项
      IlluminationOption: {
        tooltip: {
          formatter: "{a}: {c} Lux"
        },
        series: [{
          name: '光照强度',
          type: 'gauge',
          z: 3,
          min: 0,
          max: 10000,
          splitNumber: 10,
          radius: '98%',
          axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
              width: this.$rem(0.3),
              color: [
                [0.22, new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#398def'
                }, {
                  offset: 0.4,
                  color: '#03f9ab'
                }, {
                  offset: 1,
                  color: '#14d8c0'
                }])],
                [0.8, new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: '#398def'
                }, {
                  offset: 0.7,
                  color: '#4d75f3'
                }, {
                  offset: 1,
                  color: '#a456a5'
                }])],
                [1, new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: '#b75094'
                }, {
                  offset: 0.8,
                  color: '#fa3957'
                }, {
                  offset: 1,
                  color: '#a456a5'
                }])]
              ]
            }
          },
          axisTick: { // 坐标轴小标记
            length: this.$rem(0.8), // 属性length控制线长
            lineStyle: { // 属性lineStyle控制线条样式
              color: 'auto',
              width: 2
            }
          },
          axisLabel: {
            color: '#accaff',
            fontSize: this.$rem(0.4)
          },
          splitLine: { // 分隔线
            length: this.$rem(1.2), // 属性length控制线长
            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
              color: 'auto',
              width: 2
            }
          },
          title: {
            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: this.$rem(1),
              fontStyle: 'italic'
            }
          },
          // 指针
          pointer: {
            length: '70%',
            width: '4%'
          },
          detail: {
            formatter: '{value} Lux',
            offsetCenter: [0, '90%'],
            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bold',
              color: '#f2637b',
              fontStyle: 'italic',
              fontSize: this.$rem(1.5)
            }
          },
          data: [{
            value: 40
          }]
        }]

      },
      //烟雾监测报警显示控制变量 红/深蓝  true为红 false为深蓝
      smokeStatus: false,
      //烟雾监测报警状态
      smokeFlag: false,
      //人体监测报警显示控制变量 红/深蓝  true为红 false为深蓝
      humanStatus: false,
      //人体监测报警状态
      humanFlag: false,
      //烟雾监测报警异步定时器挂载变量
      smokeLoop: null,
      //人体监测报警异步定时器挂载变量
      humanLoop: null,
      //异步数据请求定时器挂载变量
      delay: null
    }
  },
  methods: {
    //图表响应式处理（未启用）
    resizeHandle() {
      let myChart1=this.$echarts.init(document.getElementById('home-temperature-device-monitoring'))
      let myChart2=this.$echarts.init(document.getElementById('home-humidity-device-monitoring'))
      let myChart3=this.$echarts.init(document.getElementById('home-Acceleration-device-monitoring'))
      let myChart4=this.$echarts.init(document.getElementById('home-Illumination-device-monitoring'))
      myChart1.resize()
      myChart2.resize()
      myChart3.resize()
      myChart4.resize()
    },
    //首页设备监测图表配置
    setDeviceMonitoringOption(tempData, humidData, accData, illData, smokeData, humanData) {
      this.temperatureOption.series[0].data[0].value = tempData;
      this.temperatureOption.series[1].data[0].value = tempData;
      this.temperatureOption.series[1].data[2].value = 67 - tempData
      this.humidityOption.series[0].data = [humidData / 100, humidData / 100, humidData / 100]
      this.humidityOption.series[0].label.normal.formatter = (humidData / 100 * 100).toFixed(2) + '%'
      this.AccelerationOption.series[0].data[0].value = accData.x
      if (accData.x >= 0) {
        this.AccelerationOption.series[0].axisLine.lineStyle.color[0][0] = 0.5 + accData.x / 60
      } else {
        this.AccelerationOption.series[0].axisLine.lineStyle.color[0][0] = 0.5 - Math.abs(accData.x / 60)
      }
      this.AccelerationOption.series[0].tooltip.formatter = 'X轴:' + accData.x + "m/s²"
      this.AccelerationOption.series[1].data[0].value = accData.y
      if (accData.y >= 0) {
        this.AccelerationOption.series[1].axisLine.lineStyle.color[0][0] = 0.5 + accData.y / 60
      } else {
        this.AccelerationOption.series[1].axisLine.lineStyle.color[0][0] = 0.5 - Math.abs(accData.y / 60)
      }
      this.AccelerationOption.series[1].tooltip.formatter = 'Y轴:' + accData.y + "m/s²"
      this.AccelerationOption.series[2].data[0].value = accData.z
      if (accData.z >= 0) {
        this.AccelerationOption.series[2].axisLine.lineStyle.color[0][0] = 0.5 + accData.z / 60
      } else {
        this.AccelerationOption.series[2].axisLine.lineStyle.color[0][0] = 0.5 - Math.abs(accData.z / 60)
      }
      this.AccelerationOption.series[2].tooltip.formatter = 'Z轴:' + accData.z + "m/s²"
      this.IlluminationOption.series[0].data[0].value = illData
      this.smokeFlag = smokeData
      this.humanFlag = humanData
    }
  },
  computed: {
    ...mapState(['homePageDelay'])
  },
  watch: {
    //监听homePageDelay（数据时延）并及时响应  关闭定时器并重新按时延开启定时器
    homePageDelay: {
      handler() {
        clearInterval(this.delay)
        this.delay = setInterval(() => {
          deviceMonitoringRequest(this)
          this.monitorFlag()
        }, this.homePageDelay)
      },
      immediate: true,
      deep: true
    },
    //监听烟雾报警状态变化  及时作出报警显示  或取消
    //报警效果通过定时器快速切换 红/深蓝 色图标实现
    smokeFlag: {
      handler() {
        if (this.smokeFlag && this.smokeLoop == null) {
          this.smokeLoop = setInterval(() => {
            this.smokeStatus = !this.smokeStatus
          }, 200)
        } else if (!this.smokeFlag) {
          clearInterval(this.smokeLoop)
          this.smokeLoop = null
        }
      },
      immediate: true,
      deep: true
    },
    //监听人体报警状态变化  及时作出报警显示  或取消
    //报警效果通过定时器快速切换 红/深蓝 色图标实现
    humanFlag: {
      handler() {
        if (this.humanFlag && this.humanLoop == null) {
          this.humanLoop = setInterval(() => {
            this.humanStatus = !this.humanStatus
          }, 200)
        } else if (!this.humanFlag) {
          clearInterval(this.humanLoop)
          this.humanLoop = null
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    /*
    * 页面挂载发起一次涉设备状态数据请求并开启定时器
    * */
    deviceMonitoringRequest(this)
    this.delay = setInterval(() => {
      deviceMonitoringRequest(this)
    }, this.homePageDelay)
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    window.addEventListener(resizeEvt, this.resizeHandle, false);
    document.addEventListener('DOMContentLoaded', this.resizeHandle, false);
  },
  beforeDestroy() {
    clearInterval(this.delay)
  }
}
</script>

<style scoped>
.top-device-container {
  display: flex;
  flex-direction: row;
}

.temperature {
  height: 14rem;
  width: 14rem;
  margin: 1rem -1rem 0 -4rem;
}

.humidity {
  height: 19.8rem;
  width: 19.8rem;
  margin: -2.3rem -4rem 0 -6rem;
}

.illumination {
  width: 10.8rem;
  height: 10.8rem;
  margin: 2.4rem 0 0 -1rem;
}

.acceleration {
  height: 26rem;
  width: 43.6rem;
  margin: -8.5rem -0.8rem 0 1rem;
}

.title {
  border-bottom: 0.08rem solid dimgray;
  font-weight: 700;
  margin: 0 0.93rem 0 0.93rem;
  padding: 0.8rem 0 0.5rem 0;
}

.device-container {
  display: flex;
  flex-direction: row;
}

.top-device-title {
  color: dimgray;
  margin: 1rem 0 0 0.93rem;
}

.bottom-device-title {
  color: dimgray;
  margin: -3.8rem 0 0 0.93rem;
}

.bottom-device-container {
  display: flex;
  flex-direction: row;
}

.smoke-icon {
  height: 9rem;
  width: 9rem;
  margin: 1.1rem 0 0 5rem;
}

.human-icon {
  height: 10.5rem;
  width: 10.5rem;
  margin: -0.5rem 0 0 4.5rem;
}
</style>