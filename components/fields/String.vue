<template lang="pug">
.field
  label.field-label(:for='name', v-if='label') {{ label }}

  .field-container
    .field-icon-prepend(
      v-html='iconPrepend',
      @click='iconPrependAction',
      v-if='iconPrepend'
    )
    input.field-string.w-full(
      :class='{ "!field-invalid": invalid, "pl-40px": iconPrepend, "pr-40px": iconAppend }',
      :id='name',
      :type='type',
      :placeholder='placeholder',
      :value='value',
      @input='input'
    )
    .field-icon-append(
      v-html='iconAppend',
      @click='iconPrependAction',
      v-if='iconAppend'
    )
    slot
</template>

<script lang="ts" setup>
import IconClose from '~/assets/icons/close.svg?raw'

defineProps<{
  name: string
  value?: string
  placeholder?: string
  iconPrepend?: string
  iconAppend?: string
  iconPrependAction?: string
  iconAppendAction?: string
  type?: string
  label?: string
  invalid?: boolean
}>()

const emit = defineEmits<{ input: [value: string] }>()

const input = (e: Event): void => {
  const val = (e.target as HTMLInputElement).value

  emit('input', val)
}
</script>
