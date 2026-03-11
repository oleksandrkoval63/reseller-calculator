<script setup lang="ts">
import type { TextTag, TextType } from '~~/shared/types'

withDefaults(
  defineProps<{
    as?: TextTag
    type?: TextType
  }>(),
  {
    as: 'span',
    type: 'default',
  },
)
</script>

<template>
  <component :is="as" :class="['text', type]">
    <slot />
  </component>
</template>

<style scoped lang="scss">
.text {
  &.primary {
    color: var(--color-primary);
  }
}
</style>
