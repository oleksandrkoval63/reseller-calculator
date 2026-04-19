<script setup lang="ts">
import type { Delivery } from '~~/entities/delivery/types'

defineEmits<{
  close: []
}>()

defineProps<{
  delivery: Delivery
}>()

const { t } = useI18n()
</script>

<template>
  <div class="create-item-modal">
    <div class="create-head">
      <AText as="h2" type="primary" class="create-title">
        {{ t('modals.editDelivery.title') }}
      </AText>

      <AText as="p" type="muted" class="create-text">
        {{ t('modals.editDelivery.desc') }}
      </AText>
    </div>

    <DeliveryForm v-if="delivery" :delivery @close="$emit('close')" />
  </div>
</template>

<style scoped lang="scss">
.create-head {
  margin-bottom: 16px;
}
</style>
