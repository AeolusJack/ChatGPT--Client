<template>
  <div id="login">
    <div class="form">
      <h2 class="title">chatgpt</h2>
      <van-form @submit="onlogin" label-width="55">
        <van-cell-group inset>
          <van-field
            v-model="userLoginForm.username"
            name="用户名"
            label="用户名"
            placeholder="请输入用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="userLoginForm.password"
            name="密码"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>

        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            登陆
          </van-button>
          <div class="footerText">
            无账号，去 <span class="register" @click="onRegister">注册</span>
          </div>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { getCurrentInstance, reactive, ref } from "@vue/runtime-core";
import { login } from "@/service/home";

const userLoginForm = ref({
  username: "",
  password: "",
});
const store = useStore();
const router = useRouter();
//登录
async function onlogin() {
  const params = {
    username: userLoginForm.value.username,
    password: userLoginForm.value.password
  }
  let res = await login(params);
  if (res.data) {
    localStorage.setItem('token',res.data.token)
    localStorage.setItem('user',res.data.user)
    router.push({ path: "/type" });
  }
}
//获取用户信息
async function getUserInfo() {}

function onRegister() {
  router.push({ path: "/register" });
}
</script>
<!-- //APP.vue里写margin：0；padding：0； -->
<style lang="less" scoped>
@keyframes animate {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}
#login {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url(./../assets/homebg.jpeg) no-repeat;
  background-size: cover;
  background-color: #a7a8bd;
  color: white;
  .form {
    width: 80%;
    height: 50%;
    margin: 0 auto;
    padding: 50% 0;
    box-shadow: 1px;
    .title {
      text-align: center;
    }
  }
  .footerText {
    margin-top: 15px;
    width: 100%;
    text-align: center;
  }
  .register {
    color: #0096ff;
  }
}
</style>
