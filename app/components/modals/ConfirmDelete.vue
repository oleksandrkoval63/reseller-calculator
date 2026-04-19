<script setup lang="ts">
import { useDeliveriesStore } from '~/stores/deliveries'
import { useItemsStore } from '~/stores/items'

const emit = defineEmits<{
  close: []
}>()

const props = defineProps<{
  id: number
  type: 'items' | 'deliveries'
  imageKeys?: string[]
}>()

const itemsStore = useItemsStore()
const deliveriesStore = useDeliveriesStore()

const isImageKeys = computed(() => (props?.imageKeys ? props?.imageKeys : []))

const handleDeleteItem = () => {
  if (props?.type === 'items') {
    itemsStore.delItem(props?.id, isImageKeys.value)
    emit('close')

    return
  }

  deliveriesStore.deleteDelivery(props?.id)
  emit('close')
}

const { t } = useI18n()
</script>

<template>
  <div class="confirm-delete">
    <AText as="h2">{{ t('modals.confirmDelete.title') }}</AText>
    <AText size="18px" type="danger">{{ t('modals.confirmDelete.desc') }}</AText>

    <div class="confirm-delete__actions">
      <AButton styled="primary" @click="handleDeleteItem">
        <AText>{{ t('modals.actions.delete') }}</AText>
      </AButton>

      <AButton @click="emit('close')">
        <AText>{{ t('modals.actions.cancel') }}</AText>
      </AButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.confirm-delete {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 8px;
}

.confirm-delete__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
}
</style>
