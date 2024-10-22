<template lang="pug">
.field
  label.field-label(:for='name', v-if='label') {{ label }}

  .field-container
    button.field-icon-prepend(
      v-html='iconPrepend',
      @click.prevent='actions[iconPrependAction]()',
      v-if='iconPrepend'
    )
    input.field-string(
      :class='{ "field-invalid": invalid, "field-input-icon-left": iconPrepend, "field-input-icon-right": iconAppend }',
      :id='name',
      :type='type',
      :placeholder='placeholder',
      :value='value',
      @input='input'
    )
    button.field-icon-append(
      v-html='iconAppend',
      @click.prevent='actions[iconAppendAction]()',
      v-if='iconAppend'
    )
    .field-errors(v-if='errors?.length')
      TransitionGroup(name='disappear-element')
        .field-error(v-for='error in errors', :key='error') {{ error }}
</template>

<script lang="ts" setup>
import IconClose from '~/assets/icons/close.svg?raw'

const props = defineProps<{
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
  errors?: Array<string>
}>()

const emit = defineEmits<{
  'input': [string]
  'switch-type': [string | undefined]
}>()

const input = (e: Event): void => {
  const val = (e.target as HTMLInputElement).value

  emit('input', val)
}

const switchType = () => {
  emit('switch-type', props.type)
}

const actions = {
  switchType
}
</script>

<style lang="scss" scoped>
@use '~/assets/scss/classes/components/field.scss' as *;
</style>
