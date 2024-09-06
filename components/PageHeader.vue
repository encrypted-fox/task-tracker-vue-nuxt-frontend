<template lang="pug">
h1.m-0.text-styling.text-2xl {{ $t('pages.tasks.title') }}
form.flex.gap-10px.items-center(class='md:gap-20px')
  .content.flex-grow-1.flex.items-center.gap-10px
    FieldsString.w-full(
      class='md:w-600px md:gap-20px',
      name='search',
      :placeholder='$t("forms.common.search")',
      :value='search',
      :iconPrepend='IconSearch',
      @input='changeSearch'
    )
    button.btn.btn-secondary.btn-round.icon.w-40px.h-40px.p-10px(
      v-html='IconFilter', v-if='isFiltersButtonShown'
      @click.prevent='switchIsFiltersShown',
    )
    button.btn.btn-secondary.btn-round.icon.w-40px.h-40px.p-10px(
      v-html='IconSort', v-if='isSortButtonShown'
      @click.prevent='switchIsSortShown',
    )
  Transition(name='fade', mode='out-in' v-if='isFoldButtonShown')
    button.btn.btn-secondary.btn-round.icon.w-40px.h-40px.p-10px.ml-auto(
      v-html='IconItemsFolded',
      @click.prevent='switchIsItemsFolded',
      :key='IconItemsFolded'
    )
</template>

<script setup lang="ts">
import IconSearch from '~/assets/icons/search.svg?raw'
import IconFilter from '~/assets/icons/filter.svg?raw'
import IconSort from '~/assets/icons/sort.svg?raw'
import IconUnfold from '~/assets/icons/unfold.svg?raw'
import IconFold from '~/assets/icons/fold.svg?raw'

const props = defineProps<{
  isItemsFolded: boolean
  search: string
  filters?: Object
  sort?: Object
  filtersPath?: Object
  sortPath?: Object
  isFiltersButtonShown: boolean
  isSortButtonShown: boolean
  isFoldButtonShown: boolean
}>()

const emit = defineEmits<{
  'switch-is-items-folded': []
  'change-search': [string]
  'change-filters': [Object]
  'change-sort': [Object]
}>()

const isFiltersShown = useState<boolean>(() => false)
const isSortShown = useState<boolean>(() => false)

const IconItemsFolded = computed(() =>
  props.isItemsFolded ? IconUnfold : IconFold
)

const switchIsItemsFolded = (): void => {
  emit('switch-is-items-folded')
}

const switchIsFiltersShown = (): void => {
  isFiltersShown.value = !isFiltersShown.value
}

const changeSearch = (val: string): void => {
  emit('change-search', val)
}

const changeFilters = (val: Object): void => {
  emit('change-filters', val)
}

const changeSort = (val: Object): void => {
  emit('change-sort', val)
}
</script>
<style lang="scss" scoped></style>
