<script setup lang="ts">
const props = defineProps<{
  icon: string
  text: string
  tag: string
  collapsed: boolean
}>()

const emit = defineEmits(["click"])

const onClick = () => {
  emit("click", { tag: props.tag ?? "" })
}
</script>

<template>
  <div
    class="gc-sidebar-item"
    :class="{ 'gc-sidebar-item-collapsed': props.collapsed }"
    @click="onClick()"
  >
    <span class="gc-sidebar-icon">
      <GcIcon :name="props.icon" />
    </span>

    <span class="gc-sidebar-item-text">
      {{ props.text }}
    </span>
  </div>
</template>
<style scoped>
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
