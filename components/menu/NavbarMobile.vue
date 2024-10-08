<template lang="pug">
ModalsDefault(
  :is-shown='isMenuOpen',
  :hide-header='true',
  :hide-footer='true',
  :modal-class='"modal--menu"',
  :overlay-class='"ovarlay--mobile"'
)
  template(v-slot:modal-content)
    .navbar--mobile
      button.route.btn.btn-md(
        v-for='routeItem in routes',
        @click='goToPage(routeItem)',
        :class='{ "active-route": currentPage === routeItem }',
        :key='routeItem'
      )
        .route__icon(v-html='iconsByRoute[routeItem]')
        Transition(name='fade', mode='out-in')
          .route__text {{ $t(`menu.${routeItem}`) }}

      button.route.btn.btn-md(@click='exit')
        .route__icon(v-html='IconExit')
        Transition(name='fade', mode='out-in')
          .route__text(v-if='isMenuOpen', :key='$t(`menu.exit`)') {{ $t(`menu.exit`) }}
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

const exit = (): void => {
  emit('exit')
}
</script>

<style lang="scss" scoped>
@use '~/assets/scss/utils/colors.scss' as *;

.navbar--mobile {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 25px;

  .route {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 20px;

    &__icon {
      height: 25px;
      width: 25px;
      fill: $zinc-50;
    }

    &__text {
      color: $zinc-50;
    }
  }
}

@media (min-width: 768px) {
  .navbar--mobile {
    display: none;
  }
}
</style>
