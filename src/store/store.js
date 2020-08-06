import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        //数据时延
        homePageDelay:24*60*60*1000
    },
    mutations:{
        //设置数据时延
        setHomePageDelay(state,num){
            state.homePageDelay=num
        }
    },
    actions:{

    },
    getters:{

    }
})