<template lang="pug">
.login
  .login__header.divider-primary
    h1.text-primary {{ $t('forms.login.login') }}

  form.login__form
    FieldsString(
      name='username',
      :label='$t("forms.common.username")',
      :placeholder='$t("forms.common.startTyping")',
      :value='username',
      @input='changeUsername'
    )
    FieldsString(
      name='password',
      :type='passwordFieldType',
      :label='$t("forms.common.password")',
      :placeholder='$t("forms.common.startTyping")',
      :value='password',
      :icon-append="IconEye",
      :icon-append-action="'switchType'",
      @input='changePassword',
      @switch-type='switchPasswordType'
    )
    .login__form__links
      .link(@click='switchIsForgotPasswordModalShown') {{ $t('forms.login.forgotPassword') }}
      .link(@click='switchToRegister') {{ $t('forms.common.toRegister') }}

  button.btn.btn-outline.btn-lg.btn-primary.btn-full(
    @click='submit',
    :disabled='isButtonDisabled'
  ) {{ $t('forms.common.toLogin') }}

  ModalsForgotPassword(
    :is-shown='isForgotPasswordModalShown',
    @switch-is-shown='switchIsForgotPasswordModalShown'
  )
</template>
<script setup lang="ts">
import type { AuthUser } from '~/types'
import IconEye from "~/assets/icons/eye.svg?raw"

const emit = defineEmits(['switch-to-register'])

const appConfig = useAppConfig()
const notificationsStore = useNotificationsStore()
const userStore = useUserStore()

const username = useState<string>(() => '')
const password = useState<string>(() => '')
const passwordFieldType = useState<string>(() => 'password')

const isForgotPasswordModalShown = useState<boolean>(() => false)

const isButtonDisabled = computed(() => {
  return !username.value || !password.value
})

const switchIsForgotPasswordModalShown = (): void => {
  isForgotPasswordModalShown.value = !isForgotPasswordModalShown.value
}

const changeUsername = (val: string): void => {
  username.value = val
}

const changePassword = (val: string): void => {
  password.value = val
}

const switchPasswordType = (type: string) => {
  if (type === 'password') passwordFieldType.value = 'text'
  else passwordFieldType.value = 'password'
}

const switchToRegister = (): void => {
  emit('switch-to-register')
}

const submit = async (): Promise<void> => {
  try {
    const response = await $fetch<AuthUser>(
      `${appConfig.backendUrl}/api/auth/login`,
      {
        method: 'POST',
        body: { username: username.value, password: password.value },
      }
    )

    if (response) {
      useAuth(response, getI18nMessage('messages.loginSuccessMessage'))
    }
  } catch (e) {
    await useErrorHandler(e, getI18nMessage('messages.loginErrorMessage'))
  }
}

const listenToKeys = (e: KeyboardEvent) => {
  if (e.code === 'Enter' && !isButtonDisabled.value) {
    submit()
  }
}

useHead({
  title: 'Вход',
})

onMounted(() => {
  window.addEventListener('keypress', listenToKeys)
})

onUnmounted(() => {
  window.removeEventListener('keypress', listenToKeys)
})
</script>

<style lang="scss" scoped>
.login {
  width: 350px;
  margin: auto;

  display: flex;
  flex-direction: column;
  gap: 20px;

  &__header {
    padding-bottom: 25px;

    h1 {
      margin: 0;

      text-align: center;
      font-size: 24px;
      line-height: 32px;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    &__links {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
