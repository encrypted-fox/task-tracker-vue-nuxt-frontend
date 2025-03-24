<template lang="pug">
ModalsDefault(:is-shown='isShown', @switch-is-shown='switchIsShown')
  template(v-slot:modal-header)
    h1.title.text-primary {{ $t(`pages.${path}.createItemTitle`) }}
    button.btn.btn-outline.icon.btn-round-sm.btn-secondary(
      @click='switchIsShown',
      v-html='IconClose'
    ) 

  template(v-slot:modal-content)
    FormsCreateItem

  template(v-slot:modal-footer)
    button.btn.btn-outline.btn-lg.btn-secondary(@click='switchIsShown') {{ $t('common.cancel') }}
    button.btn.btn-outline.btn-lg.btn-primary(
      @click='submit',
      :disabled='isButtonDisabled'
    ) {{ $t('common.createItemSubmitButtonTitle') }}
</template>

<script setup lang="ts">
import IconClose from '~/assets/icons/close.svg?raw'
import type { AuthUser } from '~/types'

defineProps<{
  isShown: boolean,
  path: string,
}>()

const appConfig = useAppConfig()
const notificationsStore = useNotificationsStore()

const emit = defineEmits<{ 'switch-is-shown': [] }>()

const text = useState<string>(() => '')

const isButtonDisabled = computed(() => !text.value)

const changeText = (val: string): void => {
  text.value = val
}

const switchIsShown = (): void => {
  emit('switch-is-shown')
}

const submit = async (): Promise<void> => {
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

<style lang="scss" scoped>
.title {
  margin: 0;

  font-size: 16px;
  line-height: 24px;
}
</style>
  