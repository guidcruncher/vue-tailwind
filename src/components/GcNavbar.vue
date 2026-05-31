<script setup lang="ts">
defineProps<{
  sticky?: boolean
}>()
</script>

<template>
  <header class="gc-navbar" :class="{ 'sticky top-0 z-50 backdrop-blur': sticky }">
    <div class="gc-navbar-left">
      <slot name="left" />
    </div>

    <div class="gc-navbar-right">
      <slot name="right" />
    </div>
  </header>
</template>
