import { FetchError } from 'ofetch'
import messages from '~/utils/messages'

export const useErrorHandler = async (e: unknown, type: string) => {
  if (e instanceof FetchError) {
    const notificationsStore = useNotificationsStore()

    let message = messages.ordinaryErrorMessage

    if (type === 'login') {
      message = messages.loginErrorMessage
    } else if (type === 'register') {
      message = messages.registerErrorMessage
    } else if (type === 'recovery') {
      message = messages.recoveryErrorMessage
    }

    notificationsStore.addNotification({ message, type: 'danger' })
  }
}
