<template>
  <div class="navbar">
    <div class="collapse-button" v-show="router.currentRoute.value.path === '/article'">
      <div>
        <iconIconSandwichCollapse v-show="mobileStore.showCollapse" @click="mobileStore.CollapseMenu" style="width: 25px; height: 25px"/>
        <iconIconSandwichExpand v-show="!mobileStore.showCollapse" @click="mobileStore.ExpandMenu"  style="width: 25px; height: 25px"/>
      </div>
    </div>
    <div class="collapse-button" v-show="router.currentRoute.value.path !== '/article'">
      <div>
        <iconIconSandwichCollapse v-show="mobileStore.showManageCollapse"  @click="mobileStore.CollapseManageMenu" style="width: 25px; height: 25px"/>
        <iconIconSandwichExpand v-show="!mobileStore.showManageCollapse"  @click="mobileStore.ExpandManageMenu" style="width: 25px; height: 25px"/>
      </div>
    </div>
    <div class="left-side">
      <div style="display: flex; align-items: center">
        <img
          src="@/assets/images/opentiny-logo.png"
          alt="logo"
          @click="jumpUrl"
        />
        <h5 @click="jumpUrl">Wiki</h5>
        <!-- <div class="divider"></div> -->
        <!-- <img class="vue-icon" alt="logo" src="@/assets/images/pro.png" />
        <h4>YuGong</h4> -->
      </div>
    </div>
    <ul class="right-side">
      <ul class="right-menu">
          <li>
        <input
          id="navbar-search"
          class="input-icon"
          :placeholder="$t('setting.input.search')"
        />
      </li>
      <li><RouterLink to="/">首页</RouterLink></li>
      <li><RouterLink to="/space/team">团队空间</RouterLink></li>
      <li><RouterLink to="/space/book">知识空间</RouterLink></li>
      <li>
        <div class="divider"></div>
      </li>
      <li @click="changeLan">
        <span v-if="i18.locale.value === 'zhCN'">中文</span>
        <span v-else>English</span>
        <img src="@/assets/images/lan.png" alt="lan" class="navbar-lan" />
        <div v-if="lan" class="trigger-lan">
          <li
            v-for="(item, index) in locales"
            :key="index"
            :value="item.value"
            @click="changeLocale(locales[index].value)"
            >{{ item.label }}</li
          >
        </div>
      </li>

      <li>
        <span @click="help">{{ $t('settings.navbar.help') }}</span>
      </li>
      </ul>

      <!-- <li>
        <span @click="setVisible">{{ $t('settings.title') }}</span>
      </li> -->
      <li class="navbar-user" v-show="userStore.loginStatus">
        <tiny-user-head type="icon" round min>
          <div class="user-image">
            <tiny-user-head round v-model="userStore.avatar" type="image" alt="user" v-show="userStore.avatar"></tiny-user-head>
            <img src="@/assets/images/avatar.png" alt="user"  v-show="!(userStore.avatar)"/>
          </div>
        </tiny-user-head>
        <div class="trigger-user">
          <li
            v-for="(item, index) in userlist"
            :key="index"
            :value="item.label"
            @click="switchUser(item.value)"
          >
            <iconUser v-if="item.value === 2"></iconUser>
            <iconWriting v-if="item.value === 3"></iconWriting>
            <iconCheckOut v-if="item.value === 4"></iconCheckOut>
            <iconIconApp v-if="item.value === 5"></iconIconApp>
            <iconIconFiles v-if="item.value === 6"></iconIconFiles>
            {{ $t(item.label) }}
          </li>
        </div>
      </li>
      <li v-show="!(userStore.loginStatus)">
        <tiny-button type="primary" @click="login">登录/注册</tiny-button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { UserHead as TinyUserHead, Modal, Button as TinyButton } from '@opentiny/vue';
  import {
    IconReplace,
    IconUser,
    IconCheckOut,
    IconWriting,
  } from '@opentiny/vue-icon';
    import {
    IconApp,
    IconFiles,
    IconSandwichCollapse,
    IconSandwichExpand
  } from '@opentiny/vue-icon';
  import { useAppStore, useUserStore, articleStore, useMobileStore} from '@/store';
  import router from '@/router';
  import { LOCALE_OPTIONS } from '@/locale';
  import useLocale from '@/hooks/locale';
  import useUser from '@/hooks/user';

  const iconIconApp = IconApp();
  const iconIconFiles = IconFiles();
  const iconIconSandwichCollapse = IconSandwichCollapse();
  const iconIconSandwichExpand = IconSandwichExpand();

  const mobileStore = useMobileStore();


  const login = () => {
    router.push({path: '/login'})
  }
  const i18 = useI18n();
  const iconReplace = IconReplace();
  const iconUser = IconUser();
  const iconCheckOut = IconCheckOut();
  const iconWriting = IconWriting();
  const lan = ref(false);

  const appStore = useAppStore();
  const userStore = useUserStore();
  const { logout } = useUser();
  const { changeLocale } = useLocale();
  const locales = [...LOCALE_OPTIONS];

  // 切换语言
  const changeLan = () => {
    lan.value = !lan.value;
  };
  // 帮助中心
  const help = () => {
    window.location.href = 'https://www.yugongcoding.com/article?teamId=9&bookId=21&articleId=article20240713051049444660&id=30';
  };

  // 设置页面显示
  const setVisible = () => {
    appStore.updateSettings({ Settings: true });
  };

  // 用户设置
  const userlist = [
    { label: '团队空间', value: 5 },
    { label: '知识空间', value: 6 },
    // { label: 'messageBox.switchRoles', value: 1 },
    { label: 'messageBox.userCenter', value: 2 },
    { label: 'messageBox.userSettings', value: 3 },
    { label: 'messageBox.logout', value: 4 },
  ];

  const switchRoles = async () => {
    const res = await userStore.switchRoles();

    Modal.message({
      message: res as string,
      status: 'success',
    });
  };

  const switchUser = (e: number) => {
    switch (e) {
      case 5:
        router.push({ name: 'Team' });
        break;
      case 6:
        router.push({ name: 'Book' });
        break;
      case 2:
        router.push({ name: 'Info' });
        break;
      case 3:
        router.push({ name: 'Setting' });
        break;
      case 4:
        logout();
        break;
      default:
      // eslint-disable-next-line no-console
    }
  };

  // 点击图标跳转首页
  const jumpUrl = () => {
    window.location.href = `${window.location.protocol}//${window.location.host}`;
  };
</script>

<style scoped lang="less">
.collapse-button {
    margin-left: 20px;
    display: none;
  }
  .right-menu {
    display: flex;
  }
  .navbar {
    display: flex;
    justify-content: space-between;
    height: 100%;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid var(--color-border);
  }

  #navbar-search {
    width: 159px;
    height: 30px;
    padding: 14px;
    background-color: #eff1f7;
    background-position: 130px 8px;
    border: none;
    border-radius: 16px;
    outline: none;
  }

  .input-icon {
    background: url('@/assets/images/search.png') no-repeat scroll right center
      transparent;
  }

  .divider {
    width: 1px;
    height: 18px;
    margin: 0 2px;
    margin-top: 1px;
    background: #dfe1e6;
  }

  .left-side {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    padding-left: 10px;
    cursor: pointer;

    .vue-icon {
      width: 24px;
      height: 24px;
      margin-left: 30px;
    }

    h5 {
      margin: 0 30px 0 12px;
      color: var(--ti-base-common-title-color);
      font-weight: 700;
      font-size: 22px;
      line-height: 32px;
      letter-spacing: 0.55px;
    }

    h4 {
      width: 135px;
      height: 22px;
      margin-left: 10px;
      color: var(--ti-base-common-title-color);
      font-weight: normal;
      font-size: 16px;
      line-height: 22px;
      text-align: left;
    }
  }

  .right-side {
    display: flex;
    padding-right: 20px;
    list-style: none;
    align-items: center;

    :deep(.locale-select) {
      border-radius: 20px;
    }

    li {
      display: flex;
      align-items: center;
      padding: 0 15px;

      .item {
        display: inline-block;
        margin: 4px;
      }

      span {
        cursor: pointer;
      }

      span:hover {
        color: #2f5bea;
      }

      .navbar-lan {
        padding: 2px 0 0 2px;
      }
    }

    .user-image {
      display: flex;
      flex-direction: column;
      height: 100%;
      font-weight: 600;
      font-size: 2em;
      font-style: oblique;
      cursor: pointer;
      fill: var(--ti-common-color-line-active);
    }
    .user-image:deep(.tiny-user-head__portrait) {
      width: 30px;
      height: 30px;
    }

    a {
      color: var(--color-text-1);
      text-decoration: none;
    }

    .trigger-lan {
      position: absolute;
      bottom: -44px;
      width: 100px;
      margin-left: -35px;
    }

    .navbar-user {
      height: 60px;
      width: 60px;
      display: flex;
      align-items: center;
    }
    .navbar-user:hover > .trigger-user {
      display: inline-block;
    }

    .trigger-user {
      position: absolute;
      top: 50px;
      display: none;
      width: 100px;
      margin-left: -43px;
    }

    .trigger-user:hover {
      display: inline-block;
    }

    .trigger-user {
      li {
        display: flex;
        justify-content: space-around;
        padding: 6px;
        font-size: 12px;
        text-align: center;
        list-style-type: none;
        background-color: #fff;
        box-shadow: 0 0 2px 2px var(--ti-common-color-bg-normal);
        cursor: pointer;
      }

      li:hover {
        color: #2f5bea;
        background-color: #f5f6f7;
      }
    }

    .trigger-lan {
      li {
        display: block;
        padding: 6px;
        font-size: 12px;
        text-align: center;
        list-style-type: none;
        background-color: #fff;
        box-shadow: 0 0 2px 2px var(--ti-common-color-bg-normal);
        cursor: pointer;
      }

      li:hover {
        color: #2f5bea;
        background-color: #f5f6f7;
      }
    }
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-ms) {
    .collapse-button {
      display: block;
    }

    .left-side {
      img {
        width: 38px;
      }
    }

    .right-menu {
      display: none;
    }
  }

  @media (max-width: @screen-mm) {
    .collapse-button {
      display: block;
    }
    .left-side {
      img {
        width: 38px;
      }
    }

    .right-menu {
      display: none;
    }
  }
</style>
