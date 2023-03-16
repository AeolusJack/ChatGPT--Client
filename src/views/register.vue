<template>
  <div class="register">
    <van-nav-bar title="注册" />
    <van-form @submit="onRegiest" class="form" label-width="65">
      <van-cell-group inset>
        <van-field
          v-model="userForm.username"
          name="用户名"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
          @blur="checkUser"
        />
        <van-field
          v-model="userForm.password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        />
        <van-field
          v-model="userForm.phone"
          name="手机号码"
          label="手机号码"
          placeholder="请输入手机号码"
          :rules="[{ required: true, message: '请输入手机号码' }]"
        />

        <!-- <van-field
          v-model="userForm.code"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <van-button size="small" type="primary" @click="onGetCode">发送验证码</van-button>
          </template>
        </van-field> -->
      </van-cell-group>
      <div class="onregiestBtn">
         <van-button round block type="primary" native-type="submit">
        注册
      </van-button>
      </div>
     
    </van-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { signIn, checksUser } from '@/service/home'


const userForm = ref({ username: "", password:'',phone:'' });
const router = useRouter();
const nameRepeat = ref(false)

// const onGetCode = ()=>{
//   console.log(this.userForm.code);
// }

const onRegiest = async () => {
  if (nameRepeat) {
    showNotify({ type: "warning", message: "当前用户名已存在" });
    return 
  }
  const params = {
    username: userForm.value.username,
    password: userForm.value.password,
    phone: userForm.value.phone
  }
  let res = await signIn(params)
  localStorage.setItem('token',res.data)
  showNotify({ type: "success", message: "注册成功，跳转至详情页" });
  router.push({path:'/type'})
};
const checkUser = async ()=>{
  if (userForm.value.username) {
    let res = await checksUser({username:userForm.value.username})
    nameRepeat = res.data
  }
}

</script>

<style lang="less" scoped>
.register {
  width: 100vw;
  height: 100vh;
  background: url(./../assets/homebg.jpeg) no-repeat;
  background-size: cover;
  background-color: #a7a8bd;
}
.form {
  width: 80%;
  margin: 30% auto 0;
  background: white;
  padding: 30px;
  border-radius: 8px;
}
.onregiestBtn {
  width: 90%;
  margin: 20px auto 0;
}
</style>
