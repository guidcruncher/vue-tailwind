<script setup lang="ts">
const props = defineProps<{
  modelValue: string | number
  options: Array<{ label: string; value: string | number }>
}>()

const emit = defineEmits(["update:modelValue"])
</script>

<template>
  <select
    class="gc-select bg-surface text-text border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 hover:border-muted transition-colors"
    :value="modelValue"
    @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
  >
    <option v-for="opt in options" :key="opt.value" :value="opt.value">
      {{ opt.label }}
    </option>
  </select>
</template>
