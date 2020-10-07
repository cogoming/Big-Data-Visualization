import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //数据时延
        homePageDelay: 24 * 60 * 60 * 1000,
        warningList: [
            {
                name: '打架',
                num: 3,
                time: {
                    year: 2020,
                    month: 8,
                    day: 12,
                    h: 16,
                    m: 40,
                    s: 53
                },
                position: {
                    longitude: 114.40555,
                    latitude: 22.707533
                },
                videoUrl: '',
            },
            {
                name: '摔跤',
                num: 1,
                time: {
                    year: 2020,
                    month: 8,
                    day: 13,
                    h: 16,
                    m: 20,
                    s: 11
                },
                position: {
                    longitude: 114.406527,
                    latitude: 22.708076
                },
                viedoUrl: '',
            }
        ],
        activeWarning: {
            name: '打架',
            num: 3,
            time: {
                year: 2020,
                month: 8,
                day: 12,
                h: 16,
                m: 40,
                s: 53
            },
            position: {
                longitude: 114.40555,
                latitude: 22.707533
            },
            viedoUrl: '',
        },
        importantWarning: [
            {
                name: '打架',
                num: 3,
                time: {
                    year: 2020,
                    month: 8,
                    day: 12,
                    h: 16,
                    m: 40,
                    s: 53
                },
                position: {
                    longitude: 114.40555,
                    latitude: 22.707533
                },
                videoUrl: '',
            }
        ],
    },
    mutations: {
        //设置数据时延
        setHomePageDelay(state, num) {
            state.homePageDelay = num
        },
        setActiveWarning(state, activeWarning) {
            state.activeWarning = activeWarning
        },
        setWarningList(state, warningList) {
            state.warningList = warningList
        },
        setImportantWarning(state, importantWarning) {
            state.importantWarning = importantWarning
        },
    },
    actions: {},
    getters: {}
})