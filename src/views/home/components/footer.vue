<template>
  <div class="footer">
      <div class="footer-left">
        <h1>Wiki</h1>
        <p>一款免费开源的在线知识协作平台</p>
        <div class="enter-group">
          <div class="group-image">
            <img src="@/assets/images/home/wechat.jpg" alt="">
            <span>微信群</span>
          </div>
          <div class="group-image">
            <img src="@/assets/images/home/wechat_enterprise.jpg" alt="">
            <span>企业微信群</span>
          </div>
          <div style="color: grey">
            <p>微信扫码入群了解更多</p>
            <p>共同交流，一同成长</p>
          </div>
        </div>
      </div>
      <div class="footer-right">
        <div>
          <p>产品</p>
          <p><RouterLink to="/">产品简介</RouterLink></p>
          <p><RouterLink to="/download">下载中心</RouterLink></p>
        </div>
        <div>
          <p>关于</p>
          <p><RouterLink to="/about">关于我们</RouterLink></p>
        </div>

        <div >
          <p>联系我们</p>
          <p style="color: grey"><WechatOutlined /> zs1710695204</p>
          <p style="color: grey"><PhoneOutlined /> 15913848494</p>
          <p style="color: grey"><MailOutlined /> zs13128488417@gmail.com</p>

        </div>
      </div>
  </div>
  <div class="beian">
    <div>
      <span style="color: grey">©2024 Wiki   ICP备案号：</span><a href="https://beian.miit.gov.cn/" target="_blank">豫ICP备2023032267号</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button as TinyButton } from '@opentiny/vue'
import { defineComponent } from 'vue';
import {
  WechatOutlined,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons-vue';
import { IconArrowRight } from '@opentiny/vue-icon'
import { useRoute, useRouter } from 'vue-router';


 defineComponent({
  components: {
    WechatOutlined,
    MailOutlined,
    PhoneOutlined
  },
});

</script>


<style scoped lang="less">
.footer {
  background-color: #fafafa;
  width: 100%;
  padding: 20px 10%;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  .footer-left {
    width: 400px;
    flex: 1 1;
    .enter-group {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        width: 100px;
      }
      div {
        margin: 10px;
      }
      .group-image {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span {
          font-size: 0.8rem;
          color: grey;
        }
      }
    }
  }
  .footer-right {
    display: flex;
    align-items: flex-start;
    justify-content: space-evenly;
    width: calc(100% - 400px);
    div {
      margin: 10px;
    }
  }
}
.beian {
  height: 20px;
  margin: 40px 0 20px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}
a {
    color: #585a5a;
    outline: none;
    text-decoration: none;
    -webkit-tap-highlight-color: #585a5a;
    -webkit-user-select: none;
    -moz-user-focus: none;
    -moz-user-select: none;
}
</style>


<style lang="less" scoped>
// 手机  pad
@media screen and (min-width: @screen-ms) and (max-width: @screen-ml) {
  .footer {
    flex-direction: column;
    align-items: flex-start;
    .footer-left {
      width: 100%;
    }
    .footer-right {
      width: 100%;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
    .enter-group {
      flex-wrap: wrap;
      justify-content: flex-start;
    }
  }
  .footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
