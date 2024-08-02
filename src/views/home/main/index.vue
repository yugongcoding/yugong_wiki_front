<template>
    <div class="main">
    <div class="introduction">
      <h1>免费开源     在线平台</h1>
      <h1>团队空间     知识空间</h1>

      <p>YuGongWiki是一款免费开源的在线知识协作平台</p>
      <p>可作为笔记本、团队文档协同、个人知识库等</p>
      <tiny-button type="primary" size="large" class="button" @click="click"><span>开始写作</span> <TinyIconArrowRight /></tiny-button>
    </div>
    <div class="introduction-image">
      <img src="@/assets/images/home/main_1.png" alt="">
    </div>
    </div>

    <div class="main">
      <div class="introduction">
        <h1>所见即所得</h1>
        <p>您的所有操作将立刻在页面呈现</p>
      </div>
      <div class="introduction-image">
        <img src="@/assets/images/home/main_2.png" alt="">
      </div>
    </div>

    <div class="main">
      <div class="introduction">
        <h1>数据安全</h1>
        <p>您的数据将安全存储在服务器</p>
      </div>
      <div class="introduction-image">
        <img src="@/assets/images/home/main_2.png" alt="">
      </div>
    </div>

    <div class="main">
      <div class="introduction">
        <h1>响应式设计 一端多用</h1>
        <p>适用于PC、Pad、移动端等多种设备</p>
      </div>
      <div class="introduction-image">
        <img src="@/assets/images/home/main_3.png" alt="">
      </div>
    </div>

    <div style="text-align: center;font-size: 25px;margin: 50px">
        <p>伟大的作品，不是靠力量而是靠坚持才完成的</p>
    </div>


</template>

<script setup>
import { Button as TinyButton } from '@opentiny/vue'
import { IconArrowRight } from '@opentiny/vue-icon'
import { useRoute, useRouter } from 'vue-router';


const router = useRouter()

const TinyIconArrowRight = IconArrowRight()
const click = () => {
  router.push({path: '/space/team'})
}
</script>

<style scoped lang="less">
.router-link-active {
    text-decoration: none;//去除默认样式
    color: grey;//高亮的颜色
  }
  a{
    text-decoration: none;
    color: grey;
  }

  // PC
.main {
  width: 80%;
  margin: 20px auto;
  padding: 20px 20px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.introduction {
  width: 300px;
  padding: 20px 20px;
  .button {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 150px;
  }
}
.introduction-image {
  width: calc(100% - 300px);
  img {
    box-shadow: 0 1px 4px -2px rgba(0, 0, 0, .13), 0 2px 8px 0 rgba(0, 0, 0, .08), 0 8px 16px 4px rgba(0, 0, 0, .04);
    border-radius: 10px;
    max-width: 100%;
  }
}
</style>


<style lang="less" scoped>
// 手机  pad
@media screen and (min-width: @screen-ms) and (max-width: @screen-ml) {
  .main {
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .introduction {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .introduction-image {
    display: flex;
    justify-content: center;
    width: 100%;
    img {
      max-width: 100%;
    }
  }
}
</style>



