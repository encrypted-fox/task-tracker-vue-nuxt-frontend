<template lang="pug">
  TiptapEditorContent(:editor="editor" class="editor")
</template>
<script setup lang="ts">
//TODO: needs further extenting

const editor = useEditor({
  content: "<span>I'm running Tiptap with Vue.js. 🎉</span>",
  extensions: [TiptapStarterKit],
});

onBeforeUnmount(() => {
  unref(editor).destroy();
});

const emit = defineEmits(['update']);
</script>

<style lang="scss" scoped>
@use '~/assets/scss/utils/colors.scss' as *;

.editor {
 padding: 10px;
 border: 2px solid $gray-300;

 :deep(p) { 
  margin: 0 !important;
}
}
</style>
