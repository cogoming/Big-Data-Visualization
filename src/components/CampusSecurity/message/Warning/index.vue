<template>
  <div>
    <div class="list">
      <table border="0" cellpadding="0" cellspacing="0" style="overflow: scroll">
        <tr class="list-head">
          <td class="list-head-text">内容</td>
          <td class="list-head-text">人数</td>
          <td class="list-head-text">时间</td>
        </tr>
        <tr class="list-item" v-for="(item,index) in warningList" :key="index" @click="setActiveWarning(item)">
          <td class="list-item-text">{{item.name}}</td>
          <td class="list-item-text">{{item.num}}</td>
          <td class="list-item-text">{{item.time.year}}-{{item.time.month}}-{{item.time.day}}</td>
        </tr>
      </table>
    </div>
    <div class="bottom">
      <div class="addImport">
        <img src="../../../../assets/img/添加.svg" alt="">
        <div class="addImport-text">新增我的重要预警</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name: "index",
  computed:{
    ...mapState(['warningList'])
  },
  methods:{
    ...mapMutations(['setActiveWarning'])
  }
}
</script>

<style scoped>
.list{
  height: 39.6rem;
}
.list-head{
  background:#F5F6FA ;
  color: #A3A6B4;
}
.list-head-text{
  font-size: 0.88rem;
  height: 3.04rem;
  width: 9.32rem;
  font-weight: bold;
  text-align: center;
  vertical-align: center;
}
.list-item{
  background: white;
  color: #4D4F5C;
}
.list-item:hover{
  background: #F5F6FA;
}
.list-item-text{
  height: 3.04rem;
  width: 9.32rem;
  font-size: 0.88rem;
  text-align: center;
  vertical-align: middle;
}
.bottom{
  display: flex;
  flex-direction: row;
}
.addImport{
  display: flex;
  flex-direction: row;
  height: 1.89rem;
  width: 9.39rem;
  justify-content: center;
  align-items: center;
  border:1px solid #3B86FF;
  border-radius: 0.2rem;
  margin: 0 1rem 1rem 20rem;
}
.addImport-text{
  font-size:0.88rem;
  font-weight:400;
  color: #3B86FF;
}
</style>