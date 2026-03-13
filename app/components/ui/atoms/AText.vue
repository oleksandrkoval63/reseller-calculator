<script setup lang="ts">
import type { TextTag, TextType } from '~~/shared/types'

const props = withDefaults(
  defineProps<{
    as?: TextTag
    type?: TextType
    size?: number | string
  }>(),
  {
    as: 'span',
    type: 'default',
    size: '16px',
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
  &.primary {
    color: var(--color-primary);
  }

  &.custom-size {
    font-size: v-bind(textSize);
  }
}
</style>
