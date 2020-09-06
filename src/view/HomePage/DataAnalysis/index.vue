<template>
  <div>
    <div class="data-analysis">
      <Tabs :Tabs="Tabs" style="width: 80.99rem"/>
      <router-view class="view-data-analysis"></router-view>
    </div>
  </div>
</template>

<script>
import Tabs from '../../../components/Normal/Tabs'

export default {
  name: "index",
  components: {Tabs},
  data() {
    return {
      //配置Tab栏组件
      Tabs:[
        {
          name:'传感数据可视化',
          to:'/HomePage/DataAnalysis/SensingData'
        },
        {
          name:'轨迹数据可视化',
          to:'/HomePage/DataAnalysis/TrajectoryData'
        },
        {
          name:'位置数据可视化',
          to:'/HomePage/DataAnalysis/LocationData'
        }
      ]
    }
  }

}
</script>

<style scoped>
.data-analysis {
  width: 80.99rem;
  height: 53rem;
  border-radius: 1rem;
  margin: 1.5rem 1rem 0 5.06rem;
}

.view-data-analysis {
  width: 83.99rem;
  border-radius: 1rem;
  margin: 1rem 0 0 0;
  background: white;
}

</style>