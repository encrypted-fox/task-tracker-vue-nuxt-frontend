<template lang="pug">
.menu--fake(:class='{ "menu--fake--closed": isMenuOpen }')
nav.menu(:class='{ "menu--open": isMenuOpen }')
  button.menu__open-btn.btn.btn-round.chevron(
    :class='{ "chevron-left": isMenuOpen, "chevron-right": !isMenuOpen }',
    @click='switchMenuExpanded',
    v-html='IconChevron'
  )
  .menu__content
    img.menu__content__logo.icon(src='@/assets/icons/logo.svg')

    MenuNavbarDesktop(
      :is-menu-open='isMenuOpen',
      :current-page='currentPage',
      @go-to-page='goToPage',
      @exit='exit'
    )

    .menu__content__controls
      button.control.btn(@click='switchTheme')
        Transition(name='fade', mode='out-in')
          .control__icon(v-html='IconThemeDark', v-if='theme === "light"')
          .control__icon(v-html='IconThemeLight', v-else)
        Transition(name='fade', mode='out-in')
          .control__text(v-if='isMenuOpen', :key='$t("menu.theme")') {{ $t('menu.theme') }}

      button.control.btn(@click='switchLocale')
        .control__icon(v-html='IconTranslate')
        Transition(name='fade', mode='out-in')
          .control__text(v-if='isMenuOpen', :key='$t("menu.translate")') {{ $t('menu.translate') }}

      button.control.control--mobile.btn(
        class='md:hidden md:mr-0',
        @click='switchMenuExpanded'
      )
        Transition(name='fade', mode='out-in')
          .control__icon(v-html='IconClose', v-if='isMenuOpen')
          .control__icon(v-html='IconMenu', v-else)

      button.control.control--desktop.btn(@click='exit')
        .control__icon(v-html='IconExit')
        Transition(name='fade', mode='out-in')
          .control__text(v-if='isMenuOpen', :key='$t("menu.exit")') {{ $t('menu.exit') }}

    MenuNavbarMobile(
      :is-menu-open='isMenuOpen',
      :current-page='currentPage',
      @go-to-page='goToPage',
      @exit='exit'
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
import IconExit from '~/assets/icons/exit.svg?raw'
import IconClose from '~/assets/icons/close.svg?raw'

const userStore = useUserStore()
const notificationsStore = useNotificationsStore()
const themeStore = useThemeStore()
const localeStore = useLocaleStore()

const router = useRouter()
const route = useRoute()

const localePath = useLocalePath()

const isMenuOpen = useState<boolean>(() => false)

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

const switchTheme = (): void => {
  themeStore.changeTheme()
}

const switchLocale = (): void => {
  localeStore.changeLocale()
}

const isPage = (page: string): boolean => {
  if (route.path === localePath(page)) return true
  else return false
}

const switchMenuExpanded = (): void => {
  isMenuOpen.value = !isMenuOpen.value
}

const goToPage = (page: string): void => {
  if (route.path === localePath(page)) return

  navigateTo({ path: localePath(page) })
  isMenuOpen.value = false
}

const exit = (): void => {
  userStore.exit()

  navigateTo({ path: localePath('/auth') })

  notificationsStore.addNotification({
    message: getI18nMessage('menu.logout'),
    type: 'success',
  })
  isMenuOpen.value = false
}
</script>

<style lang="scss" scoped>
@use '~/assets/scss/utils/colors.scss' as *;

.menu {
  height: 50px;
  width: 100%;

  position: fixed;
  top: 0;
  z-index: 100;

  &--fake {
    display: none;
  }

  &__open-btn {
    display: none;
  }

  &__content {
    height: 50px;
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: $zinc-700;
    box-sizing: border-box;

    overflow-x: hidden;

    &__logo {
      height: 30px;
      width: 30px;

      margin-left: 20px;
    }

    &__controls {
      margin-right: 20px;
      display: flex;
      gap: 15px;

      .control {
        padding: 2px;

        display: flex;
        gap: 20px;

        &__icon {
          height: 25px;
          width: 25px;
          fill: $zinc-50;
        }

        &__text {
          display: none;
        }

        &--desktop {
          display: none;
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .menu {
    height: 100dvh;
    width: 100px;

    left: 0;

    z-index: 1;

    &--open {
      width: 250px;
    }

    &--fake {
      display: block;
      width: 100px;
      min-width: 100px;

      &--open {
        width: 250px;
        min-width: 250px;
      }
    }

    &__open-btn {
      display: block;

      height: 30px;
      width: 30px;
      padding: 5px;

      position: absolute;
      top: 95px;
      right: -15px;

      fill: $zinc-50;
      background-color: $zinc-700;

      &:hover {
        opacity: 1;
        background-color: $zinc-600;
      }

      &:active {
        background-color: $zinc-700;
      }
    }

    &__content {
      height: 100dvh;
      padding: 5px 20px;

      top: unset;
      left: 0;

      flex-direction: column;
      justify-content: start;
      align-items: start;

      overflow-y: auto;

      &__logo {
        height: 50px;
        width: 50px;
        margin-left: 0;
        margin-top: 20px;
      }

      &__controls {
        padding-top: 50px;
        padding-left: 10px;
        margin: auto 0 20px 0;

        flex-direction: column;
        gap: 25px;

        .control {
          &__icon {
            height: 30px;
            width: 30px;
          }

          &__text {
            display: block;

            text-wrap: nowrap;
            color: $zinc-50;
          }

          &--mobile {
            display: none;
          }

          &--desktop {
            display: flex;
          }
        }
      }
    }
  }
}
</style>
