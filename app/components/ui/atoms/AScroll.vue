<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { OverlayScrollbars } from 'overlayscrollbars'
import 'overlayscrollbars/overlayscrollbars.css'

withDefaults(
  defineProps<{
    height?: string
  }>(),
  {
    height: '650px',
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
