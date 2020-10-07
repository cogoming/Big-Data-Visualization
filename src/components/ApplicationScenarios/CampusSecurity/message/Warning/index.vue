<template>
  <div>
    <div class="list" style="overflow-y: auto">
      <table border="0" cellpadding="0" cellspacing="0">
        <tr class="list-head">
          <td class="list-head-text">内容</td>
          <td class="list-head-text">人数</td>
          <td class="list-head-text">时间</td>
        </tr>
        <tr class="list-item" v-for="(item,index) in warningList" :key="index" @click="setActiveWarning(item)">
          <td class="list-item-text"><input type="checkbox" :value="index" v-if="!ifAdd" class="warn-ckb"
                                            style="margin-right: 0.36rem"/>{{ item.name }}
          </td>
          <td class="list-item-text">{{ item.num }}</td>
          <td class="list-item-text">{{ item.time.year }}-{{ item.time.month }}-{{ item.time.day }}</td>
        </tr>
      </table>
    </div>
    <div class="bottom">
      <button class="addImport" @click="addImportantWarn" v-if="ifAdd" ref="msg_add">
        <div class="add-icon"><span style="font-size: 1rem;margin-top: 0.1rem">+</span></div>
        <div class="addImport-text">新增重要预警</div>
      </button>
      <button v-else class="addImport-submit" @click="submit">确定</button>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {getWarningList, addImportantWarning} from "@/api/ApplicationScenarios/CampusSecurity";

export default {
  name: "index",
  props: {
    time: Object
  },
  data() {
    return {
      //是否处于添加重要预警状态挂载变量
      ifAdd: true,
    }
  },
  computed: {
    //获取预警列表
    ...mapState(['warningList'])
  },
  methods: {
    ...mapMutations(['setActiveWarning', 'setWarningList']),
    addImportantWarn() {
      this.ifAdd = false
    },
    //获取选中的预警并添加到重要预警列表
    submit() {
      let index = []
      this.ifAdd = true
      var input = document.getElementsByClassName('warn-ckb')
      for (let i = 0; i < input.length; i++) {
        if (input[i].checked) {
          index.push(i)
        }
      }
      addImportantWarning(this.time, index, this)
    },
  },
  watch: {
    //请求参数一旦改变  发起预警列表请求
    time: {
      handler(newVal) {
        getWarningList(this, newVal)
      },
      deep: true,
      immediate: true
    }
  },
  //页面挂载发起获取预警列表请求
  mounted() {
    getWarningList(this, this.time)
  }
}
</script>

<style scoped>
.add-icon {
  height: 1.14rem;
  width: 1.14rem;
  border: 1px solid #3B86FF;
  color: #3B86FF;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.2rem;
}

.list {
  height: 39.6rem;
}

.list-head {
  background: #F5F6FA;
  color: #A3A6B4;
}

.list-head-text {
  font-size: 0.88rem;
  height: 3.04rem;
  width: 9.32rem;
  font-weight: bold;
  text-align: center;
  vertical-align: center;
}

.list-item {
  background: white;
  color: #4D4F5C;
}

.list-item:hover {
  background: #F5F6FA;
}

.list-item-text {
  height: 3.04rem;
  width: 9.32rem;
  font-size: 0.88rem;
  text-align: center;
  vertical-align: middle;
}

.bottom {
  display: flex;
  flex-direction: row;
}

.addImport {
  display: flex;
  flex-direction: row;
  height: 1.89rem;
  width: 8rem;
  justify-content: center;
  align-items: center;
  border: 1px solid #3B86FF;
  border-radius: 0.2rem;
  margin: 0rem 0rem 1rem 20rem;
  background: white;
}

.addImport:hover {
  border-color: #3B6BB7;
}

.addImport:hover div {
  border-color: #3B6BB7;
  color: #3B6BB7;
}

.addImport-text {
  font-size: 0.87rem;
  font-weight: 400;
  color: #3B86FF;
}

.addImport-submit {
  display: flex;
  flex-direction: row;
  height: 1.89rem;
  width: 8rem;
  justify-content: center;
  align-items: center;
  border: 1px solid #3B86FF;
  border-radius: 0.2rem;
  margin: 0rem 0rem 1rem 20rem;
  background: #3B86FF;
  color: white;
}

.addImport-submit:hover {
  background: #266edd;
}

.warn-ckb {
  height: 0.6rem;
  width: 0.6rem;
}
</style>