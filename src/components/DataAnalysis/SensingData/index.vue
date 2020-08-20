<template>
  <div>
    <div class="top-view">
      <div class="selector-container">
        <div class="group-selector" v-for="group in select" :key="group.index">
          <div class="selector">
            <div class="index">{{ group.index }}</div>
            <div class="selector-tittle">传感器类型：</div>
            <el-select
                class="picker"
                v-model="sensorType">
              <el-option
                  class="picker"
                  v-for="item in sensorList"
                  :key="item.index"
                  :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="selector">
            <div class="selector-tittle">设备节点：</div>
            <el-select
                class="picker"
                v-model="group.deviceId">
              <el-option
                  class="picker"
                  v-for="item in deviceList"
                  :key="item.index"
                  :value="item.deviceID"
                  :disabled="item.disabled">
              </el-option>
            </el-select>
          </div>
          <div class="selector">
            <div class="selector-tittle">时间范围：</div>
            <el-date-picker
                class="date-picker"
                v-model="dateValue"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :picker-options="datePickerOptions"
            >
            </el-date-picker>
          </div>
        </div>
      </div>
      <button class="query" @click="getData">查询</button>
      <button class="add" @click="add">+</button>
      <button class="add" @click="sub">-</button>
    </div>
    <div class="bottom-view">
      <v-chart id="data-chart" :options="chartOption"/>
    </div>
  </div>
</template>

<script>
import {getDeviceList, getSensorData} from '../../../api/request'

export default {
  name: "index",
  data() {
    return {
      //设备列表 待请求数据赋值
      //数据结构：
      // {
      //   deviceID: '123',
      //   sensorList: ['温度', '湿度', '光照'],
      //   disabled: false
      // }
      deviceList: [],
      //选择的设备
      select: [
        {
          index: 1,
          deviceId: '',
        }
      ],
      //可选择的传感器类型
      sensorList: ['温度', '湿度', '光照'],
      //选择的传感器类型
      sensorType: '',
      //日期挂载变量
      dateValue: '',
      startTime: {
        year: '',
        month: '',
        day: ''
      },
      endTime: {
        year: '',
        month: '',
        day: ''
      },
      //日期选择器配置项
      datePickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      //数据图表配置项
      chartOption: {
        title: {
          text: '',
          textStyle: {
            align: 'center',
            color: '#54D8FF',
            fontSize: this.$rem(1),
            fontWeight: this.$rem(25)
          },
          top: '0%',
          left: 'center',
        },
        legend: {
          icon: 'circle',
          top: '5%',
          right: '10%',
          itemWidth: 6,
          itemGap: 20,
          textStyle: {
            fontSize: this.$rem(0.8),
            color: '#556677'
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}<br />{a}: {c} ℃',
          axisPointer: {
            lineStyle: {
              color: "#54D8FF"
            },
          },
        },
        grid: {
          top: '15%',
          left: '5%',
          right: '9%',
          bottom: '15%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          name: '日期',
          splitNumber: 8,
          nameTextStyle: {
            color: '#A1A0AE',
            fontSize: this.$rem(0.7),
            grid: {
              x: this.$rem(1)
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#EFF3F6',
            }
          },
          splitArea: {
            color: '#f00',
            lineStyle: {
              color: '#f00'
            },
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            lineStyle: {
              color: '#EFF3F6',
            },
            textStyle: {
              color: '#A1A0AE',
              fontSize: this.$rem(0.7)
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#EFF3F6'
            }
          },
          boundaryGap: false,
          data: [],

        }],

        yAxis: [{
          type: 'value',
          name: '',
          nameTextStyle: {
            color: "#A1A0AE",
            fontSize: this.$rem(0.8)
          },
          min: null,
          max: null,
          splitNumber: 5,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#EFF3F6'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#EFF3F6'
            }
          },
          axisLabel: {
            show: true,
            margin: this.$rem(0.8),
            textStyle: {
              color: '#A1A0AE',
              fontSize: this.$rem(0.7)
            }
          },
          axisTick: {
            show: false,
          },
        },],
        series: []
      }
    }
  },
  methods: {
    //增加设备选择器
    add() {
      if (this.select.length >= 5) {
        alert('最多只能选择五个!')
      } else {
        this.select.push({index: this.select.length + 1, deviceId: ''})
      }
    },
    //减少设备选择器
    sub() {
      if (this.select.length <= 1) {
        alert('最少保留一个!')
      } else {
        this.select.pop()
      }
    },
    getData() {
      getSensorData(this)
    },
    resizeHandle() {
      let myChart1 = this.$echarts.init(document.getElementById('data-chart'))
      myChart1.resize()
    },
    addSeries(chartData) {
      let colorList = ['#54D8FF', 'red', 'orange', 'pink', '#9272A3']
      this.chartOption.series = []
      for (let i = 0; i < chartData.length; i++) {
        let _data = [],
            _date = []
        chartData[i].data.forEach((item) => {
          _data.push(item.value)
          _date.push(item.Time.month + '.' + item.Time.day)
        })
        this.chartOption.series.push(
            {
              name: chartData[i].deviceId,
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
              data: _data
            }
        )
        this.chartOption.xAxis[0].data = _date
      }
    }
  },
  watch: {
    //监听传感器类型并及时禁止选择无此传感器的设备
    sensorType: {
      handler(newValue) {
        console.log(this.dateValue)
        for (let i = 0; i < this.deviceList.length; i++) {
          if (this.deviceList[i].sensorList.includes(newValue)) {
            this.deviceList[i].disabled = false
          } else {
            this.deviceList[i].disabled = true
          }
        }
        if (newValue == '温度') {
          this.chartOption.yAxis[0].name = '温度/ ℃'
          this.chartOption.yAxis[0].min = 0
          this.chartOption.yAxis[0].max = 50
          this.chartOption.yAxis[0].splitNumber = 5
          this.chartOption.tooltip.formatter = '{b}<br />{a}: {c} ℃'
        } else if (newValue == '湿度') {
          this.chartOption.yAxis[0].name = '湿度/ %'
          this.chartOption.yAxis[0].min = 0
          this.chartOption.yAxis[0].max = 100
          this.chartOption.yAxis[0].splitNumber = 5
          this.chartOption.tooltip.formatter = '{b}<br />{a}: {c} %'
        } else if (newValue == '光照') {
          this.chartOption.yAxis[0].name = '光照/ Lux'
          this.chartOption.yAxis[0].min = 0
          this.chartOption.yAxis[0].max = 10000
          this.chartOption.yAxis[0].splitNumber = 5
          this.chartOption.tooltip.formatter = '{b}<br />{a}: {c} Lux'
        }
      },
      immediate: true
    },
    dateValue: {
      handler(newValue) {

        let start = newValue[0].split('-')
        let end = newValue[1].split('-')

        this.startTime.year = start[0]
        this.startTime.month = start[1]
        this.startTime.day = start[2]

        this.endTime.year = end[0]
        this.endTime.month = end[1]
        this.endTime.day = end[2]

      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    //页面挂载即请求设备列表数据
    getDeviceList(this)
    var resizeEvt1 = 'orientationchange' in window ? 'orientationchange' : 'resize'
    window.addEventListener(resizeEvt1, this.resizeHandle, false);
    document.addEventListener('DOMContentLoaded', this.resizeHandle, false);

  }
}
</script>

<style lang="less" scoped>
.top-view {
  display: flex;
  flex-direction: row;
}

.selector-container {
  display: flex;
  flex-direction: column;
  margin: 0 0 0 2rem;
}

.group-selector {
  display: flex;
  flex-direction: row;
}

.selector {
  display: flex;
  flex-direction: row;
  margin: 2rem 2rem 0 1rem;
  align-items: center;
}

.selector-tittle {
  margin: 0 0 0 0;
}

.add {
  border-radius: 100%;
  background: #1890ff;
  color: white;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  padding: 0;
  margin: 2rem 1rem 0 0.5rem;
  border: #1890ff;
}

.index {
  border-radius: 100%;
  background: #1890ff;
  color: white;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  padding: 0;
  margin: 0 1rem 0 0;
}

#data-chart {
  height: 36rem;
  width: 80rem;
  margin: 0 0 0 1rem;
}

.query {
  height: 2rem;
  width: 4rem;
  display: flex;
  border: none;
  background: #1890ff;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.1rem;
  border-radius: 0.5rem;
  margin: 2rem 1rem 0 0;
}

.picker {
  width: 10rem;
}

.date-picker {
  .el-input__inner {
    width: 5rem;
    height: 2rem;
  }
}
</style>