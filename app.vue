<template lang="pug">
.flex.items-between
  NavbarMenu(v-if='mayShowMenu')
  Transition(name='fade', mode='out-in')
    .w-full.h-100dvh(:key='localeStore.locale')
      NuxtPage
ModalsNotifications
</template>
<script setup lang="ts">
const themeStore = useThemeStore()
const localeStore = useLocaleStore()

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
    fill: #fdba74;
    color: #fdba74;
    transition: all ease-in-out 0.2s;
  }
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  border-radius: 6px;
}

::-webkit-scrollbar-thumb {
  border-radius: 6px;
  cursor: pointer;
}

.light {
  ::-webkit-scrollbar-track {
    background: #e4e4e7;
  }

  ::-webkit-scrollbar-thumb {
    background: #71717a;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #71717a;
  }

  input:-internal-autofill-selected {
    background-color: lightblue;
  }
}

.dark {
  ::-webkit-scrollbar-track {
    background: #27272a;
  }

  ::-webkit-scrollbar-thumb {
    background: #71717a;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #71717a;
  }
}
</style>
