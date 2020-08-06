 <template>
     <div>
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
                width="400">
            <el-select v-model="value" placeholder="下挂传感器">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-table-column>
          <el-table-column
                prop="status"
                label="设备状态"
                width="200">
          </el-table-column>
          <el-table-column
                align="right"
                width="250">
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
                        @click="handleEdit(scope.$index, scope.row)"></el-button>
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
                  options: [{
                    value: '选项1',
                    label: '传感器1'
                  }, {
                    value: '选项2',
                    label: '传感器2'
                  }, {
                    value: '选项3',
                    label: '传感器3'
                  }, {
                    value: '选项4',
                    label: '传感器4'
                  }],
                    value:'',
                    search:'',
                    currentPage:1,
                    tableData: [{
                        type: '采集设备',
                        number: '001',
                        node: 'A1',
                        status:'在线'
                    }, {
                        type: '采集设备',
                        number: '002',
                        node: 'A2',
                        status:'在线'
                    }, {
                        type: '控制设备',
                        number: '003',
                        node: 'A3',
                        status:'在线'
                    },{
                        type: '综合设备',
                        number: '004',
                        node: 'A4',
                        status:'离线'
                    }, {
                        type: '控制设备',
                        number: '005',
                        node: 'B1',
                        status:'离线'
                    },{
                      type: '采集设备',
                      number: '006',
                      node: 'B2',
                      status:'在线'
                    },{
                      type: '采集设备',
                      number: '007',
                      node: 'B3',
                      status:'在线'
                    },{
                      type: '综合设备',
                      number: '008',
                      node: 'B4',
                      status:'在线'
                    },{
                      type: '控制设备',
                      number: '009',
                      node: 'C1',
                      status:'离线'
                    },{
                      type: '采集设备',
                      number: '010',
                      node: 'C2',
                      status:'在线'
                    },],
                }
            },
            methods: {
                handleEdit(index, row) {
                    console.log(index, row);
                },
                handleDelete(index, row) {
                    console.log(index, row);
                },
                handleSizeChange(val) {
                    console.log(`每页 ${val} 条`);
                },
                handleCurrentChange(val) {
                    console.log(`当前页: ${val}`);
                },
                edit(){
                  this.$router.push('/HomePage/DeviceManagement/DeviceEdit')
                },
                add(){
                  this.$router.push('/HomePage/DeviceManagement/DeviceAdd')
                }
            },
        mounted() {
        }
    }
</script>

<style scoped>
</style>
