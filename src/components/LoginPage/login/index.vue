<template>
  <div>
    <div style="display: flex;flex-direction: column;justify-content: center;margin: 6.6rem 13.5rem 0 13.5rem">
      <div style="margin-left: 4.26rem">
        <div class="login-en-text">BDI-IoT</div>
        <div class="login-cn-text">物联网可视化平台</div>
        <div class="login-text">欢迎您 ! 请登入您的账号</div>
      </div>
      <div class="login-id-container">
        <img src="../../../assets/img/login_people.svg" alt="" class="login-id-icon">
        <input class="login-input" type="text" placeholder="请输入您的账号">
      </div>
      <div class="login-password-container">
        <img src="../../../assets/img/login_password.svg" alt="" class="login-password-icon">
        <input class="login-input" type="password" placeholder="请输入您的密码">
      </div>
      <div style="display: flex;flex-direction: row;margin-top: 4.6rem">
        <button @click="login" class="login-btn-lg">登入</button>
        <button @click="register" class="login-btn-rg">注册</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "index",
  methods: {
    login() {
      this.$router.push('/HomePage')
    },
    register() {
      this.$router.push('/LoginPage/Register')
    }
  }
}
</script>

<style scoped>
.login-en-text {
  font-size: 3.84rem;
  font-family: Source Sans Pro;
  font-weight: bold;
  letter-spacing: 1rem;
  color: #43425D;
}

.login-cn-text {
  font-size: 2.16rem;
  font-weight: bold;
  letter-spacing: 0.46rem;
  color: #43425D;
}

.login-text {
  font-weight: 400;
  font-size: 1.21rem;
  color: #A6A7AD;
  margin: 2.8rem 0 2.8rem 3.16rem;
}

.login-id-container {
  display: flex;
  flex-direction: row;
  border-bottom: 0.16rem solid #E9E9F0;
  margin-bottom: 2rem;
}

.login-id-icon {
  width: 1rem;
  height: 1rem;
  margin: 0.36rem 0.6rem 0.2rem 0.6rem
}

.login-password-container {
  display: flex;
  flex-direction: row;
  border-bottom: 0.16rem solid #E9E9F0
}

.login-password-icon {
  width: 2rem;
  height: 1.8rem;
  margin: 0.16rem 0.1rem 0rem 0.1rem;
}

.login-input {
  width: 26rem;
  height: 2rem;
  border: none;
  font-size: 1.08rem;
  color: #43425D;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.login-btn-lg{
  width: 12.49rem;
  height: 3.37rem;
  background:#43425D ;
  color: white;
  border-radius: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.21rem;
}
.login-btn-rg{
  border:0.06rem solid #43425D;
  border-radius: 1.6rem;
  width: 12.49rem;
  height: 3.37rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.21rem;
  color: #43425D;
  margin-left:3.66rem ;
  background: white;
}
</style>