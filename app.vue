<template lang="pug">
.root
  NavbarMenu(v-if='mayShowMenu')
  NuxtPage
  ModalsNotifications
</template>
<script setup lang="ts">
const themeStore = useThemeStore()

const bodyClass = computed(
  () =>
    `${themeStore.theme === 'light' ? 'bg-white' : 'bg-zinc-900'} ${themeStore.theme}`
)

const route = useRoute()
const localePath = useLocalePath()

const mayShowMenu = computed(() => !route.path.includes('auth'))

useHead({
  bodyAttrs: {
    class: bodyClass,
  },
})
</script>
<style lang="scss">
@use '~/assets/scss/animations.scss' as *;
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  transition: background-color 0.2s ease-in-out;

  * {
    outline: none;
  }

  input,
  label,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    transition: color 0.2s ease-in-out;
  }
}

.active-route {
  div {
    fill: #fb923c;
    color: #fb923c;
    transition: all ease-in-out 0.2s;
  }
}
</style>
