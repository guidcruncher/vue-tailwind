<script setup lang="ts">
import { ref } from "vue"
import { gcUUID } from "../utils/uuid"

const items = ref<any[]>([])
const loading = ref(false)

async function loadMore() {
  loading.value = true
  await new Promise((r) => setTimeout(r, 600))

  items.value.push(
    ...Array.from({ length: 30 }).map((_, i) => ({
      id: gcUUID(),
      name: `Item ${items.value.length + i + 1}`,
    })),
  )

  loading.value = false
}

// initial load
loadMore()
</script>

<template>
  <div class="p-6 space-y-10">
    <!-- Vertical Example -->
    <div>
      <h2 class="text-xl font-bold mb-3">Vertical Virtual Scroller</h2>

      <GcVirtualScroller
        :items="items"
        :itemSize="60"
        :loadMore="loadMore"
        :loading="loading"
        class="h-96 border border-border rounded"
      >
        <template #default="{ item }">
          <div class="p-4 border-b border-border bg-surface">
            {{ item.name }}
          </div>
        </template>
      </GcVirtualScroller>
    </div>

    <!-- Horizontal Example -->
    <div>
      <h2 class="text-xl font-bold mb-3">Horizontal Virtual Scroller</h2>

      <GcVirtualScroller
        direction="horizontal"
        :items="items"
        :itemSize="200"
        :loadMore="loadMore"
        :loading="loading"
        class="h-40 border border-border rounded"
      >
        <template #default="{ item }">
          <div
            class="inline-flex items-center justify-center w-48 h-full bg-surface border border-border mr-4"
          >
            {{ item.name }}
          </div>
        </template>
      </GcVirtualScroller>
    </div>
  </div>
</template>
