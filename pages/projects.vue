<template lang="pug">
main.page
  PageHeader(
    :isItemsFolded='isItemsFolded',
    :title='$t("pages.projects.title")',
    :search='search',
    :is-filters-button-shown='true',
    :is-sort-button-shown='true',
    :is-fold-button-shown='false',
    @switch-is-items-folded='switchIsItemsFolded',
    @changeSearch='changeSearch'
  )
  PageList(:path='"projects"', :search='""', :filters='{}')
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@use '~/assets/scss/classes/components/page.scss' as *;
</style>
