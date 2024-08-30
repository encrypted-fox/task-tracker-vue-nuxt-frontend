<template lang="pug">
Teleport(to='#teleports')
  Transition(name='fade', mode='out-in')
    .overlay(v-if='isShown')
      .modal
        .modal-header
          slot(name='modal-header')
        .modal-content
          slot(name='modal-content')
        .modal-footer
          slot(name='modal-footer')
</template>

<script setup lang="ts">
defineProps<{
  isShown: boolean
}>()
</script>
