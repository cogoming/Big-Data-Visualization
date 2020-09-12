<template>
  <div>
    <div class="user-bottom" v-if="jurisdiction==0" style="border-bottom: 0.1rem solid #F1F1F3;">
      <div class="row" style="margin-top: 1.65rem">
        <div class="query-container">
          <img src="../../../assets/img/查找.svg" style="width: 0.81rem;height: 0.81rem;margin: 0 0.4rem 0 0.4rem">
          <input type="text" :value="inputId" placeholder="输入用户名查找" class="query-input">
        </div>
        <button class="query-btn" @click="queryUser">查询</button>
        <div style="display: flex;justify-content: flex-end;width: 100%">
          <div style="font-size: 1.89rem;color:#43425D;">用户管理</div>
        </div>
      </div>
      <table style="padding-top: 1.35rem;height: 38rem;overflow: scroll">
        <tr class="user-list-head center">
          <td style="width: 3rem;" class="center">#</td>
          <td style="width: 11rem" class="center">用户名</td>
          <td style="width: 11rem" class="center">姓名</td>
          <td style="width: 9rem" class="center">昵称</td>
          <td style="width: 10rem" class="center">手机号</td>
          <td style="width: 9rem" class="center">性别</td>
          <td style="width: 10rem" class="center">权限</td>
          <td style="width: 9rem" class="center">操作</td>
        </tr>
        <div v-for="(item,index) in userList" :key="index">
          <tr class="user-list-head center"
              style="background: white;color: #4D4F5C" v-if="item.ifEdit">
            <td style="width: 3rem;" class="center">{{ index + 1 }}</td>
            <td style="width: 11rem" class="center"><input class="center user-input" type="text"
                                                           :value="item.id"></td>
            <td style="width: 11rem" class="center"><input class="center user-input" type="text"
                                                           :value="item.name"></td>
            <td style="width: 8rem" class="center"><input class="center user-input" type="text"
                                                          :value="item.nname"></td>
            <td style="width: 11rem" class="center"><input class="center user-input" type="text"
                                                           :value="item.number"></td>
            <td style="width: 8rem" class="center">
              <select name="gender" :value="item.gender" class="center user-input">
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </td>
            <td style="width: 11rem" class="center">
              <select name="gender" :value="item.jurisdiction" class="center user-input">
                <option value="0">管理员</option>
                <option value="1">VIP</option>
              </select>
            </td>
            <td style="width: 9rem" class="center">
              <button class="center user-list-edit-btn" @click="userSubmit(index)">提交</button>
              <button style="color: red;border: 0.06rem solid red;" class="center user-list-edit-btn"
                      @click="userCancel(index)">取消
              </button>
            </td>
          </tr>
          <tr class="user-list-head center"
              style="background: white;color: #4D4F5C" v-else>
            <td style="width: 3rem;" class="center">{{ index + 1 }}</td>

            <td style="width: 11rem" class="center">{{ item.id }}</td>

            <td style="width: 11rem" class="center">{{ item.name }}</td>
            <td style="width: 9rem" class="center">{{ item.nname }}</td>
            <td style="width: 10rem" class="center">{{ item.number }}</td>
            <td style="width: 9rem" class="center">{{ item.gender }}</td>
            <td style="width: 10rem" class="center">{{ item.jurisdiction == 0 ? '管理员' : 'VIP' }}</td>
            <td style="width: 9rem" class="center">
              <button class="center user-list-edit-btn" @click="userEdit(index)">编辑</button>
              <button style="color: red;border: 0.06rem solid red;" class="center user-list-edit-btn"
                      @click="userDelete(index)">删除
              </button>
            </td>
          </tr>
        </div>
      </table>
    </div>
  </div>
</template>

<script>
import {getUserList, queryUserById, deleteUser, changeUserInfo} from '../../../api/UserManagement'
export default {
  name: "index",
  data() {
    return {
      userList: [JSON.parse(localStorage.getItem('bdi_iot_user'))],
      userList1:[],
      inputId: '',
      jurisdiction:JSON.parse(localStorage.getItem('bdi_iot_user')).jurisdiction
    }
  },
  methods: {
    queryUser(){
      queryUserById(this,this.inputId)
    },
    userSubmit(index) {
      let errmsg=''
      let bool1=/^[a-zA-Z0-9]\w{6,10}$/.test(this.userList[index].id)
      let bool2=/^1[3-9]\d{9}$/.test(this.userList[index].phoneNumber)
      if(!bool1){
        errmsg+='id不合法,请输入6-10位字母数字或下划线.'
      }
      if(!bool2){
        errmsg+='手机号不合法,请重新输入.'
      }
      if(bool1 && bool2){
        changeUserInfo(this,this.userList1[index].id,this.userList[index])
        this.userList[index].ifEdit = false
      }else{
        alert('修改失败!'+errmsg)
      }
    },
    change(bool,errmsg){
      if(bool){
        alert('修改成功！')
        this.getUser()
      }else{
        alert('修改失败！'+errmsg)
      }
    },
    userEdit(index) {
      this.userList[index].ifEdit = true
    },
    userCancel(index) {
      this.userList=this.userList1
      this.userList[index].ifEdit = false
    },
    userDelete(index) {
      let temp=confirm(`你确认要删除用户${this.userList[index].nname}吗？`)
      if(temp){
        deleteUser(this.userList[index].id)
      }
    },
    getUser(){
      if(this.jurisdiction==0){
        getUserList(this)
      }
    }
  },
  mounted() {
    this.getUser()
  },
  watch:{
    inputId:{
      handler(newVal){
        if(newVal==''){
          this.getUser()
        }
      },
      deep:true,
      immediate:true
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


.user-list-head {
  width: 100%;
  height: 3.04rem;
  background: #F5F6FA;
  color: #A3A6B4;
  font-size: 0.74rem;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-list-edit-btn {
  width: 2.56rem;
  height: 1.55rem;
  background: #FFFFFF;
  color: #3B86FF;
  border: 0.06rem solid #3B86FF;
  font-size: 0.74rem;
  margin-left: 0.3rem;
}

.user-input {
  height: 1.6rem;
  width: 5rem;
}

.query-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 1.95rem;
  width: 15.13rem;
  border: 0.06rem solid #43425D;
}

.query-input {
  height: 1.5rem;
  width: 84%;
  margin: 0;
  border: none;
}

.query-btn {
  height: 1.95rem;
  width: 4.05rem;
  background: #43425D;
  color: white;
  font-size: 0.87rem;
  margin-left: 1rem;
}
</style>