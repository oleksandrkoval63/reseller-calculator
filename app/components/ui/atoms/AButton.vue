<script setup lang="ts">
import type { ButtonType, ButtonStyle } from '~~/shared/types'

withDefaults(
  defineProps<{
    type?: ButtonType
    styled?: ButtonStyle
    to?: string
  }>(),
  {
    type: 'button',
    styled: 'default',
    to: '',
  },
)
</script>

<template>
  <NuxtLink v-if="to" :to :class="['a-button', styled]">
    <slot />
  </NuxtLink>

  <button v-else :type :class="['a-button', styled]">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.a-button {
  background: var(--color-button-background);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-button-border);
  border-radius: var(--button-border-radius);
  color: var(--color-text);
  font-size: 18px;
  padding: var(--button-padding);
  transition:
    background 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background: var(--color-button-background-hov);
    border-color: var(--color-button-border-hov);
  }

  &.primary {
    background: var(--color-button-primary);

    &:hover {
      background: var(--color-button-primary-hov);
    }
  }

  &.danger {
    background: var(--color-button-danger);

    &:hover {
      background: var(--color-button-danger-hov);
    }
  }

  &.disabled {
    background: var(--color-button-disabled);
  }
}
</style>
