<template>
  <div class="all">
    <div class="header-text">
      <div style="font-size: 1.1rem;">欢迎您，{{ userNname }} ! |</div>
      <router-link to="/LoginPage" class="header-text-quit">退出</router-link>
    </div>
    <div class="selector-container">
      <div style="font-size: 1.1rem; margin-top: -0.5rem">数据时延：</div>
      <el-select style="width:7rem;margin-top:-0.6rem" @change="delayChange" v-model="delay">
        <el-option
            v-for="item in delayOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'

export default {
  name: "index",
  data() {
    return {
      userNname: JSON.parse(localStorage.getItem('bdi_iot_user')).nname,
      //时延变量
      delay: this.$store.state.homePageDelay,
      //数据时延选择器配置
      delayOptions: [
        {
          label: '1s',
          value: 1000
        },
        {
          label: '3s',
          value: 3000
        },
        {
          label: '5s',
          value: 5000
        },
        {
          label: '10s',
          value: 10000
        },
        {
          label: '24h',
          value: 24 * 60 * 60 * 1000
        }
      ]
    }
  },
  computed: {
    ...mapState(['homePageDelay', 'user']) //Vuex引入homePageDelay（数据时延）变量
  },
  methods: {
    ...mapMutations(['setHomePageDelay']), //Vuex引入homePageDelay（数据时延）变量更改方法
    //选择时延后设置并强制渲染
    delayChange() {
      this.setHomePageDelay(this.delay)
      this.$forceUpdate()
    },
    quit() {
      localStorage.removeItem('bdi_iot_token')
      localStorage.removeItem('bdi_iot_user')
      this.$router.push('/LoginPage')
    }
  }
}
</script>
<style scoped lang="less">

.header-text {
  margin: -0.5rem 0 0 2.3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.all {
  display: flex;
  flex-direction: row;
}

.selector-container {
  display: flex;
  flex-direction: row;
  width: 76.6%;
  justify-content: flex-end;
  align-items: center;
  left: 92.8rem;
}

.header-text-quit {
  font-size: 1.1rem;
  margin-left: 1rem;
  color: #1990ff;
  text-decoration: underline;
}


</style>