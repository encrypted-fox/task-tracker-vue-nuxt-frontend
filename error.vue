<template lang="pug">
Transition(name='fade', mode='out-in')
  main.page.page--error
    .error
      h1.error__status-code.text-primary {{ error?.statusCode }}
      h1.error__title.text-primary {{ $t('messages.ordinaryErrorMessage') }}
      button.btn.btn-xl.btn-full.btn-primary(@click='handleError') {{ $t('common.returnHome') }}
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const themeStore = useThemeStore()

const localePath = useLocalePath()

const bodyClass = useState<string>(() => `${themeStore.theme}`)

const handleError = () => {
  bodyClass.value = ''

  clearError({ redirect: localePath('/') })
}

useHead({
  bodyAttrs: {
    class: bodyClass,
  },
})
</script>

<style lang="scss" scoped>
@use '~/assets/scss/body.scss' as *;
@use '~/assets/scss/classes/components/page.scss' as *;

.error {
  margin: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  &-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__status-code {
    margin: 0;

    font-size: 150px;
    line-height: 158px;
  }

  &__title {
    margin: 0;

    font-size: 30px;
    line-height: 38px;

    text-align: center;
  }
}

.page {
  &--error {
    padding: 20px !important;
  }
}
</style>
