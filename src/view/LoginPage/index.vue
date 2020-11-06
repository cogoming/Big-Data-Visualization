<template>
  <div>
    <div style="display: flex;flex-direction: row">
      <img src="../.././assets/img/login_img.png" alt="" class="login-img">
      <router-view style="flex: 1"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>
.login-img{
  width:50vw ;
  height: 100vh;
  margin: -0.4rem 0 0 -0.6rem;
}

</style>