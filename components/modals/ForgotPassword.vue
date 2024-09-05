<template lang="pug">
ModalsDefault(:is-shown='isShown')
  template(v-slot:modal-header)
    h1.m-0.text-styling.text-base {{ $t('modals.forgotPassword.passwordRecovery') }}
    .btn.btn-round-sm.btn-secondary(@click='changeIsShown')
      .icon(v-html='IconClose') 

  template(v-slot:modal-content)
    FieldsString(
      name='text',
      :label='$t("modals.forgotPassword.enterUsernameOrEmail")',
      :placeholder='$t("forms.common.startTyping")',
      :value='text',
      @input='changeText'
    )

  template(v-slot:modal-footer)
    button.btn-lg.btn-secondary(@click='changeIsShown') {{ $t('common.cancel') }}
    button.btn-lg.btn-primary(@click='submit', :disabled='isButtonDisabled') {{ $t('modals.forgotPassword.recover') }}
</template>

<script setup lang="ts">
import IconClose from '~/assets/icons/close.svg?raw'
import type { AuthUser } from '~/types'

defineProps<{
  isShown: boolean
}>()

const appConfig = useAppConfig()
const notificationsStore = useNotificationsStore()

const emit = defineEmits<{ changeIsShown: [] }>()

const text = useState<string>(() => '')

const isButtonDisabled = computed(() => !text.value)

const changeText = (val: string): void => {
  text.value = val
}

const changeIsShown = (): void => {
  emit('changeIsShown')
}

const submit = async (): void => {
  try {
    const response = await $fetch<AuthUser>(
      `${appConfig.backendUrl}/api/auth/forgot`,
      {
        method: 'POST',
        body: { usernameOrEmail: text.value },
      }
    )

    if (response) {
      notificationsStore.addNotification({
        message: getI18nMessage('messages.recoverySuccess'),
        type: 'success',
      })
    }
  } catch (e) {
    await useErrorHandler(e, getI18nMessage('messages.recoveryErrorMessage'))
  }
}
</script>
