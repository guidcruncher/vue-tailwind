<script setup lang="ts">
const props = defineProps<{
  collapsed: boolean
}>()

const emit = defineEmits<{
  (e: "toggle"): void
}>()
</script>

<template>
  <aside class="gc-sidebar" :class="{ 'gc-sidebar-collapsed': props.collapsed }">
    <!-- HEADER -->
    <header class="gc-sidebar-header">
      <button class="gc-sidebar-toggle" @click="emit('toggle')" aria-label="Toggle sidebar">
        <span class="gc-sidebar-toggle-icon"></span>
      </button>
      <slot name="header" :collapsed="props.collapsed" v-if="!props.collapsed" />
    </header>

    <!-- CONTENT -->
    <nav class="gc-sidebar-content">
      <slot name="content" :collapsed="props.collapsed" />
    </nav>
  </aside>
</template>

<style>
.gc-sidebar {
  width: 240px;
  transition: width 0.2s ease;
  overflow: hidden;
  background: var(--surface-1);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
}

.gc-sidebar-collapsed {
  width: 50px;
}

.gc-sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-bottom: 1px solid var(--border);
}

.gc-sidebar-toggle {
  margin-left: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.gc-sidebar-toggle-icon {
  display: block;
  width: 16px;
  height: 2px;
  background: currentColor;
  position: relative;
}

.gc-sidebar-toggle-icon::before,
.gc-sidebar-toggle-icon::after {
  content: "";
  position: absolute;
  left: 0;
  width: 16px;
  height: 2px;
  background: currentColor;
}

.gc-sidebar-toggle-icon::before {
  top: -5px;
}

.gc-sidebar-toggle-icon::after {
  top: 5px;
}

.gc-sidebar-content {
  flex: 1;
  padding: 8px;
}

.gc-sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
}

.gc-sidebar-item:hover {
  background: var(--surface-2);
}

.gc-sidebar-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.gc-sidebar-collapsed .gc-sidebar-item-text {
  opacity: 0;
  pointer-events: none;
  width: 0;
  overflow: hidden;
  transition:
    opacity 0.15s ease,
    width 0.15s ease;
}

.gc-sidebar-item-collapsed .gc-sidebar-item-text {
  opacity: 0;
  width: 0;
  overflow: hidden;
  pointer-events: none;
  transition:
    opacity 0.15s ease,
    width 0.15s ease;
}
</style>
