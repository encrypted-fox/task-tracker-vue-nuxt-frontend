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
import type { AuthUser } from '~/types'
import { useErrorHandler } from '~/composables/useErrorHandler'
import { useAuth } from '~/composables/useAuth'

const emit = defineEmits(['switch-to-register'])

const notificationsStore = useNotificationsStore()

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
    const response = await $fetch<AuthUser>('/login', {
      method: 'POST',
      body: { login: login.value, password: password.value },
    })

    if (response) {
      useAuth(response, 'login')
    }
  } catch (e) {
    await useErrorHandler(e, 'login')
  }
}

useHead({
  title: 'Вход',
})
</script>
