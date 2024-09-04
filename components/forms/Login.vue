<template lang="pug">
.w-350px.m-a.flex.flex-col.gap-20px
  .pb-25px.division-styling.border-0.border-b-2px
    h1.m-0.auth__form__title.text-center.text-styling {{ $t('forms.login.login') }}

  form.flex.flex-col.gap-15px
    FieldsString(
      name='login',
      :label='$t("forms.common.username")',
      :placeholder='$t("forms.common.startTyping")',
      :value='login',
      @input='changeLogin'
    )
    FieldsString(
      name='password',
      type='password',
      :label='$t("forms.common.password")',
      :placeholder='$t("forms.common.startTyping")',
      :value='password',
      @input='changePassword'
    )
    .link(@click='changePasswordModalShown') {{ $t('forms.login.forgotPassword') }}

  .flex.justify-between
    button.btn-lg.btn-secondary(@click='switchToRegister') {{ $t('forms.common.toRegister') }}
    button.btn-lg.btn-primary(@click='submit', :disabled='isButtonDisabled') {{ $t('forms.common.toLogin') }}

  ModalsForgotPassword(
    :isShown='isPasswordModalShown',
    @changeIsShown='changePasswordModalShown'
  )
</template>
<script setup lang="ts">
import type { AuthUser } from '~/types'

const emit = defineEmits(['switch-to-register'])

const notificationsStore = useNotificationsStore()
const userStore = useUserStore()

const login = useState<string>(() => '')
const password = useState<string>(() => '')

const isPasswordModalShown = useState<boolean>(() => false)

const isButtonDisabled = computed(() => {
  return !login.value || !password.value
})

const changePasswordModalShown = () => {
  isPasswordModalShown.value = !isPasswordModalShown.value
}

const changeLogin = (val: string) => {
  login.value = val
}

const changePassword = (val: string) => {
  password.value = val
}

const switchToRegister = () => {
  emit('switch-to-register')
}

const submit = async () => {
  try {
    const response = await $fetch<AuthUser>(
      `${appConfig.backendUrl}/api/auth/login`,
      {
        method: 'POST',
        body: { login: login.value, password: password.value },
      }
    )

    if (response) {
      useAuth(response, getI18nMessage('messages.loginSuccessMessage'))
    }
  } catch (e) {
    await useErrorHandler(e, getI18nMessage('messages.loginErrorMessage'))
  }
}

useHead({
  title: 'Вход',
})
</script>
