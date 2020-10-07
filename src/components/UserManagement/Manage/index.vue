<template>
  <div>
    <div class="user-bottom" v-if="jurisdiction==0" style="border-bottom: 0.1rem solid #F1F1F3;">
      <div class="row" style="margin-top: 1.65rem">
        <div class="query-container">
          <img src="../../../assets/img/查找.svg" style="width: 0.81rem;height: 0.81rem;margin: 0 0.4rem 0 0.4rem">
          <input type="text" v-model="inputId" placeholder="输入用户名查找" class="query-input">
        </div>
        <button class="query-btn" @click="queryUser">查询</button>
        <div style="display: flex;justify-content: flex-end;width: 100%">
          <div style="font-size: 1.89rem;color:#43425D;">用户管理</div>
        </div>
      </div>
      <div style="overflow-y: auto;overflow-x:hidden;padding-top: 1.35rem;height: 38rem;">
        <table>
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
                                                             v-model="item.id"></td>
              <td style="width: 11rem" class="center"><input class="center user-input" type="text"
                                                             v-model="item.name"></td>
              <td style="width: 8rem" class="center"><input class="center user-input" type="text"
                                                            v-model="item.nname"></td>
              <td style="width: 11rem" class="center"><input class="center user-input" type="text"
                                                             v-model="item.number"></td>
              <td style="width: 8rem" class="center">
                <select name="gender" v-model="item.gender" class="center user-input">
                  <option value="男">男</option>
                  <option value="女">女</option>
                </select>
              </td>
              <td style="width: 11rem" class="center">
                <select name="gender" v-model="item.jurisdiction" class="center user-input">
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
  </div>
</template>

<script>
import {getUserList, queryUserById, deleteUser, changeUserInfo} from '../../../api/UserManagement'

export default {
  name: "index",
  data() {
    return {
      //用户列表数组
      userList: [],
      //通过输入ID查找用户_id
      inputId: '',
      //从localstorege读取用户权限
      jurisdiction: JSON.parse(localStorage.getItem('bdi_iot_user')).jurisdiction
    }
  },
  methods: {
    //查找用户请求
    queryUser() {
      queryUserById(this, this.inputId)
    },
    //修改用户信息后检查是否合法并提交
    userSubmit(index) {
      let errmsg = ''
      let bool1 = /^[a-zA-Z0-9]\w{5,10}$/.test(this.userList[index].id)
      let bool2 = /^1[3-9]\d{9}$/.test(this.userList[index].number)
      if (!bool1) {
        errmsg += 'id不合法,请输入6-10位字母数字或下划线.'
      }
      if (!bool2) {
        errmsg += '手机号不合法,请重新输入.'
      }
      if (bool1 && bool2) {
        changeUserInfo(this, JSON.parse(sessionStorage.getItem('bdi_iot_userList'))[index].id, this.userList[index])
        this.userList[index].ifEdit = false
      } else {
        alert('修改失败!' + errmsg)
      }
    },
    //供给接口调用  判断是否修改成功
    change(bool, errmsg) {
      if (bool) {
        alert('修改成功！')
        this.getUser()
      } else {
        alert('修改失败！' + errmsg)
      }
    },
    //编辑用户发起函数
    userEdit(index) {
      this.userList[index].ifEdit = true
      this.$forceUpdate()
    },
    //取消编辑用户  恢复用户信息
    userCancel(index) {
      this.userList[index] = JSON.parse(sessionStorage.getItem('bdi_iot_userList'))[index]
      this.userList[index].ifEdit = false
      this.$forceUpdate()
    },
    //删除用户发起函数
    userDelete(index) {
      let temp = confirm(`你确认要删除用户${this.userList[index].id}吗？`)
      if (temp) {
        deleteUser(this.userList[index].id, this)
      }
    },
    //获取用户列表请求
    getUser() {
      if (this.jurisdiction == 0) {
        getUserList(this)
      }
    }
  },
  mounted() {
  },
  watch: {
    //若通过id查找用户的id值为空，发起获取所有用户列表请求
    inputId: {
      handler(newVal) {
        if (newVal == '') {
          this.getUser()
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
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