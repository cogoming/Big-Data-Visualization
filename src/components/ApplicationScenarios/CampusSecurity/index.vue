<template>
  <div>
    <div class="s_all">
      <div class="top">
        <Card
            v-for=" (item,index) in cards"
            :key="index"
            :num="item.num"
            :decimals="item.decimals"
            :num-style="item.numStyle"
            :name="item.name"
            :cardStyle="cardStyle"
            :chartSrc="item.chartSrc"
        />
      </div>
      <div class="bottom">
        <Message class="msg"/>
        <div class="bottom-right">
          <div class="bottom-right-top">
            <Video class="video"/>
            <Position class="position"/>
          </div>
          <Chart class="chart" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from './card/index'
import Chart from './chart/index'
import Message from './message/index'
import Position from './position/index'
import Video from './video/index'
import {getData} from "@/api/ApplicationScenarios/CampusSecurity";


export default {
  name: "index",
  components:{
    Card,Message,Chart,Position,Video
  },
  data(){
    return{
      //顶部卡片样式
      //upSrc  上升图标地址  downSrc下降图表地址   upColor上升文字颜色  downColor下降文字颜色
      cardStyle:{
        upSrc:require('../../../assets/img/上升.svg'),
        downSrc:require('../../../assets/img/下降.svg'),
        upColor:'color:#FF4141',
        downColor:'color:#3CC480'
      },
      //顶部卡片样式
      //name标题  num 显示数字 decimals显示小数  numStyle数字颜色   chartSrc图表图片地址
      cards:[
        {
          name:'今日预警',
          num:8,
          decimals:13.8,
          numStyle:'color:#56D9FE;',
          chartSrc:require('../../../assets/img/Chart blue.svg')
        },
        {
          name:'本周预警',
          num:15,
          decimals:-5.8,
          numStyle:'color:#A3A0FB;',
          chartSrc:require('../../../assets/img/Chart purple.svg')
        },
        {
          name:'本月预警',
          num:21,
          decimals:13.8,
          numStyle:'color:#4AD991;',
          chartSrc:require('../../../assets/img/Chart green.svg')
        }
      ],
    }
  },
  //获取顶部数据分析信息
  mounted() {
    getData(this)
  }
}
</script>

<style scoped>
.s_all {
  display: flex;
  flex-direction: column;
}

.top {
  display: flex;
  flex-direction: row;
}

.bottom {
  display: flex;
  flex-direction: row;
}
.bottom-right{
  display: flex;
  flex-direction: column;
}
.bottom-right-top{
  display: flex;
  flex-direction: row;
  margin-bottom: 1.35rem;
}
.msg{
  height:47.73rem ;
  width: 32.27rem;
  background: white;
  margin: 0 1.35rem 0 0;
}
.video{
  width: 27.28rem;
  height: 26rem;
  margin: 0 0.95rem 0 0;
  background: white;
}
.position{
  height: 26rem;
  width: 22.01rem;
  background: white;
}
.chart{
  height: 20.38rem;
  width: 50.24rem;
  background: white;
}
</style>