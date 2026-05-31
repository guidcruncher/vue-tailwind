<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"

const collapsed = ref(false)
const theme = ref<"light" | "dark">("light")

function toggleSidebar() {
  collapsed.value = !collapsed.value
}

function updateTheme() {
  theme.value = (document.documentElement.dataset.theme as "light" | "dark") || "light"
}

onMounted(() => {
  updateTheme()
  window.addEventListener("theme-change", updateTheme)
})

onBeforeUnmount(() => {
  window.removeEventListener("theme-change", updateTheme)
})
</script>

<template>
  <div
    class="gc-appshell min-h-screen h-screen overscroll-none"
    :class="{
      'gc-appshell-dark': theme === 'dark',
      'gc-appshell-light': theme === 'light',
    }"
  >
    <aside class="gc-appshell-sidebar" :class="{ 'gc-appshell-sidebar-collapsed': collapsed }">
      <slot name="sidebar" :collapsed="collapsed" :toggle="toggleSidebar" />
    </aside>

    <div class="gc-appshell-main">
      <header class="gc-appshell-navbar">
        <slot name="navbar" :collapsed="collapsed" :toggle="toggleSidebar" />
      </header>

      <main class="gc-appshell-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style>
.gc-appshell-dark {
  background: rgb(var(--gc-bg));
}

.gc-appshell-light {
  background: rgb(var(--gc-bg));
}

.gc-appshell {
  display: flex;
  overflow: hidden;
  overscroll-behavior: none;
  -webkit-overflow-scrolling: auto;
}

.gc-appshell-sidebar {
  width: 240px;
  transition: width 0.2s ease;
  flex-shrink: 0;
  overflow: hidden;
  background: rgb(var(--gc-surface));
}

.gc-appshell-sidebar-collapsed {
  width: 64px;
}

.gc-appshell-main {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.gc-appshell-navbar {
  height: 56px;
  flex-shrink: 0;
  border-bottom: 1px solid rgb(var(--gc-border));
  background: rgb(var(--gc-surface));
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 10;
}

.gc-appshell-content {
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
  background: rgb(var(--gc-surface));
  padding-bottom: calc(32px + env(safe-area-inset-bottom));
}
</style>
