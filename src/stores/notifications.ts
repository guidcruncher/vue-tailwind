import { ref } from "vue"

export type Notification = {
  id: string
  title: string
  message: string
  time?: string
  unread?: boolean
}

const notifications = ref<Notification[]>([])
const flyoutOpen = ref(false)
const centerOpen = ref(false)

export function useNotifications() {
  return { notifications, flyoutOpen, centerOpen }
}

export function pushNotification(n: Notification) {
  notifications.value.unshift({
    unread: true,
    time: new Date().toLocaleTimeString(),
    ...n,
  })
}

export function markAllRead() {
  notifications.value.forEach((n) => (n.unread = false))
}

export function toggleFlyout() {
  flyoutOpen.value = !flyoutOpen.value
}

export function toggleCenter() {
  centerOpen.value = !centerOpen.value
}
