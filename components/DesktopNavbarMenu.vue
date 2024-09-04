<template lang="pug">
.pl-10px.mt-75px.hidden.flex-col.gap-25px(class='md:flex')
  .btn.flex.items-center.gap-20px(
    v-for='routeItem in routes',
    @click='goToPage(routeItem)',
    :class='{ "active-route": currentPage === routeItem }',
    :key='routeItem'
  )
    .h-25px.w-25px.fill-zinc-50(v-html='iconsByRoute[routeItem]')
    Transition(name='fade', mode='out-in')
      .text-zinc-50(v-if='isMenuOpen', :key='$t(`menu.${routeItem}`)') {{ $t(`menu.${routeItem}`) }}
</template>

<script setup lang="ts">
import IconTask from '~/assets/icons/task.svg?raw'
import IconBoard from '~/assets/icons/board.svg?raw'
import IconCalendar from '~/assets/icons/calendar.svg?raw'
import IconProject from '~/assets/icons/project.svg?raw'
import IconTeam from '~/assets/icons/team.svg?raw'
import IconProfile from '~/assets/icons/profile.svg?raw'
import IconSettings from '~/assets/icons/settings.svg?raw'

defineProps<{
  isMenuOpen: boolean
  currentPage: string
}>()

const emit = defineEmits<{ 'go-to-page': [string] }>()

const routes = [
  'tasks',
  'boards',
  'projects',
  'calendar',
  'team',
  'profile',
  'settings',
]

const iconsByRoute = {
  tasks: IconTask,
  boards: IconBoard,
  projects: IconProject,
  calendar: IconCalendar,
  team: IconTeam,
  profile: IconProfile,
  settings: IconSettings,
}

const goToPage = (page: string) => {
  emit('go-to-page', page)
}
</script>
