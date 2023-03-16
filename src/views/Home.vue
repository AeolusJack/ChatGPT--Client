<template>
  <div id="login" class="chatpage">
    <van-nav-bar title="chat" />
    <div class="content" ref="scrollDiv">
      <template v-for="(list, index) in list" :key="index">
        <div class="chat" v-if="list.chat">
          <div class="headericon">robot</div>
          <div class="content-text" v-if="type==='text'">{{ list.chat }}</div>
          <div class="content-img"  v-else><img :src="list.chat" alt="" ></div>
        </div>
        <div class="user" v-else>
          <div class="content-text">{{ list.user }}</div>
          <div class="headericon">me</div>
        </div>
      </template>
    </div>

    <div class="footer">
      <van-field
        v-model="val"
        rows="2"
        placeholder="请输入内容"
        @keyup.enter="submit"
      >
        <template #button>
          <van-button plain size="small" type="primary" @click="submit"
            >发送</van-button
          >
        </template>
      </van-field>
    </div>
  </div>
</template>

<script>
import { ElButton } from "element-plus";
import { getChatText, getImgAnswer } from "@/service/home";
export default {
  name: "App",
  components: {
    ElButton,
  },
  data() {
    return {
      val: "",
      list: [],
      type: "text",
      requestlist: [],
      titleName:{
        text: '聊天室',
        img: '画你所想',
        other: '其他'
      }
    };
  },
  created() {
    this.type = this.$route.query?.type || "text";
  },
  methods: {
    async submit() {
      if (!this.val) {
        return;
      }
      this.list.push({ user: this.val });
      
      switch (this.type) {
        case "text":
          this.getText();
          break;
        case "img":
          this.getImg();
          break;
        case "other":
          this.getOther();
          break;
        default:
          this.getText();
          break;
      }
      this.val = ''
    },
    async getImg() {
      const res = await getImgAnswer(this.val);
      let data = JSON.parse(res.data)
      this.list.push({ chat: data[0].url });
    },
    async getText() {
      let res = await getChatText(this.val);
      this.list.push({ chat: res.data });
      await this.$nextTick();
      this.$refs.scrollDiv.scrollTo({
        top: scrollElem.scrollHeight,
        behavior: "smooth",
      });
    },
    async getOther() {
      // let res = await getImgAnswer('we')
      // console.log(res,'=======');
    },
  },
};
</script>

<style lang="less" scoped>
.chatpage {
  width: 100%;
  height: 100vh;
  position: relative;
  .content {
    width: 100%;
    height: calc(100vh - 130px);
    overflow: scroll;
    word-break: break-word;
    padding: 20px 0 5px;

    .headericon {
      margin: 0 15px;
      width: 50px;
      height: 50px;
      min-width: 50px;
      background-color: peachpuff;
      border-radius: 10px;
      text-align: center;
      line-height: 50px;
      overflow: hidden;
    }
    .user {
      display: flex;
      justify-content: end;
      margin-bottom: 20px;
    }
    .chat {
      display: flex;
      width: 80%;
      margin-bottom: 20px;
    }
    .content-text {
      border-radius: 5px;
      background-color: antiquewhite;
      padding: 5px;
      border: 1px solid skyblue;
    }
    .content-img {
      width: 80%;
      >img {
        width: 100%;
        border-radius: 4px;
        overflow: hidden;
      }
    }
  }
  .footer {
    width: 100%;
    background-color: pink;
    position: fixed;
    bottom: 10px;
    border-top: 1px solid #eee;
  }
}
</style>
