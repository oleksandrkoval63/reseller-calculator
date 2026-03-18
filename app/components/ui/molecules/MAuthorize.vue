<script setup lang="ts">
const localePath = useLocalePath()

const { t } = useI18n()
</script>

<template>
  <ABadge class="lock">
    <AIcon name="lock" size="60px" />
    <AText size="24px">{{ t('auth.title') }}</AText>
    <AButton :to="localePath('/login')" styled="primary">{{ t('auth.buttons.signIn') }}</AButton>
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
