<script setup lang="ts">
import type { ClothingItem } from '~~/entities/item/types'

defineProps<{
  selectedItems: ClothingItem[]
}>()

const emit = defineEmits<{
  (e: 'deleteSelected', id: number): void
}>()

const deleteSelectedItem = (id: number) => {
  emit('deleteSelected', id)
}
</script>

<template>
  <div v-if="selectedItems?.length" class="picker-selected">
    <PickerCard
      v-for="selItem in selectedItems"
      :key="selItem.id"
      :item="selItem"
      card="selected"
      @delete="deleteSelectedItem"
    />
  </div>
</template>

<style scoped lang="scss">
.picker-selected {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
