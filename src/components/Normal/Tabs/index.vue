<template>
  <div>
    <div class="tabs">
      <router-link v-for="item in Tabs" active-class="tab-tittle-active" class="tab-tittle" :to="item.to" :key="item.index">{{item.name}}
      </router-link>
      <div class="border-bottom"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  props:{
    //接收Tab栏配置项
    Tabs:Array
  }
}
</script>

<style scoped>
.tabs {
  padding: 1rem 1.5rem 2rem 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 1rem;
  width: 100%;
}

.tab-tittle {
  height: 3rem;
  width: 12rem;
  font-size: 1rem;
  border-bottom: 0.1rem solid #F5F5F6;
  text-decoration: none;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem 0 1rem;
}

.tab-tittle:hover {
  color: #4099f6;
}

.tab-tittle-active {
  color: #4099f6;
  border-bottom: 0.1rem solid #4099f6;
}

.border-bottom {
  height: 3rem;
  width: 100%;
  border-bottom: 0.1rem solid #F5F5F6;
}
</style>