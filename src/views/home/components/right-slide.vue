<template>
  <div class="space-detail">
    <div class="item-title" style="height: 40px;padding-left: 0px">
      <img
        src="@/assets/images/opentiny-logo.png"
        alt="logo"
        style="width: 32px;margin-right: 5px"
      />
      <h5>Wiki</h5>
    </div>
    <TinyDivider />
    <span class="item-title"><TinyIconPublicHome /><RouterLink to="/">首页</RouterLink></span>
    <TinyDivider />
    <span class="item-title"><TinyIconDownload /><RouterLink to="/download">下载中心</RouterLink></span>
    <TinyDivider />
    <span class="item-title"><TinyIconWriting /><RouterLink to="/space/team">创作中心</RouterLink></span>
    <!-- <TinyDivider />
    <span class="item-title"><TinyIconApp /><RouterLink to="/space/team">团队空间</RouterLink></span>
    <TinyDivider />
    <span class="item-title"><TinyIconFiles /><RouterLink to="/space/book">知识空间</RouterLink></span>
    <TinyDivider />
    <span class="item-title"><TinyIconUser /><RouterLink to="/user/info">用户中心</RouterLink></span>
    <TinyDivider />
    <span class="item-title"><TinyIconSetting /><RouterLink to="/user/setting">用户设置</RouterLink></span> -->
    <TinyDivider />
    <span class="item-title"><TinyIconGroup /><RouterLink to="/about">关于我们</RouterLink></span>
    <TinyDivider />
    <span class="item-title" @click="help"><TinyIconHelpCircle />{{ $t('settings.navbar.help') }}</span>
    <!-- <TinyDivider />
    <span class="item-title" @click="logout"><TinyIconCheckOut />退出登录</span> -->
  </div>
</template>


<script lang="ts" setup>

import { Card as TinyCard, CardGroup as TinyCardGroup,
Tag as TinyTag, Popover as TinyPopover,
Divider as TinyDivider } from '@opentiny/vue';
import { IconDel, IconWriting, IconAscending, IconShare, IconInfoCircle,
IconDownload,IconHelpCircle,IconApp,IconFiles,IconGroup,IconSetting,IconCheckOut,
IconEyeopen, IconUser, IconCalendar, IconFontWeight, IconPushpin, IconPublicHome }
from '@opentiny/vue-icon'
import { ref, reactive, onBeforeMount, onMounted, nextTick, onBeforeUnmount, defineComponent } from 'vue'
import useUser from '@/hooks/user';

const { logout } = useUser();


const TinyIconFiles = IconFiles();
const TinyIconApp = IconApp();
const TinyIconGroup = IconGroup()
const TinyIconFontWeight = IconFontWeight()
const TinyIconSetting = IconSetting()
const TinyIconUser = IconUser()
const TinyIconHelpCircle = IconHelpCircle()
const TinyIconCheckOut = IconCheckOut()
const TinyIconDownload = IconDownload()
const TinyIconWriting = IconWriting()
const TinyIconPublicHome = IconPublicHome()

 // 帮助中心
const help = () => {
  window.location.href = 'https://www.yugongcoding.com/article?teamId=9&bookId=21&articleId=article20240713051049444660&id=30';
};

</script>

<style lang="less" scoped>
a {
  color: var(--color-text-1);
  text-decoration: none;
}
.title {
  display: flex;
  height: 50px;
  align-items: center;
}
.card-footer:deep(.tiny-svg) {
  margin-right: 5px;
}
.item-title {
  padding: 10px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #f5f6f7;
  }
}
.space-detail:deep(.tiny-svg) {
  margin-right: 6px;
}
.item-detail {
  margin-left: 20px;
  margin-top: 10px
}
.tiny-divider--horizontal {
  margin: 1px 0;
}
.space-detail {
  z-index: 999;
  box-shadow: 0 1px 4px -2px rgba(0, 0, 0, .13), 0 2px 8px 0 rgba(0, 0, 0, .08), 0 8px 16px 4px rgba(0, 0, 0, .04);
  background-color: white;
  padding: 1px 2px;
  width: 150px;
  display: flex;
  flex-direction: column;
}
</style>


