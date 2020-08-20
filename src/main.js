import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import VueECharts from 'vue-echarts'
import ECharts from 'echarts'
import './plugins/plugins'
import rem from './rem'

Vue.config.productionTip = false
Vue.component('v-chart',VueECharts)
Vue.prototype.$echarts=ECharts
Vue.prototype.$rem=rem

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
