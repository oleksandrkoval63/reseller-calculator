<script setup lang="ts">
import { useModalsStore } from '~/stores/modals'
import { modalRegistry } from '~~/shared/config/modal-registry'

const { t } = useI18n()

const { open } = useModalsStore()

const handleOpenAuth = () => {
  open(modalRegistry.LazyAuthLogin)
}
</script>

<template>
  <ABadge class="lock">
    <AIcon name="lock" size="60px" />
    <AText size="24px">{{ t('auth.titleLogin') }}</AText>
    <AButton styled="primary" @click="handleOpenAuth"
      ><AText size="20px">{{ t('auth.buttons.auth') }}</AText></AButton
    >
  </ABadge>
</template>

<style scoped lang="scss">
.lock {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--color-overlay);
  backdrop-filter: blur(16px);
  top: 0;

  .a-button {
    font-weight: 600;
    min-width: 125px;
  }
}
</style>
