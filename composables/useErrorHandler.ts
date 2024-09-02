import { FetchError } from 'ofetch'

export const useErrorHandler = async (e: unknown, notification?: string) => {
  if (e instanceof FetchError) {
    const notificationsStore = useNotificationsStore()

    let message = getI18nMessage('messages.ordinaryErrorMessage')

    if (notification) {
      message = notification
    }

    notificationsStore.addNotification({ message, type: 'danger' })
  }
}
