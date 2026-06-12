<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string
    size?: number | string
    color?: string
    hoverColor?: string
  }>(),
  {
    size: 20,
    color: 'var(--color-text-muted)',
    hoverColor: 'var(--color-text-muted)',
  },
)

const iconSize = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size))

const iconUrl = computed(() => `/images/shared/${props?.name}.svg`)
</script>

<template>
  <span
    class="a-icon"
    :style="{
      width: iconSize,
      height: iconSize,
      mask: `url(${iconUrl}) no-repeat center / contain`,
      WebkitMask: `url(${iconUrl}) no-repeat center / contain`,
    }"
  />
</template>

<style scoped lang="scss">
.a-icon {
  display: inline-block;
  flex-shrink: 0;
  background: v-bind(color);
  transition: all 0.5s ease;

  &:hover {
    background: v-bind(hoverColor);
  }
}
</style>
