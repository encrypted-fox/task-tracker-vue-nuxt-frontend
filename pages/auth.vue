<template lang="pug">
.auth.h-screen.w-full.flex.justify-center.items-center.main-bg-styling.p-20px.box-border.flex-col(class="md:flex-row")
  .auth__logo-container.flex.items-center.bg-gray-700.w-full.h-100px.top-0(class="!fixed md:justify-center md:!items-start md:w-200px md:h-650px md:rounded-l-md md:!relative" ref="authLogo")
    img.h-50px.w-50px.ml-20px(@click="$router.push({path: '/'})" class="md:h-100px md:w-100px md:ml-0 md:mt-30px" src="@/assets/icons/logo.svg")
  .auth__form-container.box-border.w-full.h-650px.flex.justify-center.items-center.rounded-r-md.mt-100px(class="md:mt-0 md:w-600px md:initial-border-styling md:border-coloring" ref="authContent")
    Transition(name='fade-long' mode="out-in")
      FormsLoginForm(@switch-to-register="switchToRegister" v-if="isLogin" key="login-form")
      FormsRegisterForm(@switch-to-login="switchToLogin" v-else key="register-form")
      
</template>

<script setup lang="ts">
const authLogo = useState<HTMLElement | null>('authLogo', () => null)
const authContent = useState<HTMLElement | null>('authContent', () => null)

const isLogin = useState<boolean>('isLogin', () => true)

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
@use '~/assets/scss/animations.scss' as *;

.auth {
  &__logo {
    &-container {
      position: relative;
      z-index: 1;
    }
  }
}
</style>

// TODO tests and register page