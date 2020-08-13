import Router from 'vue-router'
import Vue from 'vue'
import HomePage from '../view/HomePage/HomePage'
import DeviceManagemnet from '../view/HomePage/DeviceManagement/index'
import UserManagement from '../view/HomePage/UserManagement/index'
import DataAnalysis from '../view/HomePage/DataAnalysis/index'
import Home from '../view/HomePage/Home/index'
import SensingData from '../components/DataAnalysis/SensingData'
import TrajectoryData from '../components/DataAnalysis/TrajectoryData'
import LocationData from '../components/DataAnalysis/LocationData'
import ApplicationScenarios from '../view/HomePage/ApplicationScenarios'
import CampusSecurity from '../components/ApplicationScenarios/CampusSecurity'
import GymSecurity from '../components/ApplicationScenarios/GymSecurity'
import Warning from '../components/ApplicationScenarios/CampusSecurity/message/Warning'
import ImportantWarning from '../components/ApplicationScenarios/CampusSecurity/message/ImportantWarning'
Vue.use(Router)

const router = new Router(({
    mode: 'history',
    routes: [
        {
            path: '/HomePage',
            component: HomePage,
            children: [{
                path: '/HomePage/DeviceManagement',
                component: DeviceManagemnet,
            },
                {
                    path: '/HomePage/Home',
                    component: Home
                },
                {
                    path: '/HomePage/ApplicationScenarios',
                    component: ApplicationScenarios,
                    children: [
                        {
                            path: '/HomePage/ApplicationScenarios/CampusSecurity',
                            component:CampusSecurity,
                            children:[
                                {
                                    path:'/HomePage/ApplicationScenarios/CampusSecurity/Warning',
                                    component:Warning
                                },
                                {
                                    path:'/HomePage/ApplicationScenarios/CampusSecurity/ImportantWarning',
                                    component:ImportantWarning
                                },
                                {
                                    path:'',
                                    redirect:'/HomePage/ApplicationScenarios/CampusSecurity/Warning'
                                }
                            ]
                        },
                        {
                            path: '/HomePage/ApplicationScenarios/GymSecurity',
                            component:GymSecurity
                        },
                        {
                            path: '',
                            redirect: '/HomePage/ApplicationScenarios/CampusSecurity'
                        }
                    ]
                },
                {
                    path: '/HomePage/DataAnalysis',
                    component: DataAnalysis,
                    children: [
                        {
                            path: '/HomePage/DataAnalysis/SensingData',
                            component: SensingData
                        },
                        {
                            path: '/HomePage/DataAnalysis/TrajectoryData',
                            component: TrajectoryData
                        },
                        {
                            path: '/HomePage/DataAnalysis/LocationData',
                            component: LocationData
                        },
                        {
                            path: '',
                            redirect: '/HomePage/DataAnalysis/SensingData'
                        }
                    ]
                },
                {
                    path: '/HomePage/UserManagement',
                    component: UserManagement
                },
                {
                    path: '',
                    redirect: '/HomePage/Home'
                }]
        }, {
            path: '/',
            redirect: '/HomePage'
        }
    ]
}))

export default router