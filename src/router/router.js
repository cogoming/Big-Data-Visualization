import Router from 'vue-router'
import Vue from 'vue'
import HomePage from '../view/HomePage/HomePage'
import DeviceManagemnet from '../view/HomePage/DeviceManagement/index'
import UserManagement from '../view/HomePage/UserManagement/index'
import DataAnalysis from '../view/HomePage/DataAnalysis/index'
import Home from '../view/HomePage/Home/index'
import SensingData from '../components/SensingData'
import TrajectoryData from '../components/TrajectoryData'
import LocationData from '../components/LocationData'
import ApplicationScenarios from '../view/HomePage/ApplicationScenarios'
import CampusSecurity from '../components/CampusSecurity'
import GymSecurity from '../components/GymSecurity'
import DeviceList from '../components/DeviceList'
import DeviceEdit from '../components/DeviceEdit'
import DeviceAdd from '../components/DeviceAdd'
import Warning from '../components/CampusSecurity/message/Warning'
import ImportantWarning from '../components/CampusSecurity/message/ImportantWarning'

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
                children: [
                    {
                        path:'/HomePage/DeviceManagement/DeviceList',
                        component: DeviceList
                    },
                    {
                        path:'/HomePage/DeviceManagement/DeviceEdit',
                        component: DeviceEdit
                    },
                    {
                        path: '/HomePage/DeviceManagement/DeviceAdd',
                        component: DeviceAdd
                    },
                    {
                        path:'',
                        redirect: '/HomePage/DeviceManagement/DeviceList'
                    }
                ]
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