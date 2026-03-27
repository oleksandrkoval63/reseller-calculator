<script setup lang="ts">
import type { SelectType } from '~~/shared/types'

const model = defineModel<string | number | null>()

const props = withDefaults(
  defineProps<{
    multiple?: true | false
    options: SelectType[]
  }>(),
  {
    multiple: false,
  },
)

const selected = ref<SelectType | null>(null)
const isOpen = ref(false)

const handleChangeSelected = (option: SelectType) => {
  selected.value = option
  model.value = option.value
}

const handleOpenSelect = () => {
  isOpen.value = !isOpen.value
}

const defaultSelected = () => {
  selected.value = props?.options[0] ?? null
}

const availableOptions = computed(() => {
  return props?.options.filter((option) => selected.value?.value !== option.value)
})

defaultSelected()
</script>

<template>
  <ABadge class="a-select" @click="handleOpenSelect">
    <AText as="span">{{ selected?.label }}</AText>

    <ul v-if="availableOptions?.length" :class="['a-select__list', { open: isOpen }]">
      <li
        v-for="option in availableOptions"
        :key="option.value"
        @click="handleChangeSelected(option)"
      >
        <AText>{{ option?.label }}</AText>
      </li>
    </ul>
  </ABadge>
</template>

<style scoped lang="scss">
.a-select {
  background: var(--color-button-background);
  border: 1px solid var(--color-button-border);
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease;
  align-items: start;
  overflow: hidden;
  padding: 0;
  cursor: pointer;

  .text {
    padding: 12px 16px;
  }

  &:hover {
    background: var(--color-button-background-hov);
    border: 1px solid var(--color-button-border-hov);
  }
}

.a-select__list {
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: 0;
  opacity: 0;
  text-align: left;
  border-top: 1px solid var(--color-button-border);
  transition:
    max-height 0.2s ease,
    opacity 0.2s ease,
    transform 0.2s ease;

  li {
    transition: all 0.3s ease;

    span {
      display: inline-block;
    }

    &:hover {
      background: var(--color-text-muted);
    }
  }

  &.open {
    max-height: 700px;
    opacity: 1;
  }
}
</style>
