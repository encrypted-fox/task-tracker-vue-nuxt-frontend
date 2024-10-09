<template lang="pug">
Teleport(to='#teleports')
  Transition(name='fade', mode='out-in')
    dialog.overlay(
      v-bind='$attrs',
      v-if='isShown',
      ref='overlayRef',
      :key='`${isShown}-${route.path}-${localeStore.locale}`',
      :class='overlayClass',
      @click.stop='switchIsShown'
    )
      .modal(:class='modalClass')
        .modal-header(v-if='!hideHeader')
          slot(name='modal-header')
        .modal-content(v-if='!hideContent')
          slot(name='modal-content')
        .modal-footer(v-if='!hideFooter')
          slot(name='modal-footer')
</template>

<script setup lang="ts">
defineProps<{
  isShown: boolean
  hideHeader?: boolean
  hideContent?: boolean
  hideFooter?: boolean
  modalClass?: string
  overlayClass?: string
}>()

const emit = defineEmits<{ 'switch-is-shown': [] }>()

const route = useRoute()
const localeStore = useLocaleStore()

const overlayRef = useState<HTMLElement | null>()

const switchIsShown = (e: Event): void => {
  if (e.target !== overlayRef.value) return
  emit('switch-is-shown')
}
</script>

<style lang="scss" scoped>
@use '~/assets/scss/classes/components/modal.scss' as *;
</style>
