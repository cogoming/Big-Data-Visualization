<template>
  <div>
    <div class="msg-top">
      <div class="msg-top-text">预警消息</div>
      <router-link style="margin-left: 7.22rem" class="msg-button" active-class="msg-button-active" to="/HomePage/ApplicationScenarios/CampusSecurity/Warning">预警</router-link>
      <router-link class="msg-button" active-class="msg-button-active" to="/HomePage/ApplicationScenarios/CampusSecurity/ImportantWarning">重要预警</router-link>
      <div class="msg-icon" ><img src="../../../../assets/img/日历.svg" alt="日历" /></div>
    </div>
    <router-view class="msg-view"/>
  </div>
</template>
<script>
export default {
  name: "index"
}
</script>

<style scoped>
.msg-top{
  display: flex;
  flex-direction: row;
  margin:1.35rem 0 1.35rem 2rem;
}
.msg-top-text{
  font-size: 1.21rem;
  color: #4D4F5C;
}
.msg-button{
  text-decoration: none;
  width: 5.26rem;
  height: 1.68rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background:#E6E9F2;
  color: #7E86A9;
  border-radius: 0.87rem;
  font-size: 0.87rem;
  margin:0  0.94rem 0 0;
}
.msg-button-active{
  background:#2878FF;
  color: white;
}
.msg-button:hover{
  background:#2878FF ;
  color: white;
}
.msg-icon{
  margin-left: 1.6rem;
}
.msg-icon:hover{
  background:#FAFAFA ;
}
.msg-view{
  margin-left: 2rem;
}
</style>