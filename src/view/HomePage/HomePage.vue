<template>
  <div class="all">
    <menu-list class="menu"/>
    <div class="right">
      <HomePageHeader class="header"/>
      <router-view class="view"></router-view>
    </div>
  </div>
</template>

<script>
import MenuList from '../../components/MenuList'
import HomePageHeader from '../../components/HomePageHeader'

export default {
  name: "Home",
  components: {
    MenuList, HomePageHeader
  }
}
</script>

<style scoped>
.menu {
  background: #001628;
  width: 12rem;
  display: flex;
  flex-direction: column;
  height: 70rem;
  margin: -0.7rem 0 0 -0.64rem;
}

.header {
  height: 2.8rem;
  width: 100rem;
  background: #ffffff;
  margin: 0 0 0 0;
}

.right {
  width: 96rem;
  display: flex;
  flex-direction: column;
  margin: 0 -1rem 0 0;
}

.all {
  display: flex;
  flex-direction: row;
}

.view {
  background: #eff2f5;
  height: 100%;
  width: 100%;
}
</style>