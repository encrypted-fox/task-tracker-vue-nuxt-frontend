<template lang="pug">
.auth.w-full.flex.flex-col.items-center.main-bg-styling.p-20px.box-border.pt-150px.overflow-y-auto(
  class='md:h-screen md:pt-0 md:flex-row md:justify-center'
)
  .auth__logo-container.relative.z-1.flex.flex-row.justify-between.items-center.bg-gray-700.w-full.h-50px.top-0(
    class='!fixed md:flex-col md:w-200px md:h-700px md:rounded-l-md md:!relative',
    ref='authLogo'
  )
    img.h-32px.w-32px.ml-20px(
      class='md:h-100px md:w-100px md:ml-0 md:mt-30px',
      src='@/assets/icons/logo.svg'
    )
    .flex.justify-between.gap-10px.mb-0.mr-20px(class='md:gap-15px md:mb-50px md:mr-0')
      .btn.btn-round-sm.fill-slate-50(@click='switchTheme')
        Transition(name='fade', mode='out-in')
          .icon(v-html='IconThemeDark', v-if='theme === "light"') 
          .icon(v-html='IconThemeLight', v-else) 
      .btn.btn-round-sm.fill-slate-50(@click='switchLanguage')
        .icon(v-html='IconTranslate') 

  .auth__form-container.box-border.w-full.min-h-screen.flex.justify-center.rounded-r-md(
    class='md:items-center md:w-500px md:min-h-0 md:h-700px md:initial-border-styling md:border-coloring',
    ref='authContent'
  )
    Transition(name='fade', mode='out-in')
      FormsLogin(
        @switch-to-register='switchToRegister',
        v-if='isLogin',
        key='login-form'
      )
      FormsRegister(
        @switch-to-login='switchToLogin',
        v-else,
        key='register-form'
      )
</template>

<script setup lang="ts">
import IconThemeDark from '~/assets/icons/theme-dark.svg?raw'
import IconThemeLight from '~/assets/icons/theme-light.svg?raw'
import IconTranslate from '~/assets/icons/translate.svg?raw'

const themeStore = useThemeStore()
const localeStore = useLocaleStore()

const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()

const authLogo = useState<HTMLElement | null>('authLogo', () => null)
const authContent = useState<HTMLElement | null>('authContent', () => null)

const isLogin = useState<boolean>('isLogin', () => true)

const theme = computed(() => themeStore.theme)

const switchTheme = () => {
  themeStore.changeTheme()
}

const switchLanguage = () => {
  localeStore.changeLocale()
}

const switchToRegister = () => {
  router.push({ path: localePath(`/auth`), query: { register: null }})

  authLogo.value?.classList.add('bounceLogoRight')
  authContent.value?.classList.add('bounceContentRight')
  authLogo.value?.classList.remove('bounceLogoLeft')
  authContent.value?.classList.remove('bounceContentLeft')

  isLogin.value = false
}

const switchToLogin = () => {
  router.push({ path: localePath(`/auth`), query: { login: null }})

  authLogo.value?.classList.add('bounceLogoLeft')
  authContent.value?.classList.add('bounceContentLeft')
  authLogo.value?.classList.remove('bounceLogoRight')
  authContent.value?.classList.remove('bounceContentRight')

  isLogin.value = true
}

onMounted(() => {
  if ('register' in route.query) {
    isLogin.value = false
    switchToRegister()
  } else if (!('login' in route.query)) {
    router.push({ path: localePath(`/auth`), query: { login: null }})
  }
})
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
