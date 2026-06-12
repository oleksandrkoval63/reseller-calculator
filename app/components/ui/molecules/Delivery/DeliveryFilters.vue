<script setup lang="ts">
import { useDeliveriesStore } from '~/stores/deliveries'

const deliveriesStore = useDeliveriesStore()

const { t } = useI18n()

const sortStatus = computed(() => [
  {
    label: t('delivery.sorting.status.all'),
    value: 'all',
  },
  {
    label: t('delivery.sorting.status.draft'),
    value: 'draft',
  },
  {
    label: t('delivery.sorting.status.transit'),
    value: 'transit',
  },
  {
    label: t('delivery.sorting.status.arrived'),
    value: 'arrived',
  },
  {
    label: t('delivery.sorting.status.cancelled'),
    value: 'cancelled',
  },
])

const sortType = computed(() => [
  {
    label: t('delivery.sorting.type.all'),
    value: 'all',
  },
  {
    label: t('delivery.sorting.type.expensive'),
    value: 'expensive',
  },
  {
    label: t('delivery.sorting.type.cheap'),
    value: 'cheap',
  },
  {
    label: t('delivery.sorting.type.new'),
    value: 'new',
  },
  {
    label: t('delivery.sorting.type.old'),
    value: 'old',
  },
  {
    label: t('delivery.sorting.type.az'),
    value: 'az',
  },
  {
    label: t('delivery.sorting.type.za'),
    value: 'za',
  },
])

const handleDispatchSorting = (sorting: Sorting) => {
  deliveriesStore.setSorting(sorting)
}
</script>

<template>
  <div class="deliveries-filters">
    <MSearch v-model="deliveriesStore.searchedText" />

    <MSort :sort-status="sortStatus" :sort-type="sortType" @sort-update="handleDispatchSorting" />
  </div>
</template>

<style scoped lang="scss">
.deliveries-filters {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
