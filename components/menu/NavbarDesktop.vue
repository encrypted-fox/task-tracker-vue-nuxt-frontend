<template lang="pug">
.navbar--desktop
  button.route.btn(
    v-for='routeItem in routes',
    @click='goToPage(routeItem)',
    :class='{ "active-route": currentPage === routeItem }',
    :key='routeItem'
  )
    .route__icon(v-html='iconsByRoute[routeItem]')
    Transition(name='fade', mode='out-in')
      .route__text(v-if='isMenuOpen', :key='$t(`menu.${routeItem}`)') {{ $t(`menu.${routeItem}`) }}
</template>

<script setup lang="ts">
import IconTask from '~/assets/icons/task.svg?raw'
import IconBoard from '~/assets/icons/board.svg?raw'
import IconCalendar from '~/assets/icons/calendar.svg?raw'
import IconProject from '~/assets/icons/project.svg?raw'
import IconTeam from '~/assets/icons/team.svg?raw'
import IconProfile from '~/assets/icons/profile.svg?raw'
import IconSettings from '~/assets/icons/settings.svg?raw'
import IconExit from '~/assets/icons/exit.svg?raw'

defineProps<{
  isMenuOpen: boolean
  currentPage: string
}>()

const emit = defineEmits<{ 'go-to-page': [string]; exit: [] }>()

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

const goToPage = (page: string): void => {
  emit('go-to-page', page)
}

const exit = () => {
  emit('exit')
}
</script>

<style lang="scss" scoped>
@use '~/assets/scss/utils/colors.scss' as *;

.navbar--desktop {
  display: none;
}

@media (min-width: 768px) {
  .navbar--desktop {
    padding-left: 12.5px;
    margin-top: 55px;

    display: flex;
    flex-direction: column;
    gap: 25px;

    .active-route {
      .route__icon, .route__text {
        fill: $orange-300 !important;
        color: $orange-300 !important;
        transition: all ease-in-out 0.2s;
      }
    }

    .route {
      padding: 2px;

      display: flex;
      justify-content: start;
      align-items: center;
      gap: 20px;

      &__icon {
        height: 25px;
        width: 25px;

        display: flex;
        justify-content: center;
        align-items: center;

        fill: $gray-50;
      }

      &__text {
        text-wrap: nowrap;
        color: $gray-50;

        font-size: 16px;
        line-height: 24px;
      }
    }
  }
}
</style>
