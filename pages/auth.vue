<template lang="pug">
.auth.w-full.flex.flex-col.items-center.p-20px.box-border.pt-150px.overflow-y-auto(
  class='md:h-100dvh md:pt-20px md:flex-row md:justify-center'
)
  .relative.z-1.flex.flex-row.justify-between.items-center.bg-zinc-700.w-full.h-50px.top-0(
    class='!fixed md:flex-col md:w-200px md:h-100% md:max-h-700px md:rounded-l-md md:!relative',
    ref='authLogo'
  )
    img.icon.h-30px.w-30px.ml-20px(
      class='md:h-100px md:w-100px md:ml-0 md:mt-30px',
      src='@/assets/icons/logo.svg'
    )
    .flex.justify-between.gap-20px.mb-0.mr-20px(class='md:gap-15px md:mb-50px md:mr-0')
      Transition(name='fade', mode='out-in')
        .btn.icon.w-25px.h-25px.fill-zinc-50(
          v-html='IconThemeDark',
          @click='switchTheme',
          v-if='theme === "light"'
        ) 
        .btn.icon.w-25px.h-25px.fill-zinc-50(
          v-html='IconThemeLight',
          @click='switchTheme',
          v-else
        ) 

      .btn.icon.w-20px.h-20px.fill-zinc-50(
        v-html='IconTranslate',
        @click='switchLocale'
      )

  .box-border.w-full.flex.justify-center.rounded-r-md.overflow-y-auto(
    class='md:w-500px md:h-100% md:py-50px md:items-start md:initial-border-styling md:border-coloring',
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

const router = useRouter()
const route = useRoute()
const localePath = useLocalePath()

const authLogo = useState<HTMLElement | null>('authLogo', () => null)
const authContent = useState<HTMLElement | null>('authContent', () => null)

const isLogin = useState<boolean>('isLogin', () => true)

const theme = computed(() => themeStore.theme)

const switchTheme = () => {
  themeStore.changeTheme()
}

const switchLocale = () => {
  localeStore.changeLocale()
}

const switchToRegister = () => {
  router.push({ path: localePath(`/auth`), query: { register: null } })

  authLogo.value?.classList.add('bounceLogoRight')
  authContent.value?.classList.add('bounceContentRight')
  authLogo.value?.classList.remove('bounceLogoLeft')
  authContent.value?.classList.remove('bounceContentLeft')

  isLogin.value = false
}

const switchToLogin = () => {
  router.push({ path: localePath(`/auth`), query: { login: null } })

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
    router.push({ path: localePath(`/auth`), query: { login: null } })
  }
})
</script>

// TODO tests and register page
