<script setup lang="ts">
import type { TextTag, TextType } from '~~/shared/types'

const props = withDefaults(
  defineProps<{
    as?: TextTag
    type?: TextType
    size?: number | string
    color?: string
  }>(),
  {
    as: 'span',
    type: 'default',
    size: '16px',
    color: 'var(--color-white)',
  },
)

const tagWatcher = computed(() => {
  const as = props?.as

  if (as === 'h1' || as === 'h2' || as === 'h3' || as === 'h4') {
    return false
  }

  return true
})

const textSize = computed(() => {
  if (tagWatcher.value) {
    return props?.size
  }

  return undefined
})
</script>

<template>
  <component :is="as" :class="['text', type, { 'custom-size': textSize }]">
    <slot />
  </component>
</template>

<style scoped lang="scss">
.text {
  color: v-bind(color);

  &.primary {
    color: var(--color-primary);
  }

  &.danger {
    color: var(--color-danger);
  }

  &.muted {
    color: var(--color-text-muted);
  }

  &.custom-size {
    font-size: v-bind(textSize);
  }
}
</style>
