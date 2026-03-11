<script setup lang="ts">
import type { ClothingItem } from '~~/entities/item/types'

defineProps<{
  data: ClothingItem[]
}>()
</script>

<template>
  <div v-if="data?.length" class="clothes-list__table">
    <div class="clothes-list__row clothes-list__row--head">
      <div class="clothes-list__cell clothes-list__cell--product">Товар</div>
      <div class="clothes-list__cell">Куплено</div>
      <div class="clothes-list__cell">Цена</div>
      <div class="clothes-list__cell">Продано</div>
      <div class="clothes-list__cell">Кол-во</div>
      <div class="clothes-list__cell clothes-list__cell--actions">Дії</div>
    </div>

    <Card v-for="item in data" :key="item?.id" :item />
  </div>
</template>

<style scoped lang="scss">
.clothes-list__table {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.clothes-list__row {
  display: grid;
  grid-template-columns: minmax(320px, 1.9fr) 130px 130px 130px 100px 120px;
  align-items: center;
  column-gap: 20px;
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
