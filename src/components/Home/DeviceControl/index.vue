<template>
  <div class="device-control">
    <div class="device-control-title">设备控制</div>
    <div class="device-control-container" style="margin: 1.5rem 0 0 0;">
      <img class="device-icon-buzzer" src="../../../assets/img/蜂鸣器响.svg" alt="蜂鸣器控制"/>
      <div class="switch-container">
        <div class="device-name">蜂鸣器控制</div>
        <el-switch :width="this.$rem(2)" @change="control" class="device-switch" style="display: block;"
                   v-model="BuzzerStatus" active-color="#13ce66" inactive-color="#ff4949" active-text="ON"
                   inactive-text="OFF" :disabled="sw1"></el-switch>
      </div>
    </div>
    <div class="device-control-container">
      <img class="device-icon-led" src="../../../assets/img/LED.svg" alt="LED控制"/>
      <div class="switch-container">
        <div class="device-name">L E D 控制</div>
        <el-switch :width="this.$rem(2)" @change="control" class="device-switch" style="display: block"
                   v-model="LedStatus" active-color="#13ce66" inactive-color="#ff4949" active-text="ON"
                   inactive-text="OFF" :disabled="sw2"></el-switch>
      </div>
    </div>
    <div class="device-control-container">
      <img class="device-icon-electric" src="../../../assets/img/电机.svg" alt="电机控制">
      <div class="switch-container">
        <div class="device-name">电 机 控 制</div>
        <el-switch :width="this.$rem(2)" @change="control" class="device-switch"
                   style="display: block;margin-left:1.8rem" v-model="ElectricStatus" active-color="#13ce66"
                   inactive-color="#ff4949" active-text="ON" inactive-text="OFF" :disabled="sw3"></el-switch>
      </div>
    </div>
  </div>
</template>
<script>
import {deviceControlRequestGet, deviceControlRequestPost} from '../../../api/HomePage/Home'
import {mapState} from 'vuex'

export default {
  name: "index",
  data() {
    return {
      //蜂鸣器状态变量   true为开  false为关下同
      BuzzerStatus: false,
      //LED状态变量
      LedStatus: false,
      //电机状态变量
      ElectricStatus: false,
      //异步数据请求定时器挂载变量
      delay: null,
      sw1: true,
      sw2: true,
      sw3: true,
      jurisdiction: JSON.parse(localStorage.getItem('bdi_iot_user')).jurisdiction
    }
  },
  computed: {
    ...mapState(['homePageDelay'])  //Vuex引入homePageDelay（数据时延）变量
  },
  methods: {
    //发起设备控制请求方法
    control() {
      deviceControlRequestPost(this)
    }
  },
  watch: {
    //监听homePageDelay（数据时延）并及时响应  关闭定时器并重新按时延开启定时器
    homePageDelay: {
      handler() {
        clearInterval(this.delay)
        this.delay = setInterval(() => {
          deviceControlRequestGet(this)
        }, this.homePageDelay)
      },
      immediate: true,
      deep: true
    }
  },
  beforeDestroy() {
    clearInterval(this.delay)
  },
  mounted() {
    /*
    * 页面挂载发起一次涉设备状态数据请求并开启定时器
    * */
    deviceControlRequestGet(this)
    this.delay = setInterval(() => {
      deviceControlRequestGet(this)
    }, this.homePageDelay)
    console.log(this.jurisdiction)
    if (this.jurisdiction == 0) {
      this.sw1 = false
      this.sw2 = false
      this.sw3 = false
    }
  }
}
</script>
<style lang="less" scoped>
.device-control-title {
  border-bottom: 0.08rem solid dimgray;
  font-weight: 700;
  margin: 0 0.93rem 0 0.93rem;
  padding: 0.8rem 0 0.5rem 0;
}

.device-name {
  margin: 0 0 0 0.93rem;
  font-size: 1.5rem;
  color: dimgray;
}

.device-name:hover {
  color: black;
}

.device-control-container {
  display: flex;
  flex-direction: row;
  margin: 1rem 0 1rem 0;
}

.device-icon-buzzer {
  width: 6rem;
  height: 6rem;
  margin: -1.3rem -1.86rem 0 1.8rem;
}

.device-icon-led {
  width: 4.7rem;
  height: 4.7rem;
  margin: -0.7rem -1.2rem 0 2.5rem;
}

.device-icon-electric {
  width: 6.2rem;
  height: 6.2rem;
  margin: -1.7rem -2.1rem 0 1.7rem
}

.switch-container {
  display: flex;
  flex-direction: column;
  margin: 0 0 0 1.86rem;
}

.device-switch {
  margin: 0.4rem 0 0 1.5rem;

}


</style>