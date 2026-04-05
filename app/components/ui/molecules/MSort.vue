<script setup lang="ts">
import { useFiltersStore } from '~/stores/filters'
import type { Sorting } from '~~/shared/types'

const filtersStore = useFiltersStore()

const { t } = useI18n()

const sorting = reactive<Sorting>({
  status: 'all',
  type: 'all',
})

const sortOptions = computed(() => [
  {
    label: t('status.all'),
    value: 'all',
  },
  {
    label: t('status.draft'),
    value: 'draft',
  },
  {
    label: t('status.listed'),
    value: 'listed',
  },
  {
    label: t('status.sold'),
    value: 'sold',
  },
])

const sortTypeOptions = computed(() => [
  {
    label: t('sorting.type.all'),
    value: 'all',
  },
  {
    label: t('sorting.type.expensive'),
    value: 'expensive',
  },
  {
    label: t('sorting.type.cheap'),
    value: 'cheap',
  },
  {
    label: t('sorting.type.new'),
    value: 'new',
  },
  {
    label: t('sorting.type.old'),
    value: 'old',
  },
  {
    label: t('sorting.type.az'),
    value: 'az',
  },
  {
    label: t('sorting.type.za'),
    value: 'za',
  },
])

if (import.meta.client) {
  watch(
    sorting,
    (newSorting) => {
      filtersStore.setSorting(newSorting)
    },
    { immediate: true },
  )
}
</script>

<template>
  <div class="sort-wrapper d-flex">
    <ASelect
      v-model="sorting.status"
      class="sort"
      :options="sortOptions"
      type="absolute"
      :placeholder="t('clothes.status')"
    />

    <ASelect
      v-model="sorting.type"
      class="sort"
      :options="sortTypeOptions"
      type="absolute"
      :placeholder="t('sorting.sortSelect')"
    />
  </div>
</template>

<style scoped lang="scss">
.sort-wrapper {
  gap: 16px;
}

.sort {
  padding: 6px 2px;
}
</style>
