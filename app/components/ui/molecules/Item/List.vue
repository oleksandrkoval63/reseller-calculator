<script setup lang="ts">
import { useFiltersStore } from '~/stores/filters'
import { useItemsStore } from '~/stores/items'
import type { ClothingItem } from '~~/entities/item/types'

const props = defineProps<{
  data: ClothingItem[]
}>()

const itemsStore = useItemsStore()
const filtersStore = useFiltersStore()

const { t } = useI18n()

const clotingItems = computed(() => props?.data ?? [])
const searchedText = computed(() => filtersStore.searchedText)
const sorting = computed(() => filtersStore.sorting)

const { filteredItems } = useFilteredItems(clotingItems, searchedText, sorting)

const skeletonsLength = computed(() => filteredItems.value.length || 6)

if (import.meta.client) {
  watch(
    filteredItems,
    (items) => {
      itemsStore.setItemQty(items.length)
      itemsStore.setFilteredItems(items)
    },
    { immediate: true },
  )
}
</script>

<template>
  <div>
    <div class="clothes-list__row clothes-list__row--head">
      <div class="clothes-list__cell clothes-list__cell--product">{{ t('clothes.title') }}</div>
      <div class="clothes-list__cell">{{ t('clothes.status') }}</div>
      <div class="clothes-list__cell">{{ t('clothes.stats.purchasedPrice') }}</div>
      <div class="clothes-list__cell">{{ t('clothes.stats.plannedPrice') }}</div>
      <div class="clothes-list__cell">{{ t('clothes.stats.soldPrice') }}</div>
      <div class="clothes-list__cell">{{ t('clothes.stats.quantity') }}</div>
      <div class="clothes-list__cell">{{ t('clothes.stats.profit') }}</div>

      <div class="clothes-list__cell clothes-list__cell--actions">{{ t('clothes.actions') }}</div>
    </div>

    <div v-if="!itemsStore.isFetched" class="skeleton-wrapper">
      <SkeletonListCard v-for="count in skeletonsLength" :key="count" height="94px" />
    </div>

    <div v-else-if="filteredItems?.length" class="cards-scroll">
      <ClothesListCard v-for="item in itemsStore.filteredItems" :key="item?.id" :item />
    </div>

    <MEmpty v-else type="items" />
  </div>
</template>

<style scoped lang="scss">
.skeleton-wrapper {
  max-height: 600px;
  overflow: hidden;
}

.clothes-list__row {
  display: grid;
  grid-template-columns: minmax(290px, 1fr) repeat(7, 1fr);
  align-items: center;
  column-gap: 16px;
}

.clothes-list__row--head {
  min-height: 52px;
  color: var(--color-text-muted);
  font-size: 14px;
  font-weight: 500;
}

.clothes-list__cell {
  color: var(--color-white);
  font-size: 18px;
  font-weight: 500;
  text-align: center;
}

.clothes-list__cell--product {
  min-width: 0;
  text-align: left;
}

.clothes-list__cell--actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
</style>
