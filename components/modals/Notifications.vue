<template lang="pug">
Teleport(to='#teleports')
  Transition(name='fade', mode='out-in')
    .notification-container
      TransitionGroup(name='fade')
        .notification(
          v-for='(notification, index) in notifications',
          :class='`notification-${notification.type}`',
          :key='notification.id'
        ) 
          .notification-content
            div(
              v-if='notificationIcons[notification.type]',
              :class='`notification-${notification.type}-icon`',
              v-html='notificationIcons[notification.type]'
            )
            .notification-message {{ notification.message }}
          .notification-dismiss
            button.btn.btn-outline.icon.btn-round-sm(
              @click='dismissNotification(notification.id)',
              v-html='IconClose'
            )
</template>

<script setup lang="ts">
import type { Notification } from '~/types'
import IconClose from '~/assets/icons/close.svg?raw'
import IconSuccess from '~/assets/icons/success.svg?raw'
import IconWarn from '~/assets/icons/warn.svg?raw'

const notificationIcons = {
  success: IconSuccess,
  warn: IconWarn,
  danger: IconWarn,
}

const notificationsStore = useNotificationsStore()

const notifications = computed(() => notificationsStore.notifications)

const dismissNotification = (id: string): void => {
  notificationsStore.removeNotification(id)
}
</script>

<style lang="scss" scoped>
@use '~/assets/scss/utils/colors.scss' as *;

.notification {
  width: 100%;
  padding: 15px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  border: 2px solid $gray-300;
  border-radius: 6px;

  box-sizing: border-box;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);

  transition: all 0.2s ease-in-out;

  &-container {
    width: 100%;
    max-height: 158px;

    position: fixed;
    bottom: 0;

    display: flex;
    flex-direction: column-reverse;
    gap: 10px;

    z-index: 20;

    overflow-y: auto;
  }

  &-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }

  &-text,
  &-success,
  &-warn,
  &-danger {
    &-icon {
      width: 30px;
      height: 30px;
      padding: 6px;

      display: flex;
      justify-content: center;
      align-items: center;

      box-sizing: border-box;

      user-select: none;

      fill: inherit;

      border-radius: 99999px;
    }
  }

  &-success,
  &-warn,
  &-danger {
    border-color: transparent !important;
  }

  &-text {
    background-color: $gray-50;

    &-icon {
      background-color: $gray-700;
      fill: $gray-50;
    }

    .notification-message {
      color: $zinc-700;
    }

    .notification-dismiss {
      button {
        fill: $zinc-700;
      }
    }
  }

  &-success {
    background-color: $emerald-800;

    &-icon {
      background-color: $emerald-200;
      fill: $emerald-800;
    }
  }

  &-warn {
    background-color: $amber-800;

    &-icon {
      background-color: $amber-200;
      fill: $amber-800;
    }
  }

  &-danger {
    background-color: $rose-800;

    &-icon {
      background-color: $rose-200;
      fill: $rose-800;
    }
  }

  &-message {
    font-size: 14px;
    line-height: 20px;

    width: 200px;

    display: inline-block;

    color: $gray-50;
  }

  &-dismiss {
    button {
      fill: $zinc-50;
    }
  }
}

@media (min-width: 768px) {
  .notification {
    width: fit-content;

    border-color: $gray-300;

    &-container {
      width: fit-content;
      max-height: 298px;
      padding: 0 20px 10px 0;

      top: 20px;
      right: 0;
      bottom: unset;

      flex-direction: column;
    }
  }
}

.dark {
  .notification {
    border-color: $gray-700;

    &-text {
      background-color: $gray-950;

      .notification-message {
        color: $zinc-50;
      }

      .notification-dismiss {
        button {
          fill: $zinc-50;
        }
      }
    }
  }
}
</style>

// TODO extend .notification-actions to consume multiple buttons
