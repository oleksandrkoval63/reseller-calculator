<script setup lang="ts">
import type { ClothingItem } from '~~/entities/item/types'

const model = defineModel<number[]>()

const props = defineProps<{
  items: ClothingItem[]
  deliveryItems?: ClothingItem[]
  search?: boolean
  absolute?: boolean
}>()

const emit = defineEmits<{
  (e: 'updateCount', selectedCount: number): void
}>()

const { t } = useI18n()

const pickerRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)

const selectedItems = ref<ClothingItem[]>(props?.deliveryItems ?? [])

const isSameItem = (id: number) => {
  return selectedItems.value.some((selItem) => selItem.id === id)
}

const setSelectedItems = (item: ClothingItem) => {
  if (isSameItem(item.id)) return

  selectedItems.value = [...selectedItems.value, item]
}

const deleteSelectedItem = (id: number) => {
  selectedItems.value = selectedItems.value.filter((selItem) => selItem.id !== id)
}

const clearSelectedItems = () => {
  selectedItems.value = []
}

const handleTogglePicker = () => {
  isOpen.value = !isOpen.value
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node | null

  if (!pickerRef.value || !target) return

  if (!pickerRef.value.contains(target)) {
    isOpen.value = false
  }
}

const availableItems = computed(() => {
  if (!selectedItems.value) return props?.items

  return props?.items.filter(
    (item) => !selectedItems.value.some((selItem) => item.id === selItem.id),
  )
})

const selectedItemsIds = computed(() => {
  return selectedItems.value.map((item) => item.id)
})

onMounted(() => document.addEventListener('click', handleClickOutside))

onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))

defineExpose({
  clearSelectedItems,
})

if (import.meta.client) {
  watch(
    () => selectedItems.value.length,
    () => {
      model.value = selectedItemsIds.value
      emit('updateCount', selectedItems.value.length)
    },
  )
}
</script>

<template>
  <div ref="pickerRef" :class="['picker', { open: isOpen }]">
    <div class="picker-heading">
      <PickerSelected
        v-if="selectedItems?.length"
        :selected-items="selectedItems"
        @delete-selected="deleteSelectedItem"
      />

      <AText v-else-if="!isOpen" as="span" size="15px" color="var(--color-text-muted)">{{
        t('itemPicker.empty')
      }}</AText>

      <AText v-else as="span" size="15px" color="var(--color-text-muted)">{{
        t('itemPicker.null')
      }}</AText>
    </div>

    <div class="picker-toggle d-flex" @click.stop="handleTogglePicker">
      <AIcon name="chevron-down" />
    </div>

    <Transition name="picker">
      <PickerList
        v-if="isOpen"
        :available-items="availableItems"
        absolute
        @update-selected="setSelectedItems"
      />
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.picker {
  min-height: 51px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.picker-toggle {
  padding: 4px;
  background: var(--color-button-background);
  text-align: center;
  border-radius: 0 0 12px 12px;
  border: 1px solid var(--color-button-border);
  transition: all 0.5s ease;
  cursor: pointer;

  &:hover {
    background: var(--color-button-background-hov);
  }
}

.open {
  .picker-toggle {
    border-radius: 0;
    border-bottom: 0;

    .a-icon {
      transform: rotate(-180deg);
    }
  }

  .picker-heading {
    max-height: unset;
    overflow: unset;
  }
}

.picker-heading {
  background: var(--color-button-background);
  padding: 12px 16px;
  border-radius: 12px 12px 0 0;
  border: 1px solid var(--color-button-border);
  border-bottom: 0;
  max-height: 170px;
  overflow: hidden;
  text-align: center;
}

.picker-enter-active,
.picker-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.picker-enter-from,
.picker-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

.picker-enter-to,
.picker-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
