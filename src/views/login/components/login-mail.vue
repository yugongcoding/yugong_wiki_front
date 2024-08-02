<template>
  <div class="login-form-container">
    <tiny-form
      ref="loginFormMail"
      :model="loginMail"
      class="login-form"
      :rules="rules"
      validate-type="text"
      label-width="0"
      size="medium"
    >
      <tiny-form-item prop="mailname" size="medium">
        <tiny-input
          v-model="loginMail.mailname"
          :placeholder="$t('login.form.userName.placeholder')"
        >
        </tiny-input>
      </tiny-form-item>

      <tiny-form-item prop="mailpassword" size="medium">
        <tiny-input
          v-model="loginMail.mailpassword"
          type="password"
          show-password
          :placeholder="$t('login.form.mailpassword.placeholder')"
        >
        </tiny-input>
      </tiny-form-item>

      <div class="login-form-options">
        <tiny-checkbox
        v-model="loginMail.rememberPassword"
        name="tiny-checkbox"
        @change="rememberPasswordChange">{{ $t('login.form.rememberPassword') }}</tiny-checkbox>
        <div>
          <tiny-link type="primary" @click="forgetChange">
            {{ $t('login.form.forgetPassword') }}
          </tiny-link>
          <tiny-link type="primary" class="divide-line">|</tiny-link>
          <tiny-link type="primary" @click="typeChange">
            {{ $t('login.form.registration') }}
          </tiny-link>
        </div>
      </div>

      <tiny-form-item size="medium">
        <tiny-button
          type="primary"
          class="login-form-btn"
          :loading="loading"
          @click="handleSubmit"
          >{{ $t('login.form.login') }}</tiny-button
        >
      </tiny-form-item>
    </tiny-form>
  </div>
</template>

<script lang="ts" setup>
  import { inject, ref, reactive, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import {
    Form as TinyForm,
    FormItem as TinyFormItem,
    Input as TinyInput,
    Button as TinyButton,
    Checkbox as TinyCheckbox,
    Link as TinyLink,
    Modal
  } from '@opentiny/vue';
  import { useI18n } from 'vue-i18n';
  import { useUserStore } from '@/store';
  import useLoading from '@/hooks/loading';
  // import func from 'vue-temp/vue-editor-bridge';

  const router = useRouter();
  const { t } = useI18n();
  const { loading, setLoading } = useLoading();
  const userStore = useUserStore();
  const loginFormMail = ref();

  const rules = computed(() => {
    return {
      mailname: [
        {
          required: true,
          message: t('login.form.mailNamePhone.errMsg'),
          trigger: 'change',
        },
      ],
      mailpassword: [
        {
          required: true,
          message: t('login.form.mailpassword.errMsg'),
          trigger: 'change',
        },
      ],
    };
  });

  const loginMail = reactive({
    mailname: '',
    mailpassword: '',
    rememberPassword: localStorage.getItem('rememberPassword') === "true",
  });

  // 切换模式
  const handle: any = inject('handle');
  const handleForget: any = inject('handleForget');

  const typeChange = () => {
    handle(true);
  };
  const forgetChange = () => {
    handleForget(true);
  };
  function rememberPasswordChange(status: boolean) {
    localStorage.setItem('rememberPassword', status === true?"true":"false")
  }
  function handleSubmit() {
    loginFormMail.value?.validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }

      setLoading(true);

      try {
        await userStore.login({
          username: loginMail.mailname,
          password: loginMail.mailpassword,
        });
        Modal.message({
          message: t('login.form.login.success'),
          status: 'success',
        });
        const { redirect, ...othersQuery } = router.currentRoute.value.query;
        router.push({
          name: (redirect as string) || 'Team',
          query: {
            ...othersQuery,
          },
        });
      }finally {
        setLoading(false);
      }
    });
  }
</script>

<style lang="less" scoped>
  .login-form-container {
    margin-top: 5%;
  }

  .login-form {
    margin-left: 6%;

    .tiny-form-item {
      margin-bottom: 20px;
    }

    &-container {
      width: 320px;
    }

    &-options {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      font-size: 12px;
    }

    &-btn {
      display: block;
      width: 100%;
      max-width: 100%;
    }
  }

  .divide-line {
    margin: 0 5px;
  }
  // responsive
  @media (max-width: @screen-ms) {
    .login-form {
      margin-left: 5%;

      &-container {
        width: 240px;
      }
    }
  }
</style>
