<template lang="pug">
.list-container
  .list
    .list-header
      .list-header__item(
        v-for='headerPart in listItemsData?.header',
        :key='`list-item-${headerPart.name}`',
        :style='headerPart.style'
      ) 
        button.list-header__item__btn.btn.btn-sm(
          :class='getSortBtnClass(headerPart.name)'
        ) 
          span {{ headerPart.label }}
          .list-header__item__btn__icon.icon(
            :class='getSortIconClass(headerPart.name)',
            v-html='IconChevron'
          )

      div(style='width: 40px')

    .list-items(ref='listItemsRef', :class='listItemsClass')
      template(v-if='listItemsData?.items?.length')
        .list-item.border-primary(
          v-for='item in listItemsData?.items',
          :key='`list-item-${item.id}`'
        )
          .list-item__part(
            v-for='itemPart in item.parts',
            :key='`list-item-${itemPart.label || itemPart.url}-${itemPart.class}`',
            :style='itemPart.outerStyle',
            :class='itemPart.outerClass',
            :title='itemPart.label || ""'
          ) 
            img.list-item__part__image.btn.btn-round-xl(
              v-if='itemPart.img',
              src='@/assets/icons/logo.svg'
            )
            .list-item__part__icon.icon(
              v-if='itemPart.iconPrepend && getIconByName(itemPart.iconPrepend)',
              v-html='getIconByName(itemPart.iconPrepend)'
            )
            div(
              v-if='itemPart.label',
              :style='itemPart.innerStyle',
              :class='itemPart.innerClass'
            ) {{ itemPart.label }}
            .list-item__part__icon.icon(
              v-if='itemPart.iconAppend && getIconByName(itemPart.iconAppend)',
              v-html='getIconByName(itemPart.iconAppend)'
            )

          div(style='width: 40px')
            button.btn.btn-secondary.btn-round-md.chevron-right(
              v-html='IconChevron',
              @click='switchIsItemModalShown({ id: item.id, path })'
            )

      .list-empty.text-primary(v-else) {{ $t('common.listEmpty') }}

  .list-controls.flex.justify-end(class='m-t-[20px]')
    button.list-control.btn.btn-round-xl.btn-secondary.icon(v-html='IconClose')

  ModalsListItem(:data='itemModalData', :is-shown='isItemModalShown', @switch-is-shown="switchIsItemModalShown(null)")
</template>

<script setup lang="ts">
import IconClose from '~/assets/icons/close.svg?raw'
import IconChevron from '~/assets/icons/chevron.svg?raw'
import IconTime from '~/assets/icons/time.svg?raw'
import IconAttachment from '~/assets/icons/attachment.svg?raw'

import type { ListData, ListDataSort } from '~/types'

const props = defineProps<{
  path: string
  // search: string,
  // filters: Object //TODO: change to actual type
}>()

const appConfig = useAppConfig()

const route = useRoute()

const localeStore = useLocaleStore()
const localePath = useLocalePath()

const iconsByName = {
  time: IconTime,
  attachment: IconAttachment,
}

const page = useState<number>(() => 1)
const sort = useState<ListDataSort | null>(() => null)

const listItemsRef = useState<HTMLElement | null>(() => null)
const listItemsClass = useState<string>(() => '')

const isItemModalShown = useState<boolean>(() => false)
const itemModalData = useState<{ id: string | number; path: string } | null>(
  () => null
)

const listItemsData = useState<ListData | null>(() => null)

const getIconByName = (iconName: 'attachment' | 'time'): string | undefined => {
  return iconsByName[iconName] || undefined
}

const getSortBtnClass = (name: string): string => {
  const currentSort = listItemsData.value?.sort

  if (currentSort?.name === name) {
    return 'btn-primary'
  } else {
    return 'btn-secondary'
  }
}

const getSortIconClass = (name: string): string => {
  const currentSort = listItemsData.value?.sort

  if (currentSort?.name === name) {
    if (currentSort?.direction === 'up') {
      return 'chevron-up'
    } else {
      return 'chevron-down'
    }
  } else {
    return 'chevron-right'
  }
}

const switchIsItemModalShown = (args: {
  id: string | number
  path: string
}): void => {
  isItemModalShown.value = !isItemModalShown.value

  itemModalData.value = args
}

const getListItemsData = async (initial: boolean = false): Promise<void> => {
  if (
    !initial &&
    listItemsData.value &&
    listItemsData.value.count / 20 < page.value
  )
    return

  const params = {
    sort: listItemsData.value?.sort || null,
    page: page.value,
    locale: localeStore.locale,
  }

  if (initial) {
    page.value = 1
  }

  const response = await $fetch<ListData>(
    `${appConfig.backendUrl}/api/${props.path}`,
    {
      method: 'GET',
      // query: params,
    }
  )

  page.value++

  if (!initial && listItemsData.value)
    listItemsData.value.items = [
      ...listItemsData.value.items,
      ...response.items,
    ]
  else {
    listItemsData.value = response
    sort.value = response.sort
  }
}

onMounted(async () => {
  await getListItemsData(true)
})

watch(
  () => listItemsData.value?.items?.length,
  async () => {
    await nextTick()

    if (
      listItemsRef.value &&
      listItemsRef.value?.scrollHeight > listItemsRef.value?.clientHeight
    ) {
      listItemsClass.value = 'list-items--padding-right'
    } else {
      listItemsClass.value = ''
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
@use '~/assets/scss/utils/colors.scss' as *;

.list {
  height: 100%;
  width: 100%;
  padding-bottom: 10px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  overflow-x: auto;

  &-container {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &-header {
    display: none;
  }

  &-items {
    height: 100%;
    width: fit-content;
    min-width: 100%;
    margin-top: 5px;

    display: flex;
    flex-direction: column;
    gap: 10px;

    box-sizing: border-box;
    overflow-y: auto;

    &--padding-right {
      padding-right: 10px;
    }

    .list-item {
      width: 100%;
      padding: 10px;

      display: flex;
      align-items: center;
      flex-shrink: 0;
      gap: 15px;

      box-sizing: border-box;

      &__part {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        flex-grow: 0;
        gap: 10px;

        box-sizing: border-box;

        &__icon {
          height: 20px;
          width: 20px;

          fill: $zinc-700;
        }
      }
    }
  }

  &-empty {
    margin: 0 auto;
    padding: 20px 0 0 0;

    font-style: italic;

    opacity: 0.75;
  }

  &-control {
    rotate: 45deg;
  }
}

.dark {
  .list {
    &-items {
      .list-item {
        &__part {
          &__icon {
            fill: $zinc-50;
          }
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .list {
    &-header {
      width: 100%;
      padding: 0 10px;

      display: flex;
      align-items: center;
      flex-shrink: 0;
      gap: 15px;

      border: 2px solid transparent;
      box-sizing: border-box;

      &__item {
        flex-shrink: 0;
        flex-grow: 0;

        box-sizing: border-box;

        &__btn {
          gap: 10px;

          &__icon {
            height: 12px;
            width: 12px;
          }
        }
      }
    }
  }
}
</style>
