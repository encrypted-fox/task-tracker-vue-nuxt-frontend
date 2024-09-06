import type { AuthUser } from '~/types'
import { useNotificationsStore } from '#imports'

export const useAuth = (response: AuthUser, notification?: string): void => {
  if (response.token) {
    const userStore = useUserStore()
    const notificationsStore = useNotificationsStore()
    const localePath = useLocalePath()

    userStore.changeUser(response)

    let message = ''

    if (notification) {
      message = notification
    }

    notificationsStore.addNotification({ message, type: 'success' })

    navigateTo(localePath('tasks'))
  } else {
    throw 'auth'
  }
}
