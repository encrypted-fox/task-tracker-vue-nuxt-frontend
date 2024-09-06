<template lang="pug">
Teleport(to='#teleports')
  Transition(name='fade', mode='out-in')
    .notification-container
      TransitionGroup(name='fade')
        .notification(
          :class='getNotificationClass(notification)',
          v-for='(notification, index) in notifications',
          :key='notification.id'
        ) 
          .flex.justify-between.items-center.gap-10px
            .notification-icon-success(
              v-if='notification.type === "success"',
              v-html='IconSuccess'
            )
            .notification-icon-warn(
              v-else-if='notification.type === "warn"',
              v-html='IconWarn'
            )
            .notification-icon-danger(
              v-else-if='notification.type === "danger"',
              v-html='IconWarn'
            )
            .notification-message {{ notification.message }}
          .notification-dismiss
            .btn.icon.btn-round-sm.btn-secondary.btn-seemless(
              @click='dismissNotification(notification.id)',
              v-html='IconClose'
            )
</template>

<script setup lang="ts">
import type { Notification } from '~/types'
import IconClose from '~/assets/icons/close.svg?raw'
import IconSuccess from '~/assets/icons/success.svg?raw'
import IconWarn from '~/assets/icons/warn.svg?raw'

const notificationsStore = useNotificationsStore()

const notifications = computed(() => notificationsStore.notifications)

const getNotificationClass = (notification: Notification): string => {
  if (notification.type === 'text') return 'bg-zinc-50 dark:bg-zinc-800'
  if (notification.type === 'success')
    return '!border-transparent bg-emerald-50 dark:bg-emerald-800'
  if (notification.type === 'warn')
    return '!border-transparent bg-amber-50 dark:bg-amber-800'
  if (notification.type === 'danger')
    return '!border-transparent bg-rose-50 dark:bg-rose-800'
  else return ''
}

const dismissNotification = (id: string): void => {
  notificationsStore.removeNotification(id)
}
</script>
// TODO extend .notification-actions to consume multiple buttons
