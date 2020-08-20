<template>
  <div>
    <div>
      <div style="display: flex;flex-direction: column;justify-content: center;margin: 4rem 13.5rem 0 13.5rem">
        <div style="margin-left: 7.16rem">
          <div class="register-en-text">BDI-IoT</div>
          <div class="register-cn-text">物联网可视化平台</div>
          <div class="register-text">请完成您的账号注册</div>
        </div>
        <div class="register-id-container">
          <img src="../../../assets/img/login_people.svg" alt="" class="register-id-icon">
          <div class="register-front-text">账号:</div>
          <input class="register-input-l" type="text" placeholder="请输入您的账号">
        </div>
        <div class="register-password-container">
          <img src="../../../assets/img/login_password.svg" alt="" class="register-password-icon">
          <div class="register-front-text">密码:</div>
          <input class="register-input-l" type="password" placeholder="请输入您的密码">
        </div>
        <div class="register-password-container" style="margin-top: 2rem">
          <img src="../../../assets/img/login_password.svg" alt="" class="register-password-icon">
          <div class="register-front-text" style="width: 10rem">再次确认密码:</div>
          <input class="register-input-l" type="password" placeholder="请再次输入您的密码">
        </div>
        <div class="row">
          <div class="row register-input-container">
            <div class="register-input-text">姓名:</div>
            <input type="text" class="register-input">
          </div>
          <div class="row register-input-container" style="margin-left: 5rem">
            <div class="register-input-text">昵称:</div>
            <input type="text" class="register-input">
          </div>
        </div>
        <div class="row">
          <div class="row register-input-container">
            <div class="register-input-text" style="width: 6.8rem">手机号:</div>
            <input type="text" class="register-input">
          </div>
          <div class="row register-input-container" style="margin-left: 5rem">
            <div class="register-input-text">性别:</div>
            <select name="gender" id="gender" class="gender-select">
              <option value=""></option>
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </div>
        </div>
        <div class="row" style="margin-top: 3rem">
          <input type="checkbox" style="width: 1rem;height: 1rem">
          <div class="register-ckb-text">我同意条款和协议并完成注册</div>
        </div>
        <div>
          <button class="register-btn">注册</button>
        </div>
        <div class="register-botton-text" @click="login">已经有账号了？点击这里登入</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  methods: {
    login() {
      this.$router.push('/LoginPage')
    }
  }
}
</script>

<style scoped>
.register-en-text {
  font-size: 2.83rem;
  font-family: Source Sans Pro;
  font-weight: bold;
  letter-spacing: 1rem;
  color: #43425D;

}

.register-cn-text {
  font-size: 1.62rem;
  font-weight: bold;
  letter-spacing: 0.48rem;
  color: #43425D;

}

.register-text {
  font-weight: 400;
  font-size: 1.21rem;
  color: #A6A7AD;
  margin: 2rem 0 2rem 2.6rem;
}

.register-id-container {
  display: flex;
  flex-direction: row;
  border-bottom: 0.16rem solid #E9E9F0;
  margin-bottom: 2rem;
}

.register-id-icon {
  width: 1rem;
  height: 1rem;
  margin: 0.36rem 0.6rem 0.2rem 0.6rem
}

.register-password-container {
  display: flex;
  flex-direction: row;
  border-bottom: 0.16rem solid #E9E9F0
}

.register-password-icon {
  width: 2rem;
  height: 1.8rem;
  margin: 0.16rem 0.1rem 0rem 0.1rem;
}

.register-input-l {
  width: 100%;
  height: 2rem;
  border: none;
  font-size: 1.08rem;
  color: #43425D;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.register-front-text {
  width: 3.17rem;
  font-size: 1.08rem;
  font-weight: 400;
  color: #43425D;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.06rem;
}

.row {
  display: flex;
  flex-direction: row;
}

.register-input-container {
  border-bottom: 0.16rem solid #E9E9F0;
  align-items: center;
  width: 12.64rem;
  margin-top: 3rem;
}

.register-input-text {
  width: 4rem;
  font-size: 1.08rem;
  font-weight: 400;
  color: #43425D;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.register-input {
  width: 100%;
  height: 2rem;
  border: none;
  font-size: 1rem;
  color: #43425D;
}

.gender-select {
  width: 100%;
  height: 2rem;
  border: none;
  text-align: right;
  font-size: 1.08rem;
  color: #43425D;
}

.register-btn {
  height: 3.37rem;
  width: 12.86rem;
  margin: 2.8rem 0 2.8rem 9rem;
  color: white;
  background: #43425D;
  border-radius: 1rem;
}

.register-ckb-text {
  font-size: 1.01rem;
  color: #43425D;
  margin-left: 0.26rem
}

.register-botton-text {
  font-size: 1rem;
  color: #43425D;
  margin-left: 9rem;
  text-decoration: underline;
}
</style>