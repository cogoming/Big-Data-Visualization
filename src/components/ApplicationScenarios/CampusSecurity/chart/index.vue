<template>
  <div>
    <div class="chart-all">
      <div class="chart-top">
        <div class="chart-title">预警数量</div>
        <div class="chart-tab">
          <div class="chart-tab-text" ref="year" @click="yearReq">最近一年</div>
          <div class="chart-tab-text" ref="month" @click="monthReq">最近一个月</div>
          <div class="chart-tab-text" ref="week" @click="weekReq" style="border: none">最近一周</div>
        </div>
      </div>
      <v-chart id="chart-echart" :options="warningOption"/>
    </div>
  </div>
</template>

<script>
import {weekRequest,monthRequest,yearRequest} from "@/api/ApplicationScenarios/CampusSecurity";

export default {
  name: "index",
  data(){
    return{
      //预警折线图配置项
      warningOption:{
        tooltip: {
          trigger: 'axis',
          formatter: '{b}<br />{a}: {c}个',
          axisPointer: {
            lineStyle: {
              color:"#54D8FF"
            },
          },
        },
        xAxis: [{
          name:'日期',
          type: 'category',
          splitNumber:6,
          nameTextStyle: {
            color: '#A1A0AE',
            fontSize: this.$rem(0.7),
            grid:{
              x:this.$rem(1)
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#EFF3F6',
            }
          },
          axisTick:{
            show:false
          },
          splitArea: {
            color: '#f00',
            lineStyle: {
              color: '#f00'
            },
          },
          axisLabel: {
            lineStyle: {
              color: '#EFF3F6',
            },
            textStyle: {
              color:'#A1A0AE',
              fontSize:this.$rem(0.7)
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#EFF3F6'
            }
          },
          boundaryGap: false,
          data: ['周日','周一','周二','周三','周四','周五','周六'],

        }],

        yAxis: [{
          name:'数量/ 个',
          splitNumber:5,
          max:10,
          min:0,
          nameTextStyle: {
            color: "#A1A0AE",
            fontSize: this.$rem(0.8)
          },
          type: 'value',
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
            margin: 20,
            textStyle: {
              color:'#A1A0AE',
              fontSize:this.$rem(0.7)
            }
          },
          axisTick: {
            show: false,
          },
        }],
        series: [{
          name: '预警数量',
          type: 'line',
          smooth: true,
          showAllSymbol: true,
          symbol: 'circle',
          symbolSize: this.$rem(0.5),
          lineStyle: {
            normal: {
              color: "#54D8FF",
            },
          },
          itemStyle: {
            color: "#fff",
            borderColor: "#54D8FF",
            borderWidth: this.$rem(0.2),
          },
          tooltip: {
            show: true
          },
          areaStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(84,216,255,1)'
              },
                {
                  offset: 1,
                  color: 'rgba(255,255,255,0)'
                }
              ], false),
            }
          },
          data: [6,1,5,3,5,2,2]
        }]
      }
    }
  },
  methods:{
    //将所有选项文字变为未选中颜色
    notActive(){
      this.$refs.year.style.color='#A0A0AD'
      this.$refs.month.style.color='#A0A0AD'
      this.$refs.week.style.color='#A0A0AD'
    },
    weekReq(){
      weekRequest(this)
    },
    monthReq(){
      monthRequest(this)
    },
    yearReq(){
      yearRequest(this)
    },
    //制作点击效果
    //先将所有选项文字变为未选中颜色  再把选中的选项文字变为选中效果的颜色
    year(data){
      this.notActive()
      this.$refs.year.style.color='#4C5566'
      this.setChart(data)
    },
    month(data){
      this.notActive()
      this.$refs.month.style.color='#4C5566'
      this.setChart(data)
      this.warningOption.xAxis[0].axisLabel.interval=4
    },
    week(data){
      this.notActive()
      this.$refs.week.style.color='#4C5566'
      this.setChart(data)
    },
    setChart(data){
      this.warningOption.xAxis[0].axisLabel.interval=0
      this.warningOption.yAxis[0].max=data.max
      this.warningOption.xAxis[0].data.length=0
      this.warningOption.xAxis[0].data=data.time
      this.warningOption.series[0].data.length=0
      this.warningOption.series[0].data=data.value
    },
    //监听窗口变化后执行图标初始化
    resizeHandle(){
      let myChart1=this.$echarts.init(document.getElementById('chart-echart'))
      myChart1.resize()
    }
  },
  mounted() {
    //页面挂载默认选中这一周的数据
    this.weekReq()
    //监听窗口变化后执行图标初始化
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    window.addEventListener(resizeEvt, this.resizeHandle, false);
    document.addEventListener('DOMContentLoaded', this.resizeHandle, false);
  }
}
</script>

<style scoped>
.chart-all {
  margin: 1.14rem 0.3rem 1rem 1.68rem;
}

.chart-top {
  display: flex;
  flex-direction: row;
}

.chart-title {
  font-size: 1.21rem;
  color: #4D4F5C;
  font-weight: 400;
}

.chart-tab {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin: 0 0.5rem 0 30.5rem;
}

.chart-tab-text {
  font-size: 0.81rem;
  color: #A0A0AD;
  padding: 0 0.2rem 0 0.3rem;
  border-right: 0.03rem solid #A0A0AD;
}
#chart-echart{
  width: 53.6rem;
  height: 18rem;
  margin: 0 1rem 1rem -3rem;
}

</style>