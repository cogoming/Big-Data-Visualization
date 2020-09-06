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
          <div class="register-front-text" style="width: 5rem">用户名:</div>
          <input class="register-input-l" type="text" placeholder="5-10个字符只能包括字母、数字、下划线" v-model="user" @blur="checkUser">
          <img :src="userSrc" class="img-end" v-if="userShow"/>
        </div>
        <div class="register-password-container">
          <img src="../../../assets/img/login_password.svg" alt="" class="register-password-icon">
          <div class="register-front-text" style="width: 3.6rem">密码:</div>
          <input class="register-input-l" type="password" placeholder="5-18个字符只能包括字母、数字、下划线" v-model="pwd" @blur="checkPwd">
          <img :src="pwdSrc" class="img-end" v-if="pwdShow"/>
        </div>
        <div class="register-password-container" style="margin-top: 2rem">
          <img src="../../../assets/img/login_password.svg" alt="" class="register-password-icon">
          <div class="register-front-text" style="width: 11rem">再次确认密码:</div>
          <input class="register-input-l" type="password" placeholder="请再次输入您的密码" v-model="twicePwd" @blur="checkTwicePwd">
          <img :src="twicePwdSrc" class="img-end" v-if="twicePwdShow"/>
        </div>
        <div class="row">
          <div class="row register-input-container">
            <div class="register-input-text">姓名:</div>
            <input type="text" class="register-input" v-model="name" @blur="checkName">
            <img :src="nameSrc" class="img-end" v-if="nameShow"/>
          </div>
          <div class="row register-input-container" style="margin-left: 5rem">
            <div class="register-input-text">昵称:</div>
            <input type="text" class="register-input" v-model="nname" @blur="checkNname">
            <img :src="nnameSrc" class="img-end" v-if="nnameShow"/>
          </div>
        </div>
        <div class="row">
          <div class="row register-input-container">
            <div class="register-input-text" style="width: 6.8rem">手机号:</div>
            <input type="text" class="register-input" v-model="phoneNumber" @blur="checkPhoneNumber">
            <img :src="phoneNumberSrc" class="img-end" v-if="phoneNumberShow" @blur="checkPhoneNumber"/>
          </div>
          <div class="row register-input-container" style="margin-left: 5rem">
            <div class="register-input-text">性别:</div>
            <select name="gender" id="gender" class="gender-select" v-model="gender" @blur="checkGender">
              <option value=""></option>
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
            <img :src="genderSrc" class="img-end" v-if="genderShow" style="margin-top: 0rem"/>
          </div>
        </div>
        <div class="row" style="margin-top: 3rem">
          <input type="checkbox" style="width: 1rem;height: 1rem" ref="protrol">
          <div class="register-ckb-text">我同意条款和协议并完成注册</div>
        </div>
        <div>
          <button class="register-btn" @click="registerReq">注册</button>
        </div>
        <div class="register-botton-text" @click="login">已经有账号了？点击这里登入</div>
      </div>
    </div>
  </div>
</template>

<script>
import {registerRequest} from '../../../api/LoginPage/register'
export default {
  name: "index",
  data(){
    return{
      user:'',
      pwd:'',
      twicePwd:'',
      name:'',
      nname:'',
      phoneNumber:'',
      gender:'',
      userSrc:null,
      pwdSrc:null,
      twicePwdSrc:null,
      nameSrc:null,
      nnameSrc:null,
      phoneNumberSrc:null,
      genderSrc:null,
      userFlag:false,
      pwdFlag:false,
      twicePwdFlag:false,
      nameFlag:false,
      nnameFlag:false,
      phoneNumberFlag:false,
      genderFlag:false,
      userShow:false,
      pwdShow:false,
      twicePwdShow:false,
      nameShow:false,
      nnameShow:false,
      phoneNumberShow:false,
      genderShow:false,
    }
  },
  methods: {
    register(bool){
      if(bool){
        alert("注册成功！")
        this.$router.push('/LoginPage')
      }else{
        alert("注册失败！")
      }
    },
    login() {
      this.$router.push('/LoginPage')
    },
    registerReq(){
      if(this.userFlag && this.pwdFlag && this.twicePwdFlag && this.nameFlag && this.nnameFlag && this.phoneNumberFlag && this.genderFlag
         && this.$refs.protrol.checked){
        registerRequest(this)
      }else{
        alert('请检查输入项和是否同意条款和协议')
      }

    },
    checkUser(){
      this.userShow=true
      let bool=/^[a-zA-Z0-9]\w{5,9}$/.test(this.user)
      if(bool){
        this.userFlag=true
        this.userSrc=require('../../../assets/img/对.svg')
      }else{
        this.userFlag=false
        this.userSrc=require('../../../assets/img/错.svg')
      }
    },
    checkPwd(){
      this.pwdShow=true
      let bool=/^[a-zA-Z0-9]\w{5,17}$/.test(this.pwd)
      if(bool){
        this.pwdFlag=true
        this.pwdSrc=require('../../../assets/img/对.svg')
      }else{
        this.pwdFlag=false
        this.pwdSrc=require('../../../assets/img/错.svg')
      }
    },
    checkTwicePwd(){
      this.twicePwdShow=true
      if(this.twicePwd==this.pwd && this.pwd){
        this.twicePwdFlag=true
        this.twicePwdSrc=require('../../../assets/img/对.svg')
      }else{
        this.twicePwdFlag=false
        this.twicePwdSrc=require('../../../assets/img/错.svg')
      }
    },
    checkName(){
      this.nameShow=true
      if(this.name){
        this.nameFlag=true
        this.nameSrc=require('../../../assets/img/对.svg')
      }else {
        this.nameFlag=false
        this.nameSrc = require('../../../assets/img/错.svg')
      }
    },
    checkNname(){
      this.nnameShow=true
      if(this.nname){
        this.nnameFlag=true
        this.nnameSrc=require('../../../assets/img/对.svg')
      }else{
        this.nnameFlag=true
        this.nnameSrc=require('../../../assets/img/错.svg')
      }
    },
    checkPhoneNumber(){
      this.phoneNumberShow=true
      let bool=/^1[3-9]\d{9}$/.test(this.phoneNumber)
      if(bool){
        this.phoneNumberFlag=true
        this.phoneNumberSrc=require('../../../assets/img/对.svg')
      }else{
        this.phoneNumberFlag=false
        this.phoneNumberSrc=require('../../../assets/img/错.svg')
      }
    },
    checkGender(){
      this.genderShow=true
      if(this.gender){
        this.genderFlag=true
        this.genderSrc=require('../../../assets/img/对.svg')
      }else{
        this.genderFlag=false
        this.genderSrc=require('../../../assets/img/错.svg')
      }
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
  color: #143992;

}

.register-cn-text {
  font-size: 1.62rem;
  font-weight: bold;
  letter-spacing: 0.48rem;
  color: #143992;

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
  color: #143992;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.register-front-text {
  width: 3.17rem;
  font-size: 1.08rem;
  font-weight: 400;
  color:#436496;
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
  color: #436496;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.register-input {
  width: 100%;
  height: 2rem;
  border: none;
  font-size: 1rem;
  color: #143992;
}

.gender-select {
  width: 100%;
  height: 2rem;
  border: none;
  text-align: right;
  font-size: 1.08rem;
  color: #143992;
}

.register-btn {
  height: 3.37rem;
  width: 12.86rem;
  margin: 2.8rem 0 2.8rem 9rem;
  color: white;
  background: #143992;
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
.img-end {
  width: 1rem;
  height: 1rem;
  margin-top: 0.5rem;
  border: none;
}
</style>