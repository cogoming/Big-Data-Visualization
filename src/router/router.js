import Router from 'vue-router'
import Vue from 'vue'
import HomePage from '../view/HomePage/HomePage'
import DeviceManagemnet from '../view/HomePage/DeviceManagement/index'
import UserManagement from '../view/HomePage/UserManagement/index'
import DataAnalysis from '../view/HomePage/DataAnalysis/index'
import Grafana from '../view/HomePage/Grafana'
import Home from '../view/HomePage/Home/index'
import SensingData from '../components/DataAnalysis/SensingData'
import TrajectoryData from '../components/DataAnalysis/TrajectoryData'
import LocationData from '../components/DataAnalysis/LocationData'
import ApplicationScenarios from '../view/HomePage/ApplicationScenarios'
import CampusSecurity from '../components/ApplicationScenarios/CampusSecurity'
import GymSecurity from '../components/ApplicationScenarios/GymSecurity'
import Warning from '../components/ApplicationScenarios/CampusSecurity/message/Warning'
import ImportantWarning from '../components/ApplicationScenarios/CampusSecurity/message/ImportantWarning'
import LoginPage from '../view/LoginPage'
import Login from '../components/LoginPage/login'
import Register from '../components/LoginPage/register'
import Elevator from '../components/ApplicationScenarios/Elevator'
import {url} from "@/api/main";
import axios from "axios";

Vue.use(Router)


const router = new Router(({
    mode: 'history',
    routes: [
        {
            path: '/LoginPage',
            component: LoginPage,
            children: [
                {
                    path: '/LoginPage/Login',
                    component: Login
                },
                {
                    path: '/LoginPage/Register',
                    component: Register
                },
                {
                    path: '',
                    redirect: '/LoginPage/Login'
                }
            ]
        },
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
                    path:'/HomePage/Grafana',
                    component: Grafana
                },
                {
                    path: '/HomePage/ApplicationScenarios',
                    component: ApplicationScenarios,
                    children: [
                        {
                            path: '/HomePage/ApplicationScenarios/CampusSecurity',
                            component: CampusSecurity,
                            children: [
                                {
                                    path: '/HomePage/ApplicationScenarios/CampusSecurity/Warning',
                                    component: Warning
                                },
                                {
                                    path: '/HomePage/ApplicationScenarios/CampusSecurity/ImportantWarning',
                                    component: ImportantWarning
                                },
                                {
                                    path: '',
                                    redirect: '/HomePage/ApplicationScenarios/CampusSecurity/Warning'
                                }
                            ]
                        },
                        {
                            path: '/HomePage/ApplicationScenarios/GymSecurity',
                            component: GymSecurity
                        },
                        {
                            path: '/HomePage/ApplicationScenarios/Elevator',
                            component: Elevator
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
        },
        {
            path: '/',
            redirect: '/LoginPage'
        }
    ]
}))

router.beforeEach((to, from, next) => {
    let path = ['/LoginPage/Login', '/LoginPage/Register', '/LoginPage']
    let check = path.includes(to.path)
    let bool1 = false
    if (check) {
        next();
    } else {
        let reqUrl = url + '/LoginPage/TokenCertify'
        axios.get(reqUrl).then((res) => {
            bool1 = res.data.identify
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            switch (bool1) {
                case true:
                    next();
                    break
                case false:
                    alert('请登录后重试！')
                    next('/LoginPage')
                    break
            }
        })
    }
});

export default router