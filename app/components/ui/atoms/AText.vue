<script setup lang="ts">
import type { TextTag, TextType } from '~~/shared/types'

const props = withDefaults(
  defineProps<{
    as?: TextTag
    type?: TextType
    size?: number | string
    color?: string
    weight?: '400' | '500' | '600' | '700' | null
  }>(),
  {
    as: 'span',
    type: 'default',
    size: '16px',
    color: 'var(--color-white)',
    weight: null,
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
  font-weight: v-bind(weight);

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
