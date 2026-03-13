<script setup lang="ts">
import type { ClothingItem } from '~~/entities/item/types'
import ClothesGridCard from './ClothesGridCard.vue'

defineProps<{
  data: ClothingItem[]
}>()
</script>

<template>
  <div v-if="data?.length" class="clothes-grid__list">
    <ClothesGridCard v-for="item in data" :key="item?.id" :item />
  </div>
</template>

<style scoped lang="scss">
.clothes-grid__list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  margin-top: 20px;
}
</style>
