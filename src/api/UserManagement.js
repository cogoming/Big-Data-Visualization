import {url} from './main'
import axios from 'axios'

export function getUserList(obj) {
    let reqUrl = url + '/HomePage/UserManagement/UserList'
    axios.get(reqUrl).then((res) => {
        obj.userList1=[]
        obj.userList = res.data.userList
        for (let i=0;i<obj.userList.length;i++){
            obj.userList[i].ifEdit=false
        }
        sessionStorage.setItem('bdi_iot_userList',JSON.stringify(obj.userList))
    }).catch((err) => {
        console.log(err)
    })
}

export function changeUserInfo(obj, id, user) {
    let reqUrl = url + '/HomePage/UserManagement/Manage'
    let data = {id, user}
    let bool, errmsg = ''
    axios.post(reqUrl, data).then((res) => {
        bool = res.data.identify
        if (!bool) {
            errmsg = res.data.errmsg
        }
    }).catch((err) => {
        console.log(err)
    }).finally(() => {
        obj.change(bool, errmsg)
    })
}

export function queryUserById(obj, id) {
    let reqUrl = url + '/HomePage/UserManagement/Query'
    let data = {id}
    axios.post(reqUrl, data).then((res) => {
        if (res.data.identify) {
            obj.userList = [res.data.user]
            for (let i=0;i<obj.userList.length;i++){
                obj.userList[i].ifEdit=false
            }
            sessionStorage.setItem('bdi_iot_userList',JSON.stringify(obj.userList))
        } else {
            alert(res.data.errmsg)
        }
    }).catch((err) => {
        console.log(err)
    })
}

export function deleteUser(id) {
    let reqUrl = url + '/HomePage/UserManagement/Delete'
    let data = {id}
    axios.post(reqUrl, data).then((res) => {
        if (res.data.identify) {
            alert('删除成功！')
        } else {
            alert('删除失败！' + res.data.errmsg)
        }
    }).catch((err) => {
        console.log(err)
    })
}

export function changeUserPwd(id, pwd, newPwd) {
    let reqUrl = url + '/HomePage/UserManagement/Pwd'
    let data = {id, pwd, newPwd}
    axios.post(reqUrl, data).then((res) => {
        if (res.data.identify) {
            alert('修改成功')
        } else {
            alert('修改失败!' + res.data.errmsg)
        }
    })
}

