<script setup lang="ts">
import { useDeliveriesStore } from '~/stores/deliveries'
import type { Delivery } from '~~/entities/delivery/types'
import { modalRegistry } from '~~/shared/config/modal-registry'

const props = defineProps<{
  deliveries: Delivery[]
}>()

const { open } = useModals()

const deliveriesStore = useDeliveriesStore()

const deliveries = computed(() => props?.deliveries ?? [])
const searchedText = computed(() => deliveriesStore.searchedText)
const sorting = computed(() => deliveriesStore.sorting)

const { filteredDeliveries } = useFilteredDelivery(deliveries, searchedText, sorting)

const handleEditDelivery = (parcel: Delivery) => {
  open(modalRegistry.LazyEditDelivery, { delivery: parcel })
}

const skeletonsLength = computed(() => filteredDeliveries.value.length || 6)

if (import.meta.client) {
  watch(
    filteredDeliveries,
    (deliveries) => {
      deliveriesStore.setDeliveriesQty(deliveries.length)
      deliveriesStore.setFilteredDeliveries(deliveries)
    },
    { immediate: true },
  )
}
</script>

<template>
  <div class="delivery-scroll">
    <AScroll>
      <div v-if="!deliveriesStore.isFetched" class="skeleton-wrapper">
        <SkeletonListCard v-for="count in skeletonsLength" :key="count" height="94px" />
      </div>

      <div v-else-if="deliveriesStore.filteredDeliveries?.length" class="delivery-list">
        <DeliveryCard
          v-for="(parcel, idx) in deliveriesStore.filteredDeliveries"
          :key="parcel.id"
          :parcel
          :idx
          @click.stop="handleEditDelivery(parcel)"
        />
      </div>

      <MEmpty v-else type="deliveries" />
    </AScroll>
  </div>
</template>

<style scoped lang="scss">
.delivery-scroll {
  position: relative;
  height: 100%;
}

.delivery-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
