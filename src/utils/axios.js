
import axios from 'axios'
import { showToast, showFailToast } from 'vant'
import { setLocal } from '@/common/js/utils'
import router from '../router'

console.log('import.meta.env', import.meta.env)

axios.defaults.baseURL = import.meta.env.MODE == 'development' ? '//124.223.14.239/chatgpt-server/' : '//124.223.14.239/chatgpt-server/'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use(res => {
  if (typeof res.data !== 'object') {
   showFailToast('服务端异常！')
    return Promise.reject(res)
  }
  if (res.data.code == 'ACK') {
    console.log(res.data.data)
    if (res.data.message) showFailToast(res.data.message)
    if (res.data.code == 'NACK') {
      router.push({ path: '/login' })
    }
    if (res.data.data && window.location.hash == '#/login') {
      setLocal('token', res.data.data)
      axios.defaults.headers['token'] = res.data.data
    }
    //权限控制暂时去掉
    //return Promise.reject(res.data)
  }
 
  return res.data
})

export default axios
