<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineEmits<{
  close: []
}>()

const { t } = useI18n()
</script>

<template>
  <div class="create-item-modal">
    <div class="create-head">
      <AText as="h2" type="primary" class="create-title">
        {{ t('modals.createItem.title') }}
      </AText>

      <AText as="p" type="muted" class="create-text">
        {{ t('modals.createItem.desc') }}
      </AText>
    </div>

    <MForm @close="$emit('close')" />
  </div>
</template>

<style scoped lang="scss">
.create-head {
  margin-bottom: 16px;
}
</style>
