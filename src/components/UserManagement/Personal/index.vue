<template>
<div>
  <div class="row" style="border-bottom: 0.1rem solid #F1F1F3;padding-bottom: 2rem">
    <img src="../../../assets/img/头像.jpg" alt="用户头像" class="user-img">
    <div class="col" style="margin:0 0 0 2rem;">
      <input type="text" class="user-nname" style="width: 8rem" v-model="user.nname" v-if="ifEdit"/>
      <div class="user-nname" style="width: 8rem" v-else>{{ user.nname }}</div>
      <div class="user-id row" v-if="ifEdit">
        <div class="row" style="width: 3rem">用户名:</div>
        <input type="text" class="user-id" v-model="user.id"/>
      </div>
      <div class="user-id" v-else>用户名:{{ user.id }}</div>
      <div class="user-admin" v-if="user.jurisdiction==0">管理员</div>
      <div class="user-admin" style="background:#3B86FF;color: white" v-else-if="user.jurisdiction==1">V I P</div>
    </div>
    <div class="row" style="margin-top: 2.68rem">
      <div class="user-info-container col" style="width: 6rem">
        <div class="user-info-title">姓名：</div>
        <input class="user-info-text" v-model="user.name" v-if="ifEdit"/>
        <div class="user-info-text" v-else>{{ user.name }}</div>
      </div>
      <div class="user-info-container col" style="width: 6rem">
        <div class="user-info-title">性别：</div>
        <select class="user-info-text" v-model="user.gender" v-if="ifEdit">
          <option value="男">男</option>
          <option value="女">女</option>
        </select>
        <div class="user-info-text" v-else>{{ user.gender }}</div>
      </div>
      <div class="user-info-container col" style="width: 6rem">
        <div class="user-info-title">手机号：</div>
        <input class="user-info-text" v-model="user.number" v-if="ifEdit"/>
        <div class="user-info-text" v-else>{{ user.number }}</div>
      </div>
    </div>
    <div style="width: 100%;display: flex;justify-content: flex-end">
      <div class="col">
        <div class="user-top-title" style="display: flex;justify-content: flex-end">个人资料</div>
        <div class="row">
          <button class="user-top-button-confirm" @click="confirmMy" v-if="ifEdit">提交</button>
          <button class="user-top-button-confirm" @click="cancel" v-if="ifEdit" style="background: red;margin-left: 0.6rem">取消</button>
        </div>
        <button class="user-top-button" @click="editMy" v-if="!ifEdit">编辑我的资料</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {changeUserInfo} from '../../../api/UserManagement'
export default {
  name: "index",
  data() {
    return {
      //获取个人用户信息
      user: JSON.parse(localStorage.getItem('bdi_iot_user')),
      //是否编辑状态变量
      ifEdit: false,
    }
  },
  methods: {
    //开始编辑
    editMy() {
      this.ifEdit = true
    },
    //取消编辑
    cancel(){
      this.user=JSON.parse(localStorage.getItem('bdi_iot_user'))
      this.ifEdit = false
    },
    //确认提交修改 检查输入项合法后发起修改用户信息请求
    confirmMy() {
      let errmsg=''
      let bool1=/^[a-zA-Z0-9]\w{5,10}$/.test(this.user.id)
      let bool2=/^1[3-9]\d{9}$/.test(this.user.number)
      if(!bool1){
        errmsg+='id不合法,请输入6-10位字母数字或下划线.'
      }
      if(!bool2){
        errmsg+='手机号不合法,请重新输入.'
      }
      if(!this.user.name || !this.user.nname || !this.user.gender){
        errmsg+='输入项不能为空.'
      }
      if(bool1 && bool2 && this.user.name && this.user.nname && this.user.gender){
        changeUserInfo(this,JSON.parse(localStorage.getItem('bdi_iot_user')).id,this.user)
      }else{
        alert('修改失败!'+errmsg)
      }
    },
    //供给接口调用  判断个人信息是否修改成功
    change(bool,errmsg){
      if(bool){
        alert('修改成功！')
        localStorage.setItem('bdi_iot_user',JSON.stringify(this.user))
        this.ifEdit = false
        this.$router.go(0)
      }else{
        alert('修改失败！'+errmsg)
        this.user=JSON.parse(localStorage.getItem('bdi_iot_user'))
        this.ifEdit = false
      }
    }
  }
}
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
}

.col {
  display: flex;
  flex-direction: column;
}

.user-img {
  height: 5.81rem;
  width: 5.81rem;
  border-radius: 100%;
}

.user-nname {
  font-size: 1.36rem;
  color: #43425D;
  margin-bottom: 0.67rem;
}

.user-id {
  font-size: 0.78rem;
  color: #43425D;
  margin-bottom: 0.66rem;
}

.user-admin {
  width: 5rem;
  height: 1.62rem;
  font-size: 0.74rem;
  border-radius: 1rem;
  background: #FFCA83;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-info-container {
  margin-left: 3.86rem;
}

.user-info-title {
  color: #4D4F5C;
  font-size: 1rem;
  font-weight: bold;
}

.user-info-text {
  color: #4D4F5C;
  font-size: 0.87rem;
  margin-top: 0.6rem;
}

.user-top-title {
  font-size: 1.89rem;
  color: #43425D;
  margin-bottom: 1.82rem;
}

.user-top-button {
  width: 8.85rem;
  height: 2.36rem;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4D4F5C;
  border: 0.06rem solid #4D4F5C;
  background: white;
  border-radius: 0.3rem;
}

.user-top-button-confirm {
  width: 4.46rem;
  height: 2.36rem;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border: 0.06rem solid #3B86FF;
  background: #3B86FF;
  border-radius: 0.3rem;
}
</style>