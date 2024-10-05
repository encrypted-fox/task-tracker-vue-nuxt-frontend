<template lang="pug">
.list.w-full.flex.flex-col(class='h-100%')
  .list-header.hidden(class='md:block')
    .w-full.flex.items-center.box-border.shrink-0
      .box-border.p-10px.flex-shrink-0.flex-grow-0(
        v-for='headerPart in listItemsData?.header',
        :key='`list-item-${headerPart.name}`',
        :class='headerPart.class'
      ) 
        .badge.gap-10px(:class='getSortBadgeClass(headerPart.name)') 
          span {{ headerPart.label }}
          .icon.w-12px.h-12px(
            :class='getSortIconClass(headerPart.name)',
            v-html='IconChevron'
          )

      div(class='w-4%')

  .list-items.w-full.m-t-5px.flex.flex-col.gap-10px.box-border.overflow-y-auto(
    ref='listItemsRef',
    :class='listItemsClass',
    v-infinite-scroll='[getListItemsData(false), { distance: 10 }]'
  )
    template(v-if='listItemsData?.items?.length')
      .w-full.flex.items-center.box-border.shrink-0.border-styling.border-coloring(
        v-for='item in listItemsData?.items',
        :key='`list-item-${item.id}`'
      )
        .p-10px.box-border.flex-shrink-0.flex-grow-0.flex.items-center.gap-5px(
          v-for='itemPart in item.parts',
          :key='`list-item-${itemPart.label || itemPart.url}-${itemPart.class}`',
          :class='itemPart.outerClass',
          :title='itemPart.label || ""'
        ) 
          img.btn.w-30px.h-30px.rounded-md(
            v-if='itemPart.img',
            src='@/assets/icons/logo.svg'
          )
          .icon.w-20px.h-20px.fill-zinc-700(
            v-if='itemPart.iconPrepend && getIconByName(itemPart.iconPrepend)',
            class='dark:fill-zinc-50',
            v-html='getIconByName(itemPart.iconPrepend)'
          )
          .text-sm.text-ellipsis.overflow-hidden.whitespace-nowrap(
            v-if='itemPart.label',
            :class='itemPart.innerClass'
          ) {{ itemPart.label }}
          .icon.w-20px.h-20px.fill-zinc-700(
            v-if='itemPart.iconAppend && getIconByName(itemPart.iconAppend)',
            class='dark:fill-zinc-50',
            v-html='getIconByName(itemPart.iconAppend)'
          )

        .p-10px.box-border(class='w-4%')
          .btn.btn-secondary.btn-round-md.icon.rotate-180.m-l-auto.m-r-0px(
            v-html='IconChevron',
            @click='switchIsItemModalShown({ id: item.id, path })'
          )

    span.m-t-20px.m-x-a.text-styling.italic.opacity-75(v-else) {{ $t('common.listEmpty') }}

  .list-footer.m-t-20px.flex.justify-end
    button.btn.btn-round-xl.btn-secondary.icon.rotate-45(v-html='IconClose')

  ModalsListItem(:data='itemModalData', :is-shown='isItemModalShown')
</template>

<script setup lang="ts">
import IconClose from '~/assets/icons/close.svg?raw'
import IconChevron from '~/assets/icons/chevron.svg?raw'
import IconTime from '~/assets/icons/time.svg?raw'
import IconAttachment from '~/assets/icons/attachment.svg?raw'
import { vInfiniteScroll } from '@vueuse/components'

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

const listItemsRef = useState<HTMLElement | null>(() => null)
const listItemsClass = useState<string>(() => 'h-100%')

const isItemModalShown = useState<boolean>(() => false)
const itemModalData = useState<{ id: string | number; path: string } | null>(
  () => null
)

const listItemsData = useState<ListData | null>(() => null)

const getIconByName = (iconName: 'attachment' | 'time'): string | undefined => {
  return iconsByName[iconName] || undefined
}

const getSortBadgeClass = (name: string): string => {
  const currentSort = listItemsData.value?.sort

  if (currentSort?.name === name) {
    return 'badge-primary'
  } else {
    return 'badge-secondary'
  }
}

const getSortIconClass = (name: string): string => {
  const currentSort = listItemsData.value?.sort

  if (currentSort?.name === name) {
    if (currentSort?.direction === 'up') {
      return 'rotate-90'
    } else {
      return 'rotate--90'
    }
  } else {
    return 'rotate-180'
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
  else listItemsData.value = response
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
      listItemsClass.value = 'pr-10px h-100%'
    } else {
      listItemsClass.value = 'h-100%'
    }
  },
  { immediate: true }
)
</script>
