import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import VueECharts from 'vue-echarts'
import ECharts from 'echarts'
import './plugins/plugins'
import rem from './rem'
import axios from 'axios'

Vue.config.productionTip = false
Vue.component('v-chart', VueECharts)
Vue.prototype.$echarts = ECharts
Vue.prototype.$rem = rem

axios.interceptors.request.use(
    config => {
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        let token = localStorage.getItem('bdi_iot_token')
        config.headers.Authorization = token;
        return config;
    },
    error => {
        return Promise.reject(error);
    });

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app')


