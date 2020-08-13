<template>
  <div class="device-list">
    <el-table
        :data="tableData.filter(data => !search || type.number.node.toLowerCase().includes(search.toLowerCase()))"
        stripe
        style="width: 100%">
      <el-table-column
          prop="number"
          label="设备编号"
          width="250">
      </el-table-column>
      <el-table-column
          prop="type"
          label="设备类型"
          width="250">
      </el-table-column>
      <el-table-column
          prop="node"
          label="节点下挂传感器"
          width="350">
      </el-table-column>
      <el-table-column
          prop="status"
          label="设备状态"
          width="200">
        <div v-if="status"><img src="../../../assets/img/设备在线.svg" style="width:2.5rem">在线</div>
        <div v-else><img src="../../../assets/img/设备离线.svg" style="width:2.5rem">离线</div>
      </el-table-column>
      <el-table-column
          align="right"
          width="273">
        <template slot="header" :slot-scope="scope">
          <div>
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="add">
              添加设备
            </el-button>
          </div>
          <el-input
              v-model="search"
              size="mini"
              prefix-icon="el-icon-search"
              placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
              type="primary" icon="el-icon-set-up" circle
              @click="edit(scope.$index, scope.row)"></el-button>
          <el-popconfirm title="确认删除此设备？">
            <el-button
                type="danger" icon="el-icon-delete" slot="reference" circle
                @click="handleDelete(scope.$index, scope.row)"></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="10">
      </el-pagination>
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
      tableData: [{
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
        type: '采集设备',
        number: '010',
        node: '光照、温度、湿度',
        status:true
      },],
    }
  },
  methods: {
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    add() {
      this.$prompt('请输入设备ID', '添加设备', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*.(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: 'ID格式不正确'//校验功能
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
  margin: 1rem 1rem 1rem 1rem;
}
</style>
