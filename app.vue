<template>
  <div>
    <NuxtRouteAnnouncer />
  </div>
  <NuxtPage />
</template>
<script setup lang="ts">
const themeStore = useThemeStore()

const theme = computed(() => themeStore.theme)

useHead({
  bodyAttrs: {
    class: theme,
  },
})
</script>
<style lang="scss">
@use '~/assets/scss/animations.scss' as *;
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  * {
    outline: none;
  }
}
</style>
