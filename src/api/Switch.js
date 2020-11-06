import { url } from './main'
import axios from 'axios'

export function SwicthControl(num) {
  let reqUrl = url + '/HomePage/Switch'
  let data = {
    switchState: num
  }
  axios.post(reqUrl, data).then((res) => {
    alert(res.data.message)
  }).catch((e) => {
    console.log(e)
  })
}
