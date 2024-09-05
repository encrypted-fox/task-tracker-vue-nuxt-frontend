import { v4 as uuid } from 'uuid'
import type { Notification } from '~/types'

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = useState<Array<Notification>>(() => [])

  const addNotification = (notification: Notification): void => {
    if (import.meta.client) {
      const id = uuid()

      const timeout = setTimeout(() => {
        removeNotification(id)
      }, 10000)

      notifications.value.push({ ...notification, id, timeout })
    }
  }

  const removeNotification = (id: string): void => {
    const index = notifications.value.findIndex(
      (el: Notification) => el.id === id
    )

    if (index != -1) notifications.value.splice(index, 1)
  }

  return { notifications, addNotification, removeNotification }
})
