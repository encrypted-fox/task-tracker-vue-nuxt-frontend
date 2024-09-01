import { defineStore } from '#imports'
import type { AuthUser, Notification } from '~/types'
import { v4 as uuid } from 'uuid'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const theme = useState(() => 'light')

    const changeTheme = () => {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
    }

    return { theme, changeTheme }
  },
  { persist: true }
)

export const useUserStore = defineStore(
  'user',
  () => {
    const user = useState<AuthUser>(() => ({
      accessToken: null,
    }))

    const changeUser = (newUser: AuthUser) => {
      user.value = newUser
    }

    return { user, changeUser }
  },
  { persist: true }
)

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = useState<Array<Notification>>(() => [])

  const addNotification = (notification: Notification) => {
    if (import.meta.client) {
      const id = uuid()

      const timeout = setTimeout(() => {
        removeNotification(id)
      }, 10000)

      notifications.value.push({ ...notification, id, timeout })
    }
  }

  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex(
      (el: Notification) => el.id === id
    )

    if (index != -1) notifications.value.splice(index, 1)
  }

  return { notifications, addNotification, removeNotification }
})
