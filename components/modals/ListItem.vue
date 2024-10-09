<template lang="pug">
ModalsDefault(:is-shown='isShown', @switch-is-shown='switchIsShown')
</template>

<script setup lang="ts">
const props = defineProps<{
  isShown: boolean
  data: {
    path: string
    id: number | string
  } | null
}>()

const emit = defineEmits<{ 'switch-is-shown': [] }>()

const switchIsShown = (): void => {
  emit('switch-is-shown')
}
</script>
