<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: "primary" | "default"
  }>(),
  { variant: "default" },
)

const classes = {
  primary: "gc-btn-primary",
  default: "gc-btn bg-surface text-text border border-border hover:bg-surface/80",
}
</script>

<template>
  <button :class="classes[variant]">
    <slot />
  </button>
</template>
