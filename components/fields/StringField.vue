<template lang="pug">
.field
  label.field-label(:for="props.password" v-if="props.label") {{props.label}}
  input.field-string.w-full(:class="{'!field-invalid': invalid}" :id="props.name" :type="props.type" :placeholder="props.placeholder" :value="props.value" @input="input")
  slot
</template>

<script lang="ts" setup>
const props = defineProps<{
  name: string
  value?: string,
  placeholder?: string,
  type?: string,
  label?: string,
  invalid?: boolean
}>()

const emit = defineEmits<{input: [value: string]}>()

const input = (e: Event) => {
  const val = (e.target as HTMLInputElement).value;

  emit('input', val)
}

</script>