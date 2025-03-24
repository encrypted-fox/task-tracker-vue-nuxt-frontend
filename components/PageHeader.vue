<template lang="pug">
.page-header
  h1.page-header__title.text-primary {{ title }}
  form.page-header__form
    .page-header__content
      FieldsString(
        name='search',
        :placeholder='$t("forms.common.search")',
        :value='search',
        :iconPrepend='IconSearch',
        @input='changeSearch'
      )
      button.page-header__btn.btn.btn-outline.btn-round-xl.btn-secondary(
        v-html='IconFilter',
        v-if='isFiltersButtonShown',
        @click.prevent='switchIsFiltersShown'
      )
      button.page-header__btn.page-header__btn--mobile.btn.btn-outline.btn-round-xl.btn-secondary(
        v-html='IconSort',
        v-if='isSortButtonShown',
        @click.prevent='switchIsSortShown'
      )
    Transition(name='fade', mode='out-in', v-if='isFoldButtonShown')
      button.page-header__btn.page-header__btn--right.btn.btn-outline.btn-round-xl.btn-secondary(
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
  title: string
  search: string
  filters?: object
  sort?: object
  filtersPath?: object
  sortPath?: object
  isFiltersButtonShown: boolean
  isSortButtonShown: boolean
  isFoldButtonShown: boolean
}>()

const emit = defineEmits<{
  'switch-is-items-folded': []
  'change-search': [string]
  'change-filters': [object]
  'change-sort': [object]
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

const changeFilters = (val: object): void => {
  emit('change-filters', val)
}

const changeSort = (val: object): void => {
  emit('change-sort', val)
}
</script>

<style lang="scss" scoped>
.page-header {
  &__title {
    margin-top: 0;

    font-size: 24px;
    line-height: 32px;
  }
  &__form {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  &__content {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-grow: 1;

    :deep(.field) {
      width: 100%;
    }
  }
  &__btn {
    &--right {
      margin-left: auto;
    }
  }
}

@media (min-width: 768px) {
  .page-header {
    &__form {
      gap: 20px;
    }

    &__content {
      :deep(.field) {
        width: 600px;
        gap: 20px;
      }
    }

    &__btn {
      &--mobile {
        display: none;
      }
    }
  }
}
</style>
