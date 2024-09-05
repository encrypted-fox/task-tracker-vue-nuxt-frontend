<template lang="pug">
Teleport(to='#teleports')
  Transition(name='fade', mode='out-in')
    .overlay(
      v-bind='$attrs',
      v-if='isShown',
      :key='`${isShown}-${route.path}-${localeStore.locale}`',
      :class='overlayClass'
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

const route = useRoute()
const localeStore = useLocaleStore()
</script>
