<template>
   <div id="login">
       <h3 align="center"> Chat </h3><br />
       <p align="center">
           <label>输入自然语言描述：</label><br>
           <textarea style="height: 500px;width: 900px;;" type="text" v-model="contentInput" /><br>
          
       </p>
       <p align="center"><button @click="submit">提交</button></p>
       
   </div>
</template>

<script>
import { ElButton } from 'element-plus'
import { getChatText } from '@/service/home'
import axios from '../utils/axios'
export default {
name: 'App',
components: {
   ElButton
},
data() {
   return {
      contentInput: "",
   }
},
methods: {
   submit() {
        // var data =  getChatText({ text: this.contentInput })  
       var params={ text: this.contentInput}
       axios.get('/chat/getChatText', { params }).then((response) => {
       this.contentInput = response.data
          
    });

      
   },
}
}
</script>

<style>
#app {
font-family: 'Avenir', Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: #2c3e50;
margin-top: 0px;
}
</style>


