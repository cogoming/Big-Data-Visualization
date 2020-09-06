<template>
  <div>
    <div style="width: 84rem;background: white;height: 38rem;border-radius: 1rem;display: flex;flex-direction: column">
      <div class="currentTime">
        <div class="Time">{{ Year }}/{{ Month }}/{{ Day }}</div>
        <div class="Time">{{ Hour }}:{{ Min }}:{{ Second }}</div>
      </div>
      <div style="display: flex;flex-direction: row">
        <div class="ele-status">
          <div style="font-size: 2rem;margin: -0.3rem 0.2rem 0 0;margin-left: 0.6rem">电梯运行状态</div>
          <img v-if="direction==0" src="../../../assets/img/stop.svg" alt="停止" class="ele-img">
          <img v-else-if="direction==1" src="../../../assets/img/ele-上升.svg" alt="上升" class="ele-img">
          <img v-else-if="direction==2" src="../../../assets/img/ele-下降.svg" alt="下降" class="ele-img">
          <img v-else-if="direction==3" src="../../../assets/img/ele-上升.svg" alt="上升" class="ele-img-uping">
          <img v-else-if="direction==4" src="../../../assets/img/ele-下降.svg" alt="下降" class="ele-img-downing">
        </div>
        <v-chart :options="elevatorOption" class="ele-cahrt"/>
        <!--        <v-chart :options="userOption" class="ele-cahrt"/>-->
      </div>
    </div>
  </div>
</template>

<script>
import {ElevatorRequest} from '../../../api/HomePage/ApplicationScenarios/Elevator'
import {mapState} from 'vuex'

export default {
  name: "index",
  data() {
    return {
      //电梯运行方向状态码 0停 1上 2下 3上中 4下中
      direction: 0,
      //电梯监测仪表配置项
      elevatorOption: {
        series: [{
          name: '刻度',
          type: 'gauge',
          radius: '90%',
          min: 0,
          max: 4,
          splitNumber: 4, //刻度数量
          startAngle: 220,
          endAngle: -40,
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: [[1, 'rgba(0,0,0,0)']]
            }
          },//仪表盘轴线
          axisLabel: {
            show: true,
            color: 'f',
            distance: 0
          },//刻度标签。
          axisTick: {
            show: true,
            lineStyle: {
              color: '#fff',
              width: 1
            },
            length: -this.$rem(0.5)
          },//刻度样式
          splitLine: {
            show: true,
            length: -this.$rem(0.8),
            lineStyle: {
              color: '#fff'
            }
          },//分隔线样式
          detail: {
            show: false
          },
          pointer: {
            show: false
          }
        },
          {
            type: 'gauge',
            radius: '80%',
            center: ['50%', '50%'],
            splitNumber: 0, //刻度数量
            startAngle: 220,
            endAngle: -40,
            axisLine: {
              show: true,
              lineStyle: {
                width: this.$rem(1),
                color: [
                  [
                    //0.98为控制刻度
                    0.98, new this.$echarts.graphic.LinearGradient(
                      0, 0, 1, 0, [{
                        offset: 0,
                        color: '#ae3df6'
                      },
                        {
                          offset: 1,
                          color: '#53bef9'
                        }
                      ]
                  )
                  ],
                  [
                    1, '#222e7d'
                  ]
                ]
              }
            },
            //分隔线样式。
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {
              show: false
            },
            title: {
              show: true,
              offsetCenter: [0, '-20%'], // x, y，单位px
              textStyle: {
                color: '#b3b1b1',
                fontSize: this.$rem(1.6)
              }
            },
            //仪表盘详情，用于显示数据。
            detail: {
              show: true,
              offsetCenter: [0, this.$rem(1)],
              color: '',
              formatter: function (params) {
                return params + ' F'
              },
              textStyle: {
                fontSize: this.$rem(1.6)
              }
            },
            data: [{
              name: "电梯楼层",
              value: 1
            }]
          }
        ]
      },
      // userOption: {
      //   series: [{
      //     name: '刻度',
      //     type: 'gauge',
      //     radius: '90%',
      //     min: 0,
      //     max: 4,
      //     splitNumber: 4, //刻度数量
      //     startAngle: 220,
      //     endAngle: -40,
      //     axisLine: {
      //       show: true,
      //       lineStyle: {
      //         width: 1,
      //         color: [[1, 'rgba(0,0,0,0)']]
      //       }
      //     },//仪表盘轴线
      //     axisLabel: {
      //       show: true,
      //       color: 'f',
      //       distance: 0
      //     },//刻度标签。
      //     axisTick: {
      //       show: true,
      //       lineStyle: {
      //         color: '#fff',
      //         width: 1
      //       },
      //       length: -this.$rem(0.5)
      //     },//刻度样式
      //     splitLine: {
      //       show: true,
      //       length: -this.$rem(0.8),
      //       lineStyle: {
      //         color: '#fff'
      //       }
      //     },//分隔线样式
      //     detail: {
      //       show: false
      //     },
      //     pointer: {
      //       show: false
      //     }
      //   },
      //     {
      //
      //
      //       type: 'gauge',
      //       radius: '80%',
      //       center: ['50%', '50%'],
      //       splitNumber: 0, //刻度数量
      //       startAngle: 220,
      //       endAngle: -40,
      //       axisLine: {
      //         show: true,
      //         lineStyle: {
      //           width: this.$rem(1),
      //           color: [
      //             [
      //               //0.98为控制刻度
      //               0.98, new this.$echarts.graphic.LinearGradient(
      //                 0, 0, 1, 0, [{
      //                   offset: 0,
      //                   color: '#ae3df6'
      //                 },
      //                   {
      //                     offset: 1,
      //                     color: '#53bef9'
      //                   }
      //                 ]
      //             )
      //             ],
      //             [
      //               1, '#222e7d'
      //             ]
      //           ]
      //         }
      //       },
      //       //分隔线样式。
      //       splitLine: {
      //         show: false,
      //       },
      //       axisLabel: {
      //         show: false
      //       },
      //       axisTick: {
      //         show: false
      //       },
      //       pointer: {
      //         show: false
      //       },
      //       title: {
      //         show: true,
      //         offsetCenter: [0, '-20%'], // x, y，单位px
      //         textStyle: {
      //           color: '#b3b1b1',
      //           fontSize: this.$rem(1.6)
      //         }
      //       },
      //       //仪表盘详情，用于显示数据。
      //       detail: {
      //         show: true,
      //         offsetCenter: [0, this.$rem(1)],
      //         color: '',
      //         formatter: function (params) {
      //           return params + ' F'
      //         },
      //         textStyle: {
      //           fontSize: this.$rem(1.6)
      //         }
      //       },
      //       data: [{
      //         name: "用户楼层",
      //         value: 1
      //       }]
      //     }
      //   ]
      // },
      //时间变量
      Year: "",
      Month: "",
      Day: "",
      Hour: "",
      Min: "",
      Second: "",
      //定时器挂载变量
      delay: null
    }
  },
  methods: {
    //获取当前日期
    setDate() {
      let d = new Date();
      this.Year = d.getFullYear()
      this.Month = d.getMonth() < 9 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1)
      this.Day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate()
      this.Hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours()
      this.Min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()
      this.Second = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds()
    }
  },
  computed: {
    ...mapState(['homePageDelay'])
  },
  watch: {
    //监听请求频率变量变化  并及时重新设置定时器
    homePageDelay: {
      handler() {
        clearInterval(this.delay)
        this.delay = setInterval(() => {
          this.setDate()
          ElevatorRequest(this)
        }, this.homePageDelay)
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    //页面挂载   开启定时器获取楼层和时间
    this.delay = setInterval(() => {
      this.setDate()
      ElevatorRequest(this)
    }, this.homePageDelay)
  }
}
</script>

<style scoped>
.ele-img {
  width: 12rem;
  height: 12rem;
  margin: 1rem 0 0 0.3rem
}

.ele-cahrt {
  height: 26rem;
  width: 26rem
}

.ele-status {
  margin: 3rem 6rem 0 18.8rem;
}

.currentTime {
  display: flex;
  flex-direction: column;
  margin-left: -6rem;
}

.Time {
  display: flex;
  flex-direction: row;
  font-size: 4rem;
  justify-content: center;
}

.ele-img-uping {
  width: 12rem;
  height: 12rem;
  -webkit-animation: uping 1s infinite linear;
  -moz-animation: uping 1s infinite linear;
  -o-animation: uping 1s infinite linear;
}

.ele-img-downing {
  width: 12rem;
  height: 12rem;
  -webkit-animation: downing 1s infinite linear;
  -moz-animation: downing 1s infinite linear;
  -o-animation: downing 1s infinite linear;
}

@-webkit-keyframes uping {
  from {
    margin: 6rem 0 0 0.3rem
  }
  to {
    margin: 0rem 0 0 0.3rem
  }
}

@-moz-keyframes uping {
  from {
    margin: 6rem 0 0 0.3rem
  }
  to {
    margin: 0rem 0 0 0.3rem
  }
}

@-o-keyframes uping {
  from {
    margin: 6rem 0 0 0.3rem
  }
  to {
    margin: 0rem 0 0 0.3rem
  }
}

@-webkit-keyframes downing {
  from {
    margin: 0rem 0 0 0.3rem
  }
  to {
    margin: 6rem 0 0 0.3rem
  }
}

@-moz-keyframes downing {
  from {
    margin: 0rem 0 0 0.3rem
  }
  to {
    margin: 6rem 0 0 0.3rem
  }
}

@-o-keyframes downing {
  from {
    margin: 0rem 0 0 0.3rem
  }
  to {
    margin: 0rem 0 0 0.3rem
  }
}
</style>