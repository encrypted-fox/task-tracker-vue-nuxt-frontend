import type { AuthUser } from '~/types'
import { useNotificationsStore } from '#imports'

export const useAuth = (response: AuthUser, notification?: string) => {
  if (response.token) {
    const userStore = useUserStore()
    const notificationsStore = useNotificationsStore()

    userStore.changeUser(response)

    let message = ''

    if (notification) {
      message = notification
    }

    notificationsStore.addNotification({ message, type: 'success' })
  } else {
    throw 'auth'
  }
}
