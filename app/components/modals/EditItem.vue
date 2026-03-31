<script setup lang="ts">
import type { ClothingItem } from '~~/entities/item/types'

defineEmits<{
  close: []
}>()

defineProps<{
  item: ClothingItem
}>()

const { t } = useI18n()
</script>

<template>
  <div class="create-item-modal">
    <div class="create-head">
      <AText as="h2" type="primary" class="create-title">
        {{ t('modals.editItem.title') }}
      </AText>

      <AText as="p" type="muted" class="create-text">
        {{ t('modals.editItem.desc') }}
      </AText>
    </div>

    <MForm v-if="item" :item @close="$emit('close')" />
  </div>
</template>

<style scoped lang="scss">
.create-head {
  margin-bottom: 16px;
}
</style>
