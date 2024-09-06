<template lang="pug">
.tasks.page
  PageHeader(
    :isItemsFolded='isItemsFolded',
    :search='search',
    :is-filters-button-shown="true",
    :is-sort-button-shown="false",
    :is-fold-button-shown="true",
    @switch-is-items-folded='switchIsItemsFolded',
    @changeSearch='changeSearch'
  )
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
<style lang="scss" scoped></style>
