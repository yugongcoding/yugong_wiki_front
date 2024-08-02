<template>
  <div class="login-register-container">
    <tiny-form
      ref="ruleForm"
      :model="createData"
      :rules="rules"
      :validate-on-rule-change="isvalidate"
      :label-align="true"
      label-position="top"
      label-width="100px"
    >

      <!-- 邮箱 -->
      <tiny-form-item
        :label="$t('login.form.emailInput')"
        prop="email"
        size="medium"
      >
        <tiny-input
          v-model="createData.email"
          :placeholder="$t('login.form.registerEmail.placeholder')"
        ></tiny-input>
      </tiny-form-item>
      <!-- 验证码 -->
      <tiny-form-item
        :label="$t('login.form.code')"
        prop="code"
        size="small"
      >
        <div style="display: flex; align-items: center">

          <tiny-input
            v-model="createData.code"
            :placeholder="$t('login.form.verify.placeholder')"
          ></tiny-input>

          <tiny-button
            :disabled="disabled"
            :reset-time="0"
            style="height: 40px; width: 180px;margin-left: 10px"
            @click="getCode"
            >{{ verify }}</tiny-button
          >
        </div>
      </tiny-form-item>
      <!-- 用户名 -->
      <tiny-form-item
        :label="$t('login.form.usernameInput')"
        prop="username"
        size="medium"
      >
        <tiny-input
          v-model="createData.username"
          :placeholder="$t('login.form.registerUserName.placeholder')"
        ></tiny-input>
      </tiny-form-item>
      <!-- 密码 -->
      <tiny-form-item
        :label="$t('login.form.passwordInput')"
        prop="password"
        size="medium"
      >
        <tiny-input
          v-model="createData.password"
          :placeholder="$t('login.form.registerPassword.placeholder')"
          type="password"
          show-password
        ></tiny-input>
      </tiny-form-item>
      <tiny-form-item
        :label="$t('login.form.passwordConfirm')"
        prop="passwordConfirm"
        size="medium"
      >
        <tiny-input
          v-model="createData.passwordConfirm"
          :placeholder="$t('login.form.registerConfirmPassword.placeholder')"
          type="password"
          show-password
        ></tiny-input>
      </tiny-form-item>

      <div class="login-form-options">
        <tiny-link type="primary" @click="typeChange">{{
          $t('login.form.change')
        }}</tiny-link>
      </div>

      <tiny-form-item size="medium">
        <tiny-button
          type="primary"
          class="login-form-btn"
          :loading="loading"
          @click="handleSubmit"
          >{{ $t('login.form.register') }}</tiny-button
        >
      </tiny-form-item>
    </tiny-form>
  </div>
</template>

<script lang="ts" setup>
  import { inject, reactive, ref, computed, onBeforeUnmount } from 'vue';
  import {
    Form as TinyForm,
    FormItem as TinyFormItem,
    Input as TinyInput,
    Button as TinyButton,
    Link as TinyLink,
    Modal
  } from '@opentiny/vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { registerUser, getVerifyCode } from '@/api/user';




  // 注册
  const { t } = useI18n();
  const { loading, setLoading } = useLoading();
  const ruleForm = ref();

  // 验证码按钮文本
  const disabled = ref(false)
  const verify = ref(t('login.form.verify'))
  let verifyCodeTimer: any
  const timeLeft = ref(60)
  const getCode = async () => {
    if (/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(createData.email)) {
      disabled.value = true
      verify.value = t('login.form.code.again').concat(`(${timeLeft.value}s)`)
      verifyCodeTimer = setInterval(() => {
        if (timeLeft.value === 0) {
          clearInterval(verifyCodeTimer)
          disabled.value = false
          verify.value = t('login.form.code.again')
          timeLeft.value = 60
        } else {
          timeLeft.value -= 1
          verify.value = t('login.form.code.again').concat(`(${timeLeft.value}s)`)
        }
      }, 1000)
      Modal.message({
        status: 'info',
        message: t('login.form.code.sending'),
      })
      await getVerifyCode({email: createData.email})
      Modal.message({
        status: 'success',
        message: t('login.form.code.info'),
      })
    } else {
      Modal.message({
        status: 'error',
        message: t('login.form.checkMail'),
      })
    }


  }

  onBeforeUnmount(() => {
    clearInterval(verifyCodeTimer)
  })
  // 切换模式
  const handle: any = inject('handle');
  const handleForget: any = inject('handleForget');

  const typeChange = () => {
    handle(false);
    handleForget(false);
  };

  let createData = reactive({
    code: '',
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  });

  let isvalidate = ref(true);

  // 校验格式
  // const validatePass = (
  //   rule: any,
  //   value: string,
  //   callback: (arg?: Error) => void
  // ) => {
  //   if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,20}$/.test(value)) {
  //     callback(new Error(t('login.form.checkPassword')));
  //   } else {
  //     callback();
  //   }
  // };

  const validatePass = (
    rule: any,
    value: string,
    callback: (arg?: Error) => void
  ) => {
    if (value.length > 50 || value.length < 1) {
      callback(new Error(t('login.form.checkPassword')));
    } else {
      callback();
    }
  };

  const validateMail = (
    rule: any,
    value: string,
    callback: (arg?: Error) => void
  ) => {
    if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) {
      callback(new Error(t('login.form.checkMail')));
    } else {
      callback();
    }
  };
  const validateUserName = (
    rule: any,
    value: string,
    callback: (arg?: Error) => void
  ) => {
    if (value.length > 20 || value.length < 1) {
      callback(new Error(t('login.form.checkUsername')));
    } else {
      callback();
    }
  };
  const validateCode = (
    rule: any,
    value: string,
    callback: (arg?: Error) => void
  ) => {
    if (value.length > 6 || value.length < 1) {
      callback(new Error(t('login.form.checkCode')));
    } else {
      callback();
    }
  };
  const validatePassConfirm = (
    rule: any,
    value: string,
    callback: (arg?: Error) => void
  ) => {
    if (createData.password && createData.password !== value) {
      callback(new Error(t('login.form.confirmPassword')));
    } else {
      callback();
    }
  };

  const rules = computed(() => {
    return {
      code: [
        {
          required: true,
          message: t('login.form.code.errMsg'),
          trigger: 'blur',
        },
        { validator: validateCode, trigger: 'blur' },
      ],
      email: [
        {
          required: true,
          message: t('login.form.mailName.errMsg'),
          trigger: 'blur',
        },
        { validator: validateMail, trigger: 'blur' },
      ],
      username: [
        {
          required: true,
          message: t('login.form.userName.errMsg'),
          trigger: 'blur',
        },
        { validator: validateUserName, trigger: 'blur' },
      ],
      password: [
        {
          required: true,
          message: t('login.form.userpassword.errMsg'),
          trigger: 'blur',
        },
        { validator: validatePass, trigger: 'blur' },
      ],
      passwordConfirm: [
        {
          required: true,
          message: t('login.form.mailpassword2.errMsg'),
          trigger: 'blur',
        },
        { validator: validatePassConfirm, trigger: 'blur' },
      ],
    };
  });

  // 注册提交
  function handleSubmit() {
    ruleForm.value.validate(async (e: any) => {
      if (e) {
        let data: any = reactive({
          username: createData.username,
          password: createData.password,
          email: createData.email,
          code: createData.code
        });
        await registerUser(data);
        Modal.message({
          message: t('login.form.registerPass'),
          status: 'success',
        });
        handle(false);
      } else {
        Modal.message({
          message: t('login.form.registerError'),
          status: 'warning',
        });
      }
    });
  }
</script>

<style lang="less" scoped>
  .login-register-container {
    margin-top: -6%;
    margin-left: 6%;

    :deep(.tiny-input__inner) {
      height: var(--ti-input-medium-height);
      line-height: var(--ti-input-medium-height);
    }

    .tiny-form-item {
      margin-bottom: 20px;
    }

    &-container {
      width: 320px;
    }

    .login-form-options {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      margin-left: 65%;
    }

    .login-form-btn {
      display: block;
      width: 100%;
      max-width: 100%;
    }
  }

  // responsive
  @media (max-width: @screen-ms) {
    .login-register-container {
      margin-top: -10%;

      .tiny-form-item {
        margin-bottom: 5px;
      }

      .login-form-options {
        margin-bottom: 10px;
        margin-left: 50%;
      }
    }
  }
  @media (max-height: @screen-xs) {
    .login-register-container {
      margin-top: -15%;
    }
  }
</style>


<style lang="less" scoped>
@media (max-width: @screen-mm) {
  .login-register-container:deep(.tiny-form-item__label) {
    display: none;
  }
}
</style>
