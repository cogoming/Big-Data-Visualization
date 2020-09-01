<template>
  <div>
    <div class="msg-top">
      <div class="msg-top-text">预警消息</div>
      <router-link style="margin-left: 5rem" class="msg-button" active-class="msg-button-active"
                   to="/HomePage/ApplicationScenarios/CampusSecurity/Warning" @click="()=>{this.activePick='warning'}">
        预警
      </router-link>
      <router-link class="msg-button" active-class="msg-button-active"
                   to="/HomePage/ApplicationScenarios/CampusSecurity/ImportantWarning"
                   @click="()=>{this.activePick='importantWarning'}">重要预警
      </router-link>
      <el-date-picker
          style="width: 5.8rem"
          v-model="dateValue"
          type="date"
          placeholder="Date"
          format="yyyy 年 MM 月 dd 日"
          align="right"
          value-format="yyyy-MM-dd">
      </el-date-picker>
    </div>
    <router-view class="msg-view"/>
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      //日期挂载变量
      dateValue: '',
      //表示当前选择的是预警列表/重要预警列表
      activePick: 'warning'
    }
  }
}
</script>

<style scoped lang="less">
.msg-top {
  display: flex;
  flex-direction: row;
  margin: 1.35rem 0 1.35rem 2rem;
  align-items: center;
}

.msg-top-text {
  font-size: 1.21rem;
  color: #4D4F5C;
}

.msg-button {
  text-decoration: none;
  width: 5.26rem;
  height: 1.68rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #E6E9F2;
  color: #7E86A9;
  border-radius: 0.87rem;
  font-size: 0.87rem;
  margin: 0 0.94rem 0 0;
}

.msg-button-active {
  background: #2878FF;
  color: white;
}

.msg-button:hover {
  background: #D0D6E8;
  color:#7E86A9;
}

.msg-icon {
  margin-left: 1.6rem;
}

.msg-icon:hover {
  background: #FAFAFA;
}

.msg-view {
  margin-left: 2rem;
}

</style>