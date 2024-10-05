<template lang="pug">
ModalsDefault(:is-shown='isShown')
</template>

<script setup lang="ts">
const props = defineProps<{
  isShown: boolean
  data: {
    path: string
    id: number | string
  } | null
}>()
</script>
