<template>
  <div class="device-list">
    <div class="msg-top-text">设备列表
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="add" style="float: right">添加设备</el-button></div>
    <div class='list' style="width:88rem; height:45rem; overflow:scroll; overflow-x:hidden">
      <table border="0" cellpadding="0" cellspacing="0" >
        <tr class="list-head">
          <td class="list-head-text">设备编号</td>
          <td class="list-head-text">设备类型</td>
          <td class="list-head-text">节点下挂传感器</td>
          <td class="list-head-text">设备状态</td>
          <td class="list-head-text">操作</td>
        </tr>
        <tr class="list-item" v-for="(item,index) in DeviceList" :key="index">
          <td class="list-item-text">{{ item.number }}</td>
          <td class="list-item-text">{{ item.type }}</td>
          <td class="list-item-text">{{ item.node }}</td>
          <td class="list-item-text">
            <div class="on" v-if="item.status"><img src="../../../assets/img/设备在线.svg" style="width:2.5rem"> 在线</div>
            <div class="off" v-else><img src="../../../assets/img/设备离线.svg" style="width:2.5rem"> 离线</div></td>
          <td class="center">
            <el-button
                type="primary" icon="el-icon-set-up" circle
                @click="edit(index, DeviceList)"></el-button>
            <el-popconfirm title="确认删除此设备？" @onConfirm="handleDelete(index,DeviceList)">
              <el-button
                  type="danger" icon="el-icon-delete" slot="reference" circle></el-button>
            </el-popconfirm>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  name: "index",
  data() {
    return {
      value:'',
      search:'',
      currentPage:1,
      DeviceList: [{
        type: '采集设备',
        number: '001',
        node: '光照、温度',
        status:true
      }, {
        type: '采集设备',
        number: '002',
        node: '温度、湿度',
        status:true
      }, {
        type: '控制设备',
        number: '003',
        node: '电机',
        status:true
      },{
        type: '综合设备',
        number: '004',
        node: '--',
        status:false
      }, {
        type: '控制设备',
        number: '005',
        node: 'LED灯',
        status:false
      },{
        type: '采集设备',
        number: '006',
        node: '温度、烟雾',
        status:false
      },{
        type: '采集设备',
        number: '007',
        node: '光照、烟雾',
        status:true
      },{
        type: '综合设备',
        number: '008',
        node: '--',
        status:true
      },{
        type: '控制设备',
        number: '009',
        node: '蜂鸣器',
        status:false
      },{
        type: '控制设备',
        number: '010',
        node: '蜂鸣器',
        status:false
      },{
        type: '采集设备',
        number: '011',
        node: '光照、温度、湿度',
        status:true
      },{
        type: '采集设备',
        number: '012',
        node: '光照、湿度',
        status:true
      },{
        type: '采集设备',
        number: '013',
        node: '光照、温度',
        status:true
      },],
    }
  },
  methods: {
    confirm(){
      this.visible=false;
      this.$emit('onConfirm')
    },
    handleDelete(index, rows) {
      rows.splice(index, 1);
    },
    add() {
      this.$prompt('请输入设备ID', '添加设备', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*.(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: 'ID格式不正确'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '添加成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    edit(){
      this.$prompt('请输入设备ID', '设备编辑', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*.(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: 'ID格式不正确'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消编辑'
        });
      });
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.device-list{
  margin: 2rem 4rem 4rem 4rem;
  width: 88rem;
  height: 52rem;
  background:white;
  border-radius:1.5rem;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  margin:0.8rem 0 0 0;
}
.list{
  margin: 0 1rem 1rem 1rem;
}
.msg-top-text{
  font-size: 1.2rem;
  color: #4D4F5C;
  border-bottom:0.08rem solid dimgray;
  font-weight: 700;
  height: 2.5rem;
  margin: 0 0.93rem 0 0.93rem;
  padding: 0.8rem 0 0.5rem 0;
}
.list-head {
  background: #F5F6FA;
  color: #A3A6B4;
}
.list-head-text {
  font-size: 0.88rem;
  height: 3.04rem;
  width: 32rem;
  font-weight: bold;
  text-align: center;
  vertical-align: center;
}
.list-item {
  background: white;
  height:4.2rem;
  color: #4D4F5C;
}

.list-item:hover {
  background: #F5F6FA;
}

.list-item-text {
  height: 3.04rem;
  width: 9.32rem;
  font-size: 1rem;
  text-align: center;
  vertical-align: middle;
}
.on{
  color: green;
  font-size: 1rem;
  vertical-align: center;
}
.off{
  color: red;
  font-size: 1rem;
  vertical-align: center;
}


</style>
