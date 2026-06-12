<script setup lang="ts">
import type { Sorting } from '~~/shared/types'

const emit = defineEmits<{
  (e: 'sortUpdate', sorting: Sorting): void
}>()

defineProps<{
  sortStatus?: DefaultOptionType[]
  sortType?: DefaultOptionType[]
}>()

const { t } = useI18n()

const sorting = reactive<Sorting>({
  status: 'all',
  type: 'all',
})

if (import.meta.client) {
  watch(
    sorting,
    (newSorting) => {
      emit('sortUpdate', newSorting)
    },
    { immediate: true },
  )
}
</script>

<template>
  <div class="sort-wrapper d-flex">
    <MSelect
      v-if="sortStatus?.length"
      v-model="sorting.status"
      :options="sortStatus"
      type="absolute"
      :placeholder="t('clothes.status')"
      default-selected
    />

    <MSelect
      v-if="sortType?.length"
      v-model="sorting.type"
      :options="sortType"
      type="absolute"
      :placeholder="t('sorting.sortSelect')"
      default-selected
    />
  </div>
</template>

<style scoped lang="scss">
.sort-wrapper {
  gap: 16px;
}
</style>
