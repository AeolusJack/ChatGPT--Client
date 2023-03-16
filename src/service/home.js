

import axios from '../utils/axios'
const serve = ''

// 登陆
export function login(params) {
  return axios.get(`${serve}/user/login`, { params })
 }
//注册
 export function signIn(params) {
  return axios.get(`${serve}/user/signIn`, { params })
 }
 // 校验用户名
 export function checksUser(params) {
  return axios.get(`${serve}/user/check`, { params })
 }
// 获取文字回复
export function getChatText(text) {
 return axios.get(`${serve}/chat/getChatText`, { params:{text} })
}
// 图片回复
export const getImgAnswer = (desc)=>{
 return axios.get(`${serve}/chat/creatImage`, { params:{desc} })
}
