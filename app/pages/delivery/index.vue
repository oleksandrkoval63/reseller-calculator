<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useDeliveriesStore } from '~/stores/deliveries'
import type { Delivery } from '~~/entities/delivery/types'

import { modalRegistry } from '~~/shared/config/modal-registry'

const deliveriesStore = useDeliveriesStore()
const authStore = useAuthStore()

const { open } = useModals()
const { t } = useI18n()

const handleOpenDelivery = () => {
  open(modalRegistry.LazyCreateDelivery)
}

const handleEditDelivery = (parcel: Delivery) => {
  open(modalRegistry.LazyEditDelivery, { delivery: parcel })
}

onMounted(() => deliveriesStore.setDeliveries())
</script>

<template>
  <div class="delivery-wrapper">
    <div class="delivery-actions">
      <AButton
        v-if="deliveriesStore.deliveries?.length"
        styled="success"
        @click="handleOpenDelivery"
        ><AText size="18px">+ {{ t('actionBtns.addDelivery') }}</AText></AButton
      >
    </div>

    <div class="delivery-scroll">
      <AScroll>
        <div v-if="deliveriesStore.deliveries?.length" class="delivery-list">
          <DeliveryCard
            v-for="(parcel, idx) in deliveriesStore.deliveries"
            :key="parcel.id"
            :parcel
            :idx
            @click.stop="handleEditDelivery(parcel)"
          />
        </div>

        <MEmpty v-else type="deliveries" />
      </AScroll>
    </div>

    <ClientOnly>
      <MAuthorize v-if="!authStore.isAuthenticated" />
    </ClientOnly>
  </div>
</template>

<style scoped lang="scss">
.delivery-actions {
  font-weight: 500;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 20px;
}

.delivery-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.delivery-scroll {
  position: relative;
  height: 100%;
}
</style>
