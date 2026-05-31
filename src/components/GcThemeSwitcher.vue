<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"

const theme = ref<"light" | "dark" | "system">("light")

function applyTheme(mode: "light" | "dark" | "system") {
  theme.value = mode
  localStorage.setItem("gc-theme", mode)

  if (mode === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    document.documentElement.dataset.theme = prefersDark ? "dark" : "light"
  } else {
    document.documentElement.dataset.theme = mode
  }

  // Notify GcAppShell
  window.dispatchEvent(new Event("theme-change"))
}

function handleSystemChange(e: MediaQueryListEvent) {
  if (theme.value === "system") {
    document.documentElement.dataset.theme = e.matches ? "dark" : "light"
    window.dispatchEvent(new Event("theme-change"))
  }
}

onMounted(() => {
  const saved = (localStorage.getItem("gc-theme") as "light" | "dark" | "system") || "light"
  applyTheme(saved)

  const mq = window.matchMedia("(prefers-color-scheme: dark)")
  mq.addEventListener("change", handleSystemChange)
})

onBeforeUnmount(() => {
  const mq = window.matchMedia("(prefers-color-scheme: dark)")
  mq.removeEventListener("change", handleSystemChange)
})
</script>

<template>
  <select
    class="gc-select bg-surface text-text border border-border rounded-md px-3 py-2 text-sm"
    :value="theme"
    @change="applyTheme(($event.target as HTMLSelectElement).value as any)"
  >
    <option value="light">Light</option>
    <option value="dark">Dark</option>
    <option value="system">System</option>
  </select>
</template>
