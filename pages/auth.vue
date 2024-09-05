<template lang="pug">
.auth.w-full.p-20px.pt-70px.flex.flex-col.items-center.overflow-y-auto.box-border(
  class='md:h-100dvh md:pt-20px md:flex-row md:justify-center'
)
  .w-full.h-50px.fixed.top-0.z-15.flex.flex-row.justify-between.items-center.bg-zinc-700(
    class='md:w-200px md:h-100% md:relative md:z-1 md:flex-col md:rounded-l-md',
    ref='authLogo'
  )
    .icon.w-30px.h-30px.ml-20px(
      class='md:w-100px md:h-100px md:ml-0 md:mt-30px',
      v-html='IconLogo'
    )
    .mb-0.mr-20px.flex.justify-between.gap-20px(class='md:gap-15px md:mb-50px md:mr-0')
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

      .btn.icon.h-25px.w-25px.fill-zinc-50(
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
import IconLogo from '~/assets/icons/logo.svg?raw'
import IconThemeDark from '~/assets/icons/theme-dark.svg?raw'
import IconThemeLight from '~/assets/icons/theme-light.svg?raw'
import IconTranslate from '~/assets/icons/translate.svg?raw'

const themeStore = useThemeStore()
const localeStore = useLocaleStore()

const router = useRouter()
const route = useRoute()
const localePath = useLocalePath()

const authLogo = useState<HTMLElement | null>(() => null)
const authContent = useState<HTMLElement | null>(() => null)

const isLogin = useState<boolean>('isLogin', () => true)

const theme = computed(() => themeStore.theme)

const switchTheme = (): void => {
  themeStore.changeTheme()
}

const switchLocale = (): void => {
  localeStore.changeLocale()
}

const switchToRegister = (): void => {
  navigateTo({ path: localePath(`/auth`), query: { type: 'register' } })

  authLogo.value?.classList.add('bounceLogoRight')
  authContent.value?.classList.add('bounceContentRight')
  authLogo.value?.classList.remove('bounceLogoLeft')
  authContent.value?.classList.remove('bounceContentLeft')

  isLogin.value = false
}

const switchToLogin = (): void => {
  navigateTo({ path: localePath(`/auth`), query: { type: 'login' } })

  authLogo.value?.classList.add('bounceLogoLeft')
  authContent.value?.classList.add('bounceContentLeft')
  authLogo.value?.classList.remove('bounceLogoRight')
  authContent.value?.classList.remove('bounceContentRight')

  isLogin.value = true
}

onMounted(() => {
  if (route.query?.type === 'register') {
    isLogin.value = false
    switchToRegister()
  } else if (route.query?.type !== 'login') {
    router.push({ path: localePath(`/auth`), query: { type: 'login' } })
  }
})
</script>

// TODO tests and register page
