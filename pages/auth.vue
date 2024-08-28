<template lang="pug">
.auth.h-100vh.w-100.flex.justify-center.items-center
  .auth__logo-container.flex.w-200px.h-550px.justify-center.items-flex-start.left-radius-6(ref="authLogo")
    img.mt-50.h-100px.w-100px(src="@/assets/icons/logo.svg")
  .auth__form-container.w-600px.h-550px.flex.justify-center.items-center.right-radius-6(ref="authContent")
    Transition(name='fade-long' mode="out-in")
      LoginForm(@switch-to-register="switchToRegister" v-if="isLogin")
      RegisterForm(@switch-to-login="switchToLogin" v-else)
      
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
@use '~/assets/scss/colors.scss' as *;
@use '~/assets/scss/animations.scss' as *;

.auth {
  &__logo {
    &-container {
      background-color: $dark-blue-grey;
      position: relative;
      z-index: 1;
    }
  }

  &__form {
      &-container {
      border: 1px solid $grey;
      box-sizing: border-box;
    }
  }
}
</style>

// TODO tests and register page