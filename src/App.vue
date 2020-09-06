<template>
  <div id="app">
    <router-view class="all-view"></router-view>
  </div>
  
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {}
  },
  destroyed() {
    localStorage.removeItem('bdi_iot_token')
    localStorage.removeItem('bdi_iot_user')
  }
}
</script>
<style>
</style>
