<template>
  <div>
    <div class="list">
      <form ref="checkbox">
        <table border="0" cellpadding="0" cellspacing="0" style="overflow: scroll">
          <tr class="list-head">
            <td class="list-head-text">内容</td>
            <td class="list-head-text">人数</td>
            <td class="list-head-text">时间</td>
          </tr>
          <tr class="list-item" v-for="(item,index) in importantWarning" :key="index" @click="setActiveWarning(item)">
            <td class="list-item-text"><input type="checkbox" :value="index" v-if="!ifSub" class="ipt-warn-ckb" style="margin-right: 0.36rem"/>{{ item.name }}</td>
            <td class="list-item-text">{{ item.num }}</td>
            <td class="list-item-text">{{ item.time.year }}-{{ item.time.month }}-{{ item.time.day }}</td>
          </tr>
        </table>
      </form>
    </div>
    <div class="bottom">
      <div class="addImport" @click="subImportantWarn" v-if="ifSub">
        <div class="sub-icon"><span style="margin-top: -0.16rem">-</span></div>
        <div class="addImport-text">删除我的重要预警</div>
      </div>
      <button v-else class="addImport" @click="submit" style="background: #3B86FF;color: white">确定</button>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  name: "index",
  data() {
    return {
      ifSub: true,
    }
  },
  computed: {
    ...mapState(['importantWarning'])
  },
  methods: {
    ...mapMutations(['setActiveWarning', 'subImportantWarning']),
    subImportantWarn() {
      this.ifSub = false
    },
    submit() {
      this.ifSub = true
      var input=document.getElementsByClassName('ipt-warn-ckb')
      for(let i=0;i<input.length;i++){
        if(input[i].checked){
          this.subImportantWarning(i)
        }
      }
      alert('删除成功!')
    }
  }
}
</script>

<style scoped>
.sub-icon{
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
  width: 10rem;
  justify-content: center;
  align-items: center;
  border: 1px solid #3B86FF;
  border-radius: 0.2rem;
  margin: 0.8rem 1rem 1rem 20rem;
}

.addImport-text {
  font-size: 0.87rem;
  font-weight: 400;
  color: #3B86FF;
}
</style>