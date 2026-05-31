<script setup lang="ts">
import { useNotifications, toggleFlyout } from "../stores/notifications"

const { notifications } = useNotifications()
</script>

<template>
  <button class="gc-notify-button" @click="toggleFlyout">
    <GcIcon name="Bell" />
    <span v-if="notifications.some((n) => n.unread)" class="gc-notify-dot"></span>
  </button>
</template>
