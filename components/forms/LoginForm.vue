<template lang="pug">
.auth__form.flex.w-350px.flex-col.gap-20px
  .auth__form-header.pb-25px.division-styling.border-0.border-b-2px
    h1.auth__form__title.text-center.text-styling.m-0 Вход

  form.auth__form-content.flex.flex-col.gap-15px
    FieldsStringField(
      label='Логин',
      name='login',
      placeholder='Начните писать...',
      :value='login',
      @input='changeLogin'
    )
    FieldsStringField(
      label='Пароль',
      name='password',
      placeholder='Начните писать...',
      type='password',
      :value='password',
      @input='changePassword'
    )
    .link(@click='changePasswordModalShown') Забыли пароль?

  .auth__form-footer.flex.justify-between
    button.btn-lg.btn-secondary(@click='switchToRegister') Зарегистрироваться
    button.btn-lg.btn-primary(@click='submit', :disabled='isButtonDisabled') Войти

  ModalsForgotPasswordModal(
    :isShown='isPasswordModalShown',
    @changeIsShown='changePasswordModalShown'
  )
</template>
<script setup lang="ts">
const emit = defineEmits(['switch-to-register'])

const login = useState<string>(() => '')
const password = useState<string>(() => '')

const isPasswordModalShown = useState<boolean>(() => false)

const isButtonDisabled = computed(() => {
  return !password.value || !login.value
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

useHead({
  title: 'Вход',
})
</script>
