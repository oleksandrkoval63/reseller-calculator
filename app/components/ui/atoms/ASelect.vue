<script setup lang="ts">
import type { SelectType } from '~~/shared/types'

const model = defineModel<string | number | null>()

const props = withDefaults(
  defineProps<{
    multiple?: true | false
    options: SelectType[]
    type?: 'default' | 'absolute'
    placeholder?: string
  }>(),
  {
    multiple: false,
    type: 'default',
    placeholder: '',
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
  <ABadge
    :class="['a-select', { modified: type === 'absolute' }, { open: isOpen }]"
    @click="handleOpenSelect"
  >
    <div v-if="placeholder" class="select-heading">
      <AText as="span">{{ placeholder }}:</AText>
      <AText as="span" class="label">{{ selected?.label }}</AText>
    </div>

    <AText v-else as="span">{{ selected?.label }}</AText>

    <ul
      v-if="availableOptions?.length"
      :class="['a-select__list', { open: isOpen }, { absolute: type === 'absolute' }]"
    >
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

  &.modified {
    overflow: unset;
    position: relative;
    min-width: 125px;
    border-radius: 12px;

    .text {
      padding: 8px;
      width: 100%;
    }

    .select-heading {
      width: 100%;
    }
  }

  &.open {
    border-radius: 12px 12px 0 0;
    border-bottom: 0;
  }

  &:hover {
    background: var(--color-button-background-hov);
  }
}

.a-select__list {
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: 0;
  opacity: 0;
  text-align: left;
  visibility: hidden;
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
    visibility: visible;
  }

  &.absolute {
    position: absolute;
    top: 40px;
    left: -1px;
    min-width: 125px;
    background: var(--color-button-background);
    backdrop-filter: blur(16px);
    border: 1px solid var(--color-button-border);
    border-radius: 0 0 12px 12px;
    z-index: 999;
    text-align: center;
  }
}
</style>
