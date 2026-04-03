<script setup lang="ts">
withDefaults(
  defineProps<{
    width?: string
    height?: string
    radius?: string
  }>(),
  {
    width: '100%',
    height: '24px',
    radius: '8px',
  },
)
</script>

<template>
  <div
    class="ui-skeleton"
    :style="{
      width,
      height,
      borderRadius: radius,
    }"
  />
</template>

<style scoped lang="scss">
.ui-skeleton {
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.14), transparent);
    animation: skeleton-loading 1.3s infinite;
  }
}

@keyframes skeleton-loading {
  100% {
    transform: translateX(100%);
  }
}
</style>
