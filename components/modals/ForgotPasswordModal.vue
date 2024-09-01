<template lang="pug">
ModalsDefaultModal(:isShown='isShown')
  template(v-slot:modal-header)
    h1.title.text-styling.m-0.text-base Восстановление пароля
    .btn.btn-round-sm.btn-secondary(@click='changeIsShown')
      .icon(v-html='IconClose') 

  template(v-slot:modal-content)
    FieldsStringField(
      label='Введите логин или электронную почту',
      name='text',
      placeholder='Начните писать...',
      :value='text',
      @input='changeText'
    )

  template(v-slot:modal-footer)
    button.btn-lg.btn-secondary(@click='changeIsShown') Отмена
    button.btn-lg.btn-primary(@click='submit', :disabled='isButtonDisabled') Восстановить
</template>

<script setup lang="ts">
import IconClose from '~/assets/icons/close.svg?raw'
import type { AuthUser } from '~/types'
import { recoverySuccessMessage } from '~/utils/messages'

defineProps<{
  isShown: boolean
}>()

const notificationsStore = useNotificationsStore()

const emit = defineEmits<{ changeIsShown: [] }>()

const text = useState<string>(() => '')

const isButtonDisabled = computed(() => !text.value)

const changeText = (val: string) => {
  text.value = val
}

const changeIsShown = () => {
  emit('changeIsShown')
}

const submit = async () => {
  try {
    const response = await $fetch<AuthUser>('/login', {
      method: 'POST',
      body: { loginOrEmail: text.value },
    })

    if (response) {
      notificationsStore.addNotification({
        message: recoverySuccessMessage,
        type: 'success',
      })
    }
  } catch (e) {
    await useErrorHandler(e, 'recovery')
  }
}
</script>
