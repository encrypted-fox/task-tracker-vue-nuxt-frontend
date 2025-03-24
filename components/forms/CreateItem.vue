<template lang="pug">
.create
  FieldsString(
    name='text',
    :label='""',
    :placeholder='$t("forms.common.startTyping")',
    :value='text',
    @input='changeText'
  )
  FieldsEditor
</template>

<script setup lang="ts">
import type { AuthUser } from '~/types'
import IconEye from "~/assets/icons/eye.svg?raw"

const editor = useEditor({
  content: "I'm running Tiptap with Vue.js. 🎉",
  extensions: [TiptapStarterKit],
});

onBeforeUnmount(() => {
  unref(editor).destroy();
});

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
  title: getI18nMessage('pages.auth.login.title'),
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
