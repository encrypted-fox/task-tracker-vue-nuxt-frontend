<template lang="pug">
.auth.w-full.flex.flex-col.items-center.main-bg-styling.p-20px.box-border.pt-150px.overflow-y-auto(
  class='md:h-screen md:pt-0 md:flex-row md:justify-center'
)
  .auth__logo-container.relative.z-1.flex.flex-row.justify-between.items-center.bg-gray-700.w-full.h-100px.top-0(
    class='!fixed md:flex-col md:w-200px md:h-700px md:rounded-l-md md:!relative',
    ref='authLogo'
  )
    img.h-50px.w-50px.ml-20px(
      class='md:h-100px md:w-100px md:ml-0 md:mt-30px',
      src='@/assets/icons/logo.svg'
    )
    .btn.btn-round-sm.fill-slate-50.mb-0(class='md:mb-50px', @click='switchTheme')
      Transition(name='fade', mode='out-in')
        .icon(v-html='IconThemeDark', v-if='theme === "light"') 
        .icon(v-html='IconThemeLight', v-else) 

  .auth__form-container.box-border.w-full.min-h-screen.flex.justify-center.rounded-r-md(
    class='md:items-center md:w-500px md:min-h-0 md:h-700px md:initial-border-styling md:border-coloring',
    ref='authContent'
  )
    Transition(name='fade-long', mode='out-in')
      FormsLoginForm(
        @switch-to-register='switchToRegister',
        v-if='isLogin',
        key='login-form'
      )
      FormsRegisterForm(
        @switch-to-login='switchToLogin',
        v-else,
        key='register-form'
      )
</template>

<script setup lang="ts">
import IconThemeDark from '~/assets/icons/theme-dark.svg?raw'
import IconThemeLight from '~/assets/icons/theme-light.svg?raw'

const themeStore = useThemeStore()

const authLogo = useState<HTMLElement | null>('authLogo', () => null)
const authContent = useState<HTMLElement | null>('authContent', () => null)

const isLogin = useState<boolean>('isLogin', () => true)

const theme = computed(() => themeStore.theme)

const switchTheme = () => {
  themeStore.changeTheme()
}

const switchToRegister = () => {
  authLogo.value?.classList.add('bounceLogoRight')
  authContent.value?.classList.add('bounceContentRight')
  authLogo.value?.classList.remove('bounceLogoLeft')
  authContent.value?.classList.remove('bounceContentLeft')

  isLogin.value = false
}

const switchToLogin = () => {
  authLogo.value?.classList.add('bounceLogoLeft')
  authContent.value?.classList.add('bounceContentLeft')
  authLogo.value?.classList.remove('bounceLogoRight')
  authContent.value?.classList.remove('bounceContentRight')

  isLogin.value = true
}
</script>

<style lang="scss" scoped>
.auth {
  &__logo {
    &-container {
      z-index: 1;
    }
  }
}
</style>

// TODO tests and register page
