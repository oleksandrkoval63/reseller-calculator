<script setup lang="ts">
defineEmits<{
  close: []
}>()

const { t } = useI18n()
</script>

<template>
  <div class="create-item-modal">
    <div class="create-head">
      <AText as="h2" type="primary" class="create-title">
        {{ t('modals.createDelivery.title') }}
      </AText>

      <AText as="p" type="muted" class="create-text">
        {{ t('modals.createDelivery.desc') }}
      </AText>
    </div>

    <DeliveryForm @close="$emit('close')" />
  </div>
</template>

<style scoped lang="scss">
.create-head {
  margin-bottom: 16px;
}
</style>
