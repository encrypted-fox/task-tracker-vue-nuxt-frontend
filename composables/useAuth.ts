import type { AuthUser } from '~/types'
import { useNotificationsStore } from '#imports'
import messages from '~/utils/messages'

export const useAuth = (response: AuthUser, type: string) => {
  if (response.accessToken) {
    const userStore = useUserStore()
    const notificationsStore = useNotificationsStore()

    userStore.changeUser(response)

    let message = ''

    if (type === 'login') {
      message = messages.loginSuccessMessage
    } else if (type === 'register') {
      message = messages.registerSuccessMessage
    }

    notificationsStore.addNotification({ message, type: 'success' })
  }
}
