<template lang="pug">
.tasks.flex.flex-col.gap-20px.w-full.p-20px.pt-70px.overflow-y-auto.box-border(
  class='md:h-100% md:p-30px'
)
  h1.m-0.text-styling {{ $t('pages.tasks.title') }}
  form.flex.gap-20px.items-center
    .content.flex.gap-20px
      FieldsString(
        name='search',
        :placeholder='$t("forms.common.search")',
        :value='search',
        :iconPrepend='IconSearch',
        @input='changeSearch'
      )
    .btn.btn-round-md.icon.w-20px.h-20px.ml-auto(
      v-html='IconUnfold',
      v-if='itemsFolded'
    )
    .btn.btn-round-md.icon.w-20px.h-20px.ml-auto(v-html='IconFold', v-else)
</template>

<script setup lang="ts">
import IconSearch from '~/assets/icons/search.svg?raw'
import IconUnfold from '~/assets/icons/unfold.svg?raw'
import IconFold from '~/assets/icons/fold.svg?raw'

const search = useState<string>(() => '')

const itemsFolded = useState<boolean>(() => false)

const changeSearch = (val: string): void => {
  search.value = val
}
</script>
<style lang="scss" scoped></style>
