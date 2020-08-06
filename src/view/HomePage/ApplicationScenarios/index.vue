<template>
  <div>
    <div class="application-scenarios">
      <Tabs :Tabs="Tabs"/>
      <router-view class="view-application-scenarios"></router-view>
    </div>
  </div>
</template>

<script>
import Tabs from '../../../components/Tabs'

export default {
  name: "index",
  components: {Tabs},
  data() {
    return {
      //配置Tab栏组件
      Tabs: [
        {
          name: '校园安全',
          to: '/HomePage/ApplicationScenarios/CampusSecurity'
        },
        {
          name: '健身房安全',
          to: '/HomePage/ApplicationScenarios/GymSecurity'
        }
      ]
    }
  }
}
</script>

<style scoped>
.application-scenarios {
  width: 92rem;
  height: 53rem;
  border-radius: 1rem;
  margin: 1.5rem 0 0 2rem;
}

.view-application-scenarios {
  width: 92rem;
  border-radius: 1rem;
  margin: 1rem 0 0 0;
  background: white;
}
</style>