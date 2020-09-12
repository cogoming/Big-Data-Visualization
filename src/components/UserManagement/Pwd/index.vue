<template>
  <div>
    <div class="col" style="margin-top: 1.65rem;">
      <div style="font-size: 1.89rem;color:#43425D;">密码管理</div>
      <div v-if="this.user.jurisdiction==0">
        <div class="row mgt">
          <div>用户名：</div>
          <input type="text" class="pwd" :value="id"/>
        </div>
        <div class="row mgt">
          <div>新密码：</div>
          <input type="password" class="pwd" :value="adminPwd"/>
        </div>
      </div>
      <div style="margin-top: 1rem" v-else>
        <div class="row">
          <div>原密码：</div>
          <input type="password" class="pwd" style="margin-left: 1rem" :value="pwd"/>
        </div>
        <div class="row mgt">
          <div>新密码：</div>
          <input type="password" class="pwd" style="margin-left: 1rem" :value="newPwd"/>
        </div>
        <div class="row mgt">
          <div>确认密码：</div>
          <input type="password" class="pwd" :value="confirmPwd"/>
        </div>
      </div>
      <button class="pwd-btn" @click="changePwd">确认修改</button>
    </div>
  </div>
</template>

<script>
import {changeUserPwd} from '../../../api/UserManagement'
export default {
  name: "index",
  data(){
    return{
      pwd:'',
      newPwd:'',
      confirmPwd:'',
      adminId:'',
      adminPwd:'',
      user:JSON.parse(localStorage.getItem('bdi_iot_user'))

    }
  },
  methods:{
    changePwd(){
      if(this.user.jurisdiction==0){
        let bool=/^[a-zA-Z0-9]\w{6,18}$/.test(this.adminPwd)
        if(bool){
          changeUserPwd(this.adminId,'',this.adminPwd)
        }else{
          alert('密码不合法，请输入6-10位密码数字或下划线')
        }
      }else{
        let bool1=/^[a-zA-Z0-9]\w{6,18}$/.test(this.pwd)
        if(bool1 && this.pwd===this.newPwd){
          changeUserPwd(this.user.id,this.pwd,this.newPwd)
        }else{
          alert('密码不合法或两次输入密码不一致')
        }
      }
      this.pwd=''
      this.newPwd=''
      this.confirmPwd=''
      this.adminPwd=''
      this.adminId=''
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
.mgt{
  margin-top: 1rem;
}
.pwd{
  width: 8rem;
}
.pwd-btn{
  width: 10rem;
  height: 2rem;
  background: #3B86FF;
  color: white;
  border-radius: 0.6rem;
  margin: 1rem 0 0 1rem;
  font-size: 1rem;
}
</style>