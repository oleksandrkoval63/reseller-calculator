<script setup lang="ts">
const model = defineModel<string | string[] | number[] | number | null>()

const props = withDefaults(
  defineProps<{
    options: DefaultOptionType[]
    multiple?: true | false
    type?: 'default' | 'absolute'
    placeholder?: string
    defaultSelected?: boolean
  }>(),
  {
    multiple: false,
    type: 'default',
    placeholder: '',
    defaultSelected: false,
  },
)

const isOpen = ref(false)
const selected = ref<DefaultOptionType | DefaultOptionType[] | null>(props.multiple ? [] : null)

const isSameOption = (a: DefaultOptionType, b: DefaultOptionType) => {
  return a.value === b.value
}

const syncSelectedFromModel = () => {
  const modelValue = model.value

  if (modelValue === null || modelValue === undefined) {
    selected.value = props.multiple ? [] : null
    return
  }

  if (props.multiple) {
    const modelValues = (Array.isArray(modelValue) ? modelValue : []) as (string | number)[]

    selected.value = props.options.filter((option) => modelValues.includes(option.value))

    return
  }

  selected.value = props.options.find((option) => option.value === modelValue) ?? null
}

const handleChangeSelected = (option: DefaultOptionType) => {
  if (props.multiple) {
    const currentSelected = Array.isArray(selected.value) ? selected.value : []

    const exists = currentSelected.some((item) => isSameOption(item, option))

    const nextSelected = exists
      ? currentSelected.filter((item) => !isSameOption(item, option))
      : [...currentSelected, option]

    selected.value = nextSelected
    model.value = nextSelected.map((nextOption) => nextOption.value) as string[] | number[]
    return
  }

  selected.value = option
  model.value = option.value
  isOpen.value = false
}

const handleOpenSelect = () => {
  isOpen.value = !isOpen.value
}

const selectedLabel = computed(() => {
  if (!selected.value) return ''

  if (Array.isArray(selected.value)) {
    return selected.value.map((option) => option.label).join(', ')
  }

  return selected.value.label
})

const availableOptions = computed(() => {
  const selectedValue = selected.value

  if (!selectedValue) return props.options

  if (Array.isArray(selectedValue)) {
    return props.options.filter(
      (option) => !selectedValue.some((selectedItem) => isSameOption(selectedItem, option)),
    )
  }

  return props.options.filter((option) => !isSameOption(selectedValue, option))
})

const isPlaceholder = computed(() => (props?.placeholder ? `${props.placeholder}:` : ''))

watch(
  [() => model.value, () => props.options, () => props.multiple],
  () => {
    syncSelectedFromModel()
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <ABadge
    :class="['m-select', { modified: type === 'absolute' }, { open: isOpen }]"
    @click="handleOpenSelect"
  >
    <AText as="span">{{ isPlaceholder }} {{ selectedLabel }}</AText>

    <ul
      v-if="availableOptions?.length"
      :class="['m-select__list', { open: isOpen }, { absolute: type === 'absolute' }]"
    >
      <li
        v-for="option in availableOptions"
        :key="option.value"
        @click.stop="handleChangeSelected(option)"
      >
        <AText>{{ option?.label }}</AText>
      </li>
    </ul>
  </ABadge>
</template>

<style scoped lang="scss">
.m-select {
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
  }

  &.open {
    border-radius: 12px 12px 0 0;
    border-bottom: 0;
  }

  &:hover {
    background: var(--color-button-background-hov);
  }
}

.m-select__list {
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
