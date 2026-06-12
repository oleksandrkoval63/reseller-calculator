<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useDeliveriesStore } from '~/stores/deliveries'

import { modalRegistry } from '~~/shared/config/modal-registry'

const deliveriesStore = useDeliveriesStore()
const authStore = useAuthStore()

const { open } = useModals()
const { t } = useI18n()

const handleOpenDelivery = () => {
  open(modalRegistry.LazyCreateDelivery)
}

onMounted(() => deliveriesStore.setDeliveries())
</script>

<template>
  <div class="delivery-wrapper">
    <div class="delivery-actions">
      <DeliveryFilters />

      <AButton
        v-if="deliveriesStore.deliveries?.length"
        class="create-delivery"
        styled="success"
        @click="handleOpenDelivery"
        ><AText size="18px">+ {{ t('actionBtns.addDelivery') }}</AText></AButton
      >
    </div>

    <DeliveryList :deliveries="deliveriesStore.deliveries" />

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
  display: flex;
  align-items: center;
  gap: 8px;

  .create-delivery {
    margin-left: auto;
  }
}
</style>
