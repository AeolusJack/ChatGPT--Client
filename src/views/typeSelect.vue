<template>
  <div class="header"> </div>
  <div class="type-select">
    <div v-for="(item, index) in list" :key="index" class="tab" @click="jump(item.type)" :class="[item.type]">
      <div class="box" >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const list = ref([{ name: "聊天室",type:'text' }, { name: "画你所想", type:'img'}, { name: "其他",type:'other' }]);
const jump = (type) => {
  router.push({ path: "/home",query:{
    type
  } });
};
</script>

<style lang="less" scoped>
.type-select {
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-gap: 15px;
  text-align: center;
  padding: 20px 15px;
}
.tab {
  width: 100%;
  padding: 20% 0;
  border-radius: 5px;
  overflow: hidden;
  color: white;
  font-size: 22px;
}
.text {
 background: url('@/assets/bg2.webp') no-repeat;
 background-size: cover;
}
.img {
 background: url('@/assets/bg3.png') no-repeat;
 background-size: cover;
}
.other {
 background: url('@/assets/bg4.png') no-repeat;
 background-size: cover;
}

.header {
  width: 100%;
  height: 200px;
  background: url('@/assets/bg1.avif') no-repeat;
  background-size: cover;
}
</style>
