<script setup lang="ts">
import { useModalsStore } from '~/stores/modals'
import { modalRegistry } from '~~/shared/config/modal-registry'

defineProps<{
  count: number
}>()

const { t } = useI18n()

const { open } = useModalsStore()

const handleOpenModal = () => {
  open(modalRegistry.LazyCreateItem)
}
</script>

<template>
  <div class="item-filters">
    <MSearch />

    <MSort />

    <Display />
    <AButton v-if="count" class="create" styled="success" @click="handleOpenModal">
      <AText size="18px">+ {{ t('actionBtns.addItem') }}</AText>
    </AButton>
  </div>
</template>

<style scoped lang="scss">
.item-filters {
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.create {
  font-weight: 600;
  margin-left: auto;
}
</style>
