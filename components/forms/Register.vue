<template lang="pug">
.w-350px.m-a.flex.flex-col.gap-20px
  .pb-25px.division-styling.border-0.border-b-2px
    h1.m-0.text-center.text-styling.text-2xl {{ $t('forms.register.register') }}

  form.flex.flex-col.gap-15px
    FieldsString(
      name='username',
      :label='$t("forms.common.username")',
      :placeholder='$t("forms.common.startTyping")',
      :value='username',
      :invalid='isUsernameTooShort',
      @input='changeUsername'
    )
      Transition(name='disappear-element', mode='out-in')
        .field-error(v-if='isUsernameTooShort')
          | {{ $t('messages.usernameError') }}

    FieldsString(
      name='email',
      :label='$t("forms.register.email")',
      :placeholder='$t("forms.common.emailPlaceholder")',
      :value='email',
      :invalid='isEmail',
      @input='changeEmail'
    )
      Transition(name='disappear-element', mode='out-in')
        .field-error(v-if='isEmail')
          | {{ $t('messages.emailError') }}

    FieldsString(
      name='password',
      type='password',
      :label='$t("forms.common.password")',
      :placeholder='$t("forms.common.startTyping")',
      :value='password',
      :invalid='isWeak || isPasswordNotMatch',
      @input='changePassword'
    )
      Transition(name='fade', mode='out-in')
        .field-errors(v-if='isWeak || isPasswordNotMatch')
          TransitionGroup(name='disappear-element')
            .field-error(v-for='val in currentErrors', :key='val')
              | {{ val }}

    FieldsString(
      name='repeatPassword',
      type='password',
      :label='$t("forms.register.repeatPassword")',
      :placeholder='$t("forms.common.startTyping")',
      :value='repeatPassword',
      :invalid='isPasswordNotMatch',
      @input='changeRepeatPassword'
    )

    .flex.justify-between
      .link(@click='switchToLogin') {{ $t('forms.common.toLogin') }}

  button.btn-lg.w-full.btn-primary(
    @click='submit',
    :disabled='isButtonDisabled'
  ) {{ $t('forms.common.toRegister') }}
</template>

<script setup lang="ts">
import type { AuthErrorMessages, AuthUser } from '~/types'

const emit = defineEmits(['switch-to-login'])

const appConfig = useAppConfig()

const username = useState<string>(() => '')
const email = useState<string>(() => '')
const password = useState<string>(() => '')
const repeatPassword = useState<string>(() => '')

const isWeak = useState<boolean>(() => false)
const isPasswordNotMatch = useState<boolean>(() => false)
const isUsernameTooShort = useState<boolean>(() => false)
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
  return Object.keys(errorMessages.value)
    .filter((el) => errorMessages.value[el] === true)
    .map((key) => getI18nMessage(`messages.passwordErrors.${key}`))
})

const isButtonDisabled = computed(() => {
  return (
    !username.value ||
    !password.value ||
    isWeak.value ||
    isUsernameTooShort.value ||
    isPasswordNotMatch.value
  )
})

const changeUsername = (val: string): void => {
  isUsernameTooShort.value = false

  if (val.length < 3) {
    isUsernameTooShort.value = true
  } else {
    isUsernameTooShort.value = false
  }

  username.value = val
}

const changeEmail = (val: string): void => {
  isEmail.value = false

  if (!val.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    isEmail.value = true
  } else {
    isEmail.value = false
  }

  email.value = val
}

const changePassword = (val: string): void => {
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

  if (!val.match(/(?=.*[!@#$&*\-^%])/)) {
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

const changeRepeatPassword = (val: string): void => {
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

const switchToLogin = (): void => {
  emit('switch-to-login')
}

const submit = async (): Promise<void> => {
  try {
    const response = await $fetch<AuthUser>(
      `${appConfig.backendUrl}/api/auth/register`,
      {
        method: 'POST',
        body: {
          username: username.value,
          email: email.value,
          password: password.value,
          repeatPassword: repeatPassword.value,
        },
      }
    )

    if (response) {
      useAuth(response, getI18nMessage('messages.registerSuccessMessage'))
    }
  } catch (e) {
    await useErrorHandler(e, getI18nMessage('messages.registerErrorMessage'))
  }
}

useHead({
  title: 'Регистрация',
})
</script>
