<template lang="pug">
.menu.w-full.h-50px.fixed.top-0.z-100(class='md:w-fit md:h-100dvh md:left-0 md:z-1')
  .btn.btn-round.icon.chevron.w-20px.h-20px.absolute.top-95px.hidden.fill-zinc-50.bg-zinc-700(
    :class='{ "chevron-left": isMenuOpen, "chevron-right": !isMenuOpen, "-right-10px md:block hover:opacity-100 hover:bg-zinc-600 active:bg-zinc-700": true }',
    @click='switchMenuExpanded',
    v-html='IconChevron'
  )
  .menu-content.w-full.h-50px.flex.justify-between.items-center.bg-zinc-700.box-border(
    class='md:w-fit md:h-100dvh md:px-20px md:top-unset md:left-0 md:flex-col md:justify-start md:items-start md:overflow-y-auto'
  )
    img.icon.h-40px.w-40px.ml-20px(
      class='md:h-50px md:w-50px md:ml-0 md:mt-20px',
      src='@/assets/icons/logo.svg'
    )

    DesktopNavbarMenu(
      :is-menu-open='isMenuOpen',
      :current-page='currentPage',
      @go-to-page='goToPage'
    )

    .mr-20px(
      class='md:pt-50px md:mt-auto md:mr-0 md:mb-20px md:pl-10px md:flex md:flex-col md:gap-25px'
    )
      .flex.gap-20px(class='md:flex-col')
        .btn.flex.items-center.gap-20px(@click='switchTheme')
          Transition(name='fade', mode='out-in')
            .h-25px.w-25px.fill-zinc-50(
              v-html='IconThemeDark',
              v-if='theme === "light"'
            )
            .h-25px.w-25px.fill-zinc-50(v-html='IconThemeLight', v-else)
          Transition(name='fade', mode='out-in')
            .hidden.text-zinc-50(class='md:block', v-if='isMenuOpen') {{ $t('menu.theme') }}

        .btn.flex.items-center.gap-20px(@click='switchLocale')
          .h-25px.w-25px.fill-zinc-50(v-html='IconTranslate')
          Transition(name='fade', mode='out-in')
            .hidden.text-zinc-50(class='md:block', v-if='isMenuOpen') {{ $t('menu.translate') }}

        .btn(class='md:hidden md:mr-0', @click='switchMenuExpanded')
          Transition(name='fade', mode='out-in')
            .h-25px.w-25px.fill-zinc-50(v-html='IconClose', v-if='isMenuOpen')
            .h-25px.w-25px.fill-zinc-50(v-html='IconMenu', v-else)

    ModalsMobileNavbarMenu(
      :is-menu-open='isMenuOpen',
      :current-page='currentPage',
      @go-to-page='goToPage'
    )
</template>

<script setup lang="ts">
import IconMenu from '~/assets/icons/menu.svg?raw'
import IconTask from '~/assets/icons/task.svg?raw'
import IconBoard from '~/assets/icons/board.svg?raw'
import IconCalendar from '~/assets/icons/calendar.svg?raw'
import IconProject from '~/assets/icons/project.svg?raw'
import IconTeam from '~/assets/icons/team.svg?raw'
import IconProfile from '~/assets/icons/profile.svg?raw'
import IconSettings from '~/assets/icons/settings.svg?raw'
import IconChevron from '~/assets/icons/chevron.svg?raw'
import IconThemeDark from '~/assets/icons/theme-dark.svg?raw'
import IconThemeLight from '~/assets/icons/theme-light.svg?raw'
import IconTranslate from '~/assets/icons/translate.svg?raw'
import IconClose from '~/assets/icons/close.svg?raw'

const themeStore = useThemeStore()
const localeStore = useLocaleStore()

const router = useRouter()
const route = useRoute()

const localePath = useLocalePath()

const isMenuOpen = useState(() => false)

const theme = computed(() => themeStore.theme)
const currentPage = computed(() => {
  if (route.path.includes('task')) {
    return 'tasks'
  }

  if (route.path.includes('board')) {
    return 'boards'
  }

  if (route.path.includes('project')) {
    return 'projects'
  }

  if (route.path.includes('calendar')) {
    return 'calendar'
  }

  if (route.path.includes('team')) {
    return 'team'
  }

  if (route.path.includes('profile')) {
    return 'profile'
  }

  if (route.path.includes('settings')) {
    return 'settings'
  } else {
    return ''
  }
})

const switchTheme = () => {
  themeStore.changeTheme()
}

const switchLocale = () => {
  localeStore.changeLocale()
}

const isPage = (page: string) => {
  if (route.path === localePath(page)) return true
}

const switchMenuExpanded = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const goToPage = (page: string) => {
  if (route.path === localePath(page)) return

  router.push({ path: localePath(page) })
  isMenuOpen.value = false
}
</script>
