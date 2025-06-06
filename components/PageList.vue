<template lang="pug">
Transition(name='fade', mode='out-in')
  .loader(v-if='loading', :key='`list-${path}-loaded-${loading}`')
  .list-container(v-else, :key='`list-${path}-loaded-${loading}`')
    .list
      .list-header(v-if="listItemsData?.data.length")
        .list-header__item(
          v-for='headerPart in listItemsData?.header',
          :key='`list-item-${headerPart.name}`',
          :style='headerPart.style'
        ) 
          button.list-header__item__btn.btn.btn-outline.btn-sm(
            :class='getSortBtnClass(headerPart.name)'
          ) 
            span {{ headerPart.label }}
            .list-header__item__btn__icon.icon(
              :class='getSortIconClass(headerPart.name)',
              v-html='IconChevron'
            )

        div.list-item__last

      .list-items(ref='listItemsRef', :class='listItemsClass')
        template(v-if='listItemsData?.data?.length')
          .list-item.border-primary(
            v-for='item in listItemsData?.data',
            :key='`list-item-${item.id}`'
          )
            .list-item__part(
              v-for='(itemPart, key) in item.parts',
              :key='`list-item-${key}`',
              :style='listItemsData?.table[key].outerStyle',
              :class='listItemsData?.table[key].outerClass',
              :title='itemPart.label || ""'
            ) 
              img.list-item__part__image.btn.btn-outline.btn-round-xl(
                v-if='item.parts[key].img',
                src='@/assets/icons/logo.svg'
              )
              .list-item__part__icon.icon(
                v-if='listItemsData?.table[key].iconPrepend && getIconByName(listItemsData?.table[key].iconPrepend)',
                v-html='getIconByName(listItemsData?.table[key].iconPrepend)'
              )
              div(
                v-if='item.parts[key].label',
                :style='listItemsData?.table[key].innerStyle',
                :class='listItemsData?.table[key].innerClass'
              ) {{ item.parts[key].label }}
              div(
                v-else,
                :style='listItemsData?.table[key].innerStyle',
                :class='listItemsData?.table[key].innerClass'
              ) {{ '-' }}
              .list-item__part__icon.icon(
                v-if='listItemsData?.table[key].iconAppend && getIconByName(listItemsData?.table[key].iconAppend)',
                v-html='getIconByName(listItemsData?.table[key].iconAppend)'
              )

            .list-item__last
              button.btn.btn-outline.btn-secondary.btn-round-md.chevron-right(
                v-html='IconChevron',
                @click='switchIsItemModalShown({ id: item.id, path })'
              )

        .list-empty.text-primary(v-else) {{ $t('common.listEmpty') }}

    .list-controls.flex.justify-end(class='m-t-[20px]')
      button.list-control.btn.btn-outline.btn-round-xl.btn-secondary.icon(
        v-html='IconClose'
        @click="switchIsCreateModalShown"
      )

    ModalsListItem(
      :data='itemModalData',
      :is-shown='isItemModalShown',
      @switch-is-shown='switchIsItemModalShown(null)'
    )
    ModalsCreateItem(
      :is-shown='isCreateModalShown',
      :path='path'
      @switch-is-shown='switchIsCreateModalShown(null)',
    )
</template>

<script setup lang="ts">
import IconClose from '~/assets/icons/close.svg?raw'
import IconChevron from '~/assets/icons/chevron.svg?raw'
import IconTime from '~/assets/icons/time.svg?raw'
import IconAttachment from '~/assets/icons/attachment.svg?raw'

import type { ListData, ListDataSort } from '~/types'

const props = defineProps<{
  path: string
  search: string,
  filters: Object //TODO: change to actual type
}>()

const appConfig = useAppConfig()

const route = useRoute()

const localeStore = useLocaleStore()
const localePath = useLocalePath()

const iconsByName = {
  time: IconTime,
  attachment: IconAttachment,
}

const loading = useState<boolean>(() => true)

const page = useState<number>(() => 1)
const sort = useState<ListDataSort | null>(() => null)

const listItemsRef = useState<HTMLElement | null>(() => null)
const listItemsClass = useState<string>(() => '')

const isItemModalShown = useState<boolean>(() => false)
const isCreateModalShown = useState<boolean>(() => false)

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

const switchIsCreateModalShown = (): void => {
  isCreateModalShown.value = !isCreateModalShown.value
}

const getListItemsData = async (initial: boolean = false): Promise<void> => {
  try {
    loading.value = true

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
        query: params,
        headers: getAuthHeaders()
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
  } catch (e) {
    await useErrorHandler(e, getI18nMessage('messages.ordinaryErrorMessage'))
  } finally {
    loading.value = false
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

          fill: $gray-700;
        }
      }
    }
  }

  &-item {
    &__last {
      width: 30px;
    }
  }

  &-empty {
    margin: 0 auto;
    padding: 20px 0 0 0;

    font-style: italic;

    opacity: 0.75;

    display: flex;
    justify-items: center;
    align-items: center;
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
            fill: $gray-50;
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
