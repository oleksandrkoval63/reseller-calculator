<script setup lang="ts">
import { useModalsStore } from '~/stores/modals'
import { modalRegistry } from '~~/shared/config/modal-registry'

const { t } = useI18n()

const { open } = useModalsStore()

const handleOpenModal = () => {
  open(modalRegistry.LazyCreateItem)
}
</script>

<template>
  <div class="item-filters">
    <Display />
    <AButton class="create" styled="success" @click="handleOpenModal">
      <AText size="18px">+ {{ t('actionBtns.addItem') }}</AText>
    </AButton>
  </div>
</template>

<style scoped lang="scss">
.item-filters {
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.create {
  font-weight: 600;
}
</style>
