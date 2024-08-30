<template lang="pug">
.field
  label.field-label(:for='password', v-if='label') {{ label }}
  input.field-string.w-full(
    :class='{ "!field-invalid": invalid }',
    :id='name',
    :type='type',
    :placeholder='placeholder',
    :value='value',
    @input='input'
  )
  slot
</template>

<script lang="ts" setup>
defineProps<{
  name: string
  value?: string
  placeholder?: string
  type?: string
  label?: string
  invalid?: boolean
}>()

const emit = defineEmits<{ input: [value: string] }>()

const input = (e: Event) => {
  const val = (e.target as HTMLInputElement).value

  emit('input', val)
}
</script>
