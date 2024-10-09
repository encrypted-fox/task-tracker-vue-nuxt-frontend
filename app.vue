<template lang="pug">
.root
  PageMenu(v-if='isMenuShown')
  Transition(name='fade', mode='out-in')
    .page-container(:key='localeStore.locale')
      NuxtPage
ModalsNotifications
</template>
<script setup lang="ts">
const themeStore = useThemeStore()
const localeStore = useLocaleStore()

const bodyClass = computed(() => `${themeStore.theme}`)

const route = useRoute()
const localePath = useLocalePath()

const isMenuShown = computed(() => !route.path.includes('auth'))

useHead({
  bodyAttrs: {
    class: bodyClass,
  },
})
</script>
<style lang="scss">
@use '~/assets/scss/body.scss' as *;
</style>
