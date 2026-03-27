<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { OverlayScrollbars } from 'overlayscrollbars'
import 'overlayscrollbars/overlayscrollbars.css'

withDefaults(
  defineProps<{
    height?: string
    right?: string
    padblock?: string
  }>(),
  {
    height: '650px',
    right: '10px',
    padblock: '0px',
  },
)

const scrollRef = ref<HTMLElement | null>(null)
let osInstance: ReturnType<typeof OverlayScrollbars> | null = null

onMounted(() => {
  if (!scrollRef.value) return

  osInstance = OverlayScrollbars(scrollRef.value, {
    scrollbars: {
      theme: 'os-theme-app',
      autoHide: 'leave',
      autoHideDelay: 700,
      dragScroll: true,
      clickScroll: true,
    },
  })
})

onBeforeUnmount(() => {
  osInstance?.destroy()
})
</script>

<template>
  <div ref="scrollRef" class="cards-scroll">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.cards-scroll {
  max-height: v-bind(height);
}
</style>

<style lang="scss">
.os-scrollbar.os-theme-app {
  --os-size: 4px;
  --os-padding-perpendicular: 0;
  --os-padding-axis: v-bind(padblock);

  --os-track-bg: transparent;
  --os-track-bg-hover: rgba(255, 255, 255, 0.04);
  --os-track-bg-active: rgba(255, 255, 255, 0.06);
  --os-track-border-radius: 50px;

  --os-handle-bg: var(--color-primary);
  --os-handle-bg-hover: var(--color-primary-hover);
  --os-handle-bg-active: var(--color-primary-hover);
  --os-handle-border-radius: 50px;

  --os-handle-min-size: 36px;
  --os-handle-interactive-area-offset: 4px;
}

[data-overlayscrollbars] {
  position: unset !important;
}

[data-overlayscrollbars-padding],
[data-overlayscrollbars-viewport]:not([data-overlayscrollbars]) {
  position: unset !important;
}

.os-scrollbar.os-scrollbar-vertical .os-scrollbar-handle {
  right: v-bind(right) !important;
}
</style>
