<template lang="pug">
main.page
  PageHeader(
    :isItemsFolded='isItemsFolded',
    :search='search',
    :is-filters-button-shown='true',
    :is-sort-button-shown='true',
    :is-fold-button-shown='false',
    @switch-is-items-folded='switchIsItemsFolded',
    @changeSearch='changeSearch'
  )
  PageList(:path='"tasks"', :search="''")
</template>

<script setup lang="ts">
const search = useState<string>(() => '')

const isItemsFolded = useState<boolean>(() => false)

const switchIsItemsFolded = (): void => {
  isItemsFolded.value = !isItemsFolded.value
}

const changeSearch = (val: string): void => {
  search.value = val
}
</script>

<style lang="scss" scoped>
@use '~/assets/scss/classes/components/page.scss' as *;
</style>
