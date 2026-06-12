<script setup lang="ts">
import type { ClothingItem } from '~~/entities/item/types'

const props = defineProps<{
  availableItems: ClothingItem[]
  absolute?: boolean
}>()

const emit = defineEmits<{
  (e: 'updateSelected', item: ClothingItem): void
}>()

const { locale } = useI18n()

const searchedText = ref<string>('')

const filteredItems = computed(() => {
  if (!props?.availableItems) return []

  const search = searchedText.value.trim().toLowerCase()

  if (!search) return props?.availableItems

  return props.availableItems.filter(
    (item) =>
      item?.title.toLowerCase().includes(search) || item?.brand.toLowerCase().includes(search),
  )
})

const itemsCountText = computed(() => {
  return pluralizeItems(filteredItems.value?.length, locale.value)
})

const updateSelected = (item: ClothingItem) => {
  emit('updateSelected', item)
}
</script>

<template>
  <div :class="['picker-list', { absolute }]">
    <div class="picker-list__heading">
      <AText v-if="itemsCountText" as="span" size="14px">{{ itemsCountText }}</AText>
      <MSearch v-model="searchedText" />
    </div>

    <div v-if="filteredItems?.length" class="picker-list_scroll">
      <AScroll height="275px" right="0">
        <div class="picker-list__wrapper">
          <PickerCard
            v-for="avItem in filteredItems"
            :key="avItem.id"
            :item="avItem"
            @picked="updateSelected"
          />
        </div>
      </AScroll>
    </div>

    <MEmpty v-else type="deliveries" />
  </div>
</template>

<style scoped lang="scss">
.picker-list_scroll {
  position: relative;
}

.picker-list {
  display: flex;
  flex-direction: column;
  gap: 12px;

  &.absolute {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: var(--color-button-background);
    border: 1px solid var(--color-button-border);
    border-radius: 0 0 12px 12px;
    padding: 12px;
    z-index: 999;
    backdrop-filter: blur(4px);
  }
}

.picker-list__heading {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .text {
    background: var(--color-surface);
    padding: 4px 8px;
    border-radius: 8px;
    width: fit-content;
  }
}

.picker-list__wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
}
</style>
