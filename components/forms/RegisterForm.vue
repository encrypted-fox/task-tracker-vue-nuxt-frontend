<template lang="pug">
.auth__form.flex.w-350px.flex-col.gap-20px
  .auth__form-header.pb-25px.division-styling.border-0.border-b-2px
    h1.auth__form__title.text-center.text-styling.m-0 Регистрация
  form.auth__form-content.flex.flex-col.gap-15px
    FieldsStringField(
      label='Логин',
      name='login',
      placeholder='Начните писать...',
      :value='login',
      :invalid='isLoginTooShort',
      @input='changeLogin'
    )
      Transition(name='disappear-element', mode='out-in')
        .field-error(v-if='isLoginTooShort')
          | {{ loginError }}

    FieldsStringField(
      label='Электронная почта',
      name='email',
      placeholder='example@example.com',
      :value='email',
      :invalid='isEmail',
      @input='changeEmail'
    )
      Transition(name='disappear-element', mode='out-in')
        .field-error(v-if='isEmail')
          | {{ emailError }}

    FieldsStringField(
      label='Пароль',
      name='password',
      placeholder='Начните писать...',
      type='password',
      :value='password',
      :invalid='isWeak || isPasswordNotMatch',
      @input='changePassword'
    )
      Transition(name='fade', mode='out-in')
        .field-errors(v-if='isWeak || isPasswordNotMatch')
          TransitionGroup(name='disappear-element')
            .field-error(v-for='val in currentErrors', :key='val.name')
              | {{ val.label }}

    FieldsStringField(
      label='Повторите пароль',
      name='repeatPassword',
      placeholder='Начните писать...',
      type='password',
      :value='repeatPassword',
      :invalid='isPasswordNotMatch',
      @input='changeRepeatPassword'
    )

  .auth__form-footer.flex.justify-between
    button.btn-lg.btn-secondary(@click='switchToLogin') Войти
    button.btn-lg.btn-primary(@click='submit', :disabled='isButtonDisabled') Зарегистрироваться
</template>

<script setup lang="ts">
import type { AuthErrorMessages, AuthUser } from '~/types'
import { passwordErrors, loginError, emailError } from '~/utils/messages'

const emit = defineEmits(['switch-to-login'])

const login = useState<string>(() => '')
const email = useState<string>(() => '')
const password = useState<string>(() => '')
const repeatPassword = useState<string>(() => '')

const isWeak = useState<boolean>(() => false)
const isPasswordNotMatch = useState<boolean>(() => false)
const isLoginTooShort = useState<boolean>(() => false)
const isEmail = useState<boolean>(() => false)

const errorMessages = useState<AuthErrorMessages>(() => ({
  no2UpperCase: false,
  no3LowerCase: false,
  no2Digits: false,
  noSpecialSign: false,
  no8Characters: false,
  noMatch: false,
}))

const currentErrors = computed(() => {
  return passwordErrors.filter((el) => {
    return errorMessages.value[el.name]
  })
})

const isButtonDisabled = computed(() => {
  return (
    !login.value ||
    !password.value ||
    isWeak.value ||
    isLoginTooShort.value ||
    isPasswordNotMatch.value
  )
})

const changeLogin = (val: string) => {
  isLoginTooShort.value = false

  if (val.length < 3) {
    isLoginTooShort.value = true
  } else {
    isLoginTooShort.value = false
  }

  login.value = val
}

const changeEmail = (val: string) => {
  isEmail.value = false

  if (!val.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    isEmail.value = true
  } else {
    isEmail.value = false
  }

  email.value = val
}

const changePassword = (val: string) => {
  isWeak.value = false

  if (!val.match(/(?=.*[A-ZА-Я].*[A-ZА-Я])/)) {
    isWeak.value = true
    errorMessages.value.no2UpperCase = true
  } else {
    errorMessages.value.no2UpperCase = false
  }

  if (!val.match(/(?=.*[0-9].*[0-9])/)) {
    isWeak.value = true
    errorMessages.value.no2Digits = true
  } else {
    errorMessages.value.no2Digits = false
  }

  if (!val.match(/(?=.*[a-zа-я].*[a-zа-я].*[a-zа-я])/)) {
    isWeak.value = true
    errorMessages.value.no3LowerCase = true
  } else {
    errorMessages.value.no3LowerCase = false
  }

  if (!val.match(/(?=.*[!@#$&*-^%"'()=+\\/#;)])/)) {
    isWeak.value = true
    errorMessages.value.noSpecialSign = true
  } else {
    errorMessages.value.noSpecialSign = false
  }

  if (!val.match(/.{8}/)) {
    isWeak.value = true
    errorMessages.value.no8Characters = true
  } else {
    errorMessages.value.no8Characters = false
  }

  if (val !== repeatPassword.value) {
    isPasswordNotMatch.value = true
    errorMessages.value.noMatch = true
  } else {
    isPasswordNotMatch.value = false
    errorMessages.value.noMatch = false
  }

  if (isWeak.value) console.log('weak')

  password.value = val
}

const changeRepeatPassword = (val: string) => {
  isPasswordNotMatch.value = false

  if (val !== password.value) {
    isPasswordNotMatch.value = true
    errorMessages.value.noMatch = true
  } else {
    isPasswordNotMatch.value = false
    errorMessages.value.noMatch = false
  }

  if (isPasswordNotMatch.value) console.log('weak')

  repeatPassword.value = val
}

const switchToLogin = () => {
  emit('switch-to-login')
}

const submit = async () => {
  try {
    const response = await $fetch<AuthUser>('/register', {
      method: 'POST',
      body: {
        login: login.value,
        email: email.value,
        password: password.value,
        repeatPassword: repeatPassword.value,
      },
    })

    if (response) {
      useAuth(response, 'register')
    }
  } catch (e) {
    await useErrorHandler(e, 'register')
  }
}

useHead({
  title: 'Регистрация',
})
</script>
