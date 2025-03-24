<template lang="pug">
main.auth
  .auth__logo-container(:class='additionalAuthLogoClass', ref='authLogo')
    .auth__logo-container__logo.icon(v-html='IconLogo')
    .auth__logo-container__controls
      button.auth__logo-container__controls__btn.btn
        Transition(name='fade', mode='out-in')
          .auth__logo-container__controls__btn__icon.icon(
            v-html='IconThemeDark',
            @click='switchTheme',
            v-if='theme === "light"'
          ) 
          .auth__logo-container__controls__btn__icon.icon(
            v-html='IconThemeLight',
            @click='switchTheme',
            v-else
          ) 

      button.auth__logo-container__controls__btn.btn
        .auth__logo-container__controls__btn__icon.icon(
          v-html='IconTranslate',
          @click='switchLocale'
        )

  .auth__content(:class='additionalAuthContentClass', ref='authContent')
    Transition(name='fade', mode='out-in')
      FormsLogin(
        @switch-to-register='switchToRegister',
        v-if='route.query.type !== "register"',
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

const additionalAuthLogoClass = useState<string>(() =>
  route.query?.type !== 'register' ? '' : 'auth__logo-container--register'
)
const additionalAuthContentClass = useState<string>(() =>
  route.query?.type !== 'register' ? '' : 'auth__content--register'
)

const isLogin = useState<boolean>(
  'isLogin',
  () => route.query?.type !== 'register' || true
)

const theme = computed(() => themeStore.theme)

const switchTheme = (): void => {
  themeStore.changeTheme()
}

const switchLocale = (): void => {
  localeStore.changeLocale()

  additionalAuthLogoClass.value = route.query?.type !== 'register' ? '' : 'auth__logo-container--register'
  additionalAuthContentClass.value = route.query?.type !== 'register' ? '' : 'auth__content--register'
}

const switchToRegister = (): void => {
  navigateTo({ path: localePath(`/auth`), query: { type: 'register' } })

  authLogo.value?.classList.add('bounceLogoRight')
  authContent.value?.classList.add('bounceContentRight')
  authLogo.value?.classList.remove('bounceLogoLeft')
  authContent.value?.classList.remove('bounceContentLeft')
}

const switchToLogin = (): void => {
  navigateTo({ path: localePath(`/auth`), query: { type: 'login' } })

  authLogo.value?.classList.add('bounceLogoLeft')
  authContent.value?.classList.add('bounceContentLeft')
  authLogo.value?.classList.remove('bounceLogoRight')
  authContent.value?.classList.remove('bounceContentRight')
}

onMounted(() => {
  if (route.query?.type === 'register') {
  } else if (route.query?.type !== 'login') {
    router.push({ path: localePath(`/auth`), query: { type: 'login' } })
  }
})
</script>

// TODO tests and register page

<style lang="scss" scoped>
@use '~/assets/scss/utils/colors.scss' as *;
@use '~/assets/scss/classes/components/page.scss' as *;

.auth {
  width: 100%;
  padding: 70px 20px 20px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-y: auto;

  box-sizing: border-box;

  &__logo-container {
    height: 50px;
    width: 100%;

    position: fixed;
    top: 0;
    z-index: 15;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    background-color: $gray-700;

    box-sizing: border-box;

    &__logo {
      width: 30px;
      height: 30px;
      margin-left: 20px;
    }

    &__controls {
      margin: 0 20px 0 0;

      display: flex;
      justify-content: space-between;
      gap: 20px;

      &__btn {
        &__icon {
          height: 25px;
          width: 25px;
          padding: 2px;

          fill: $gray-50;
        }
      }
    }
  }

  &__content {
    width: 100%;

    display: flex;
    justify-content: center;

    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;

    box-sizing: border-box;
    overflow-y: auto;
  }
}

@media (min-width: 768px) {
  .auth {
    height: 100dvh;
    padding-top: 20px;

    flex-direction: row;
    justify-content: center;

    &__logo-container {
      height: 100%;
      width: 200px;

      position: relative;
      z-index: 1;

      flex-direction: column;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;

      &__logo {
        width: 100px;
        height: 100px;
        margin: 30px 0 0 0;
      }

      &__controls {
        margin: 0 0 50px 0;

        gap: 15px;
      }

      &--register {
        transform: translateX(500px);

        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
      }
    }

    &__content {
      height: 100%;
      width: 500px;
      padding: 50px 0;

      align-items: start;

      border: 2px solid $gray-300;

      transition: border 0.2s ease-in-out;

      &--register {
        transform: translateX(-200px);

        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  }

  .dark {
    .auth {
      &__content {
        border-color: $gray-700;
      }
    }
  }
}
</style>
