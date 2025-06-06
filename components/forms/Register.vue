<template lang="pug">
.register
  .register__header.divider-primary
    h1.text-primary {{ $t('forms.register.register') }}

  form.register__form
    FieldsString(
      name='username',
      :label='$t("forms.common.username")',
      :placeholder='$t("forms.common.startTyping")',
      :value='username',
      :invalid='isUsernameTooShort',
      :errors='usernameErrors',
      @input='changeUsername'
    )

    FieldsString(
      name='email',
      :label='$t("forms.register.email")',
      :placeholder='$t("forms.common.emailPlaceholder")',
      :value='email',
      :invalid='isNotEmail',
      :errors='emailErrors',
      @input='changeEmail'
    )

    FieldsString(
      name='password',
      :type='passwordFieldType',
      :label='$t("forms.common.password")',
      :placeholder='$t("forms.common.startTyping")',
      :value='password',
      :invalid='isWeak || isPasswordNotMatch',
      :errors='currentErrors',
      :icon-append="IconEye",
      :icon-append-action="'switchType'",
      @input='changePassword'
      @switch-type='switchPasswordType'
    )

    FieldsString(
      name='repeatPassword',
      :type='repeatPasswordFieldType',
      :label='$t("forms.register.repeatPassword")',
      :placeholder='$t("forms.common.startTyping")',
      :value='repeatPassword',
      :invalid='isPasswordNotMatch',
      :icon-append="IconEye",
      :icon-append-action="'switchType'",
      @input='changeRepeatPassword'
      @switch-type='switchRepeatPasswordType'
    )

    .register__form__links
      .link(@click='switchToLogin') {{ $t('forms.common.toLogin') }}

  button.btn.btn-outline.btn-lg.btn-primary.btn-full(
    @click='submit',
    :disabled='isButtonDisabled'
  ) {{ $t('forms.common.toRegister') }}
</template>

<script setup lang="ts">
import type { AuthErrorMessages, AuthUser } from '~/types'
import IconEye from "~/assets/icons/eye.svg?raw"

const emit = defineEmits(['switch-to-login'])

const appConfig = useAppConfig()

const username = useState<string>(() => '')
const email = useState<string>(() => '')
const password = useState<string>(() => '')
const passwordFieldType = useState<string>(() => 'password')
const repeatPassword = useState<string>(() => '')
const repeatPasswordFieldType = useState<string>(() => 'password')

const isWeak = useState<boolean>(() => false)
const isPasswordNotMatch = useState<boolean>(() => false)
const isUsernameTooShort = useState<boolean>(() => false)
const isNotEmail = useState<boolean>(() => false)

const errorMessages = useState<AuthErrorMessages>(() => ({
  no2UpperCase: false,
  no3LowerCase: false,
  no2Digits: false,
  noSpecialSign: false,
  no8Characters: false,
  noMatch: false,
}))

const usernameErrors = computed(() => {
  if (isUsernameTooShort.value)
    return [getI18nMessage('messages.usernameError')]
  else return []
})

const emailErrors = computed(() => {
  if (isNotEmail.value) return [getI18nMessage('messages.emailError')]
  else return []
})

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
  isNotEmail.value = false

  if (!val.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    isNotEmail.value = true
  } else {
    isNotEmail.value = false
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

const switchPasswordType = (type: string) => {
  if (type === 'password') passwordFieldType.value = 'text'
  else passwordFieldType.value = 'password'
}

const switchRepeatPasswordType = (type: string) => {
  if (type === 'password') repeatPasswordFieldType.value = 'text'
  else repeatPasswordFieldType.value = 'password'
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

const listenToKeys = (e: KeyboardEvent) => {
  if (e.code === 'Enter' && !isButtonDisabled.value) {
    submit()
  }
}

useHead({
  title: getI18nMessage('pages.auth.register.title'),
})

onMounted(() => {
  window.addEventListener('keypress', listenToKeys)
})

onUnmounted(() => {
  window.removeEventListener('keypress', listenToKeys)
})
</script>

<style lang="scss" scoped>
.register {
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
