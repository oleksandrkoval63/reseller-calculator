<script setup lang="ts">
const emit = defineEmits<{
  add: []
}>()

const { t } = useI18n()
</script>

<template>
  <div class="empty-items">
    <div class="empty-items__content">
      <AText as="h2" class="empty-items__title">{{ t('empty.title') }}</AText>

      <AText as="p" class="empty-items__text">
        {{ t('empty.description') }}
      </AText>

      <div class="empty-items__scene" aria-hidden="true">
        <div class="empty-items__ground" />

        <div class="tumbleweed-wrap">
          <NuxtImg class="tumbleweed" src="/images/clothes/weed.webp" alt="weed" />
          <div class="tumbleweed-shadow" />
        </div>
      </div>

      <AButton styled="primary" class="empty-items__button" type="button" @click="emit('add')">{{
        t('actionBtns.addItem')
      }}</AButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.empty-items {
  display: flex;
  justify-content: center;
  padding: 32px 20px;
}

.empty-items__content {
  width: 100%;
  max-width: 760px;
  text-align: center;
}

.empty-items__title {
  margin: 0 0 12px;
  color: var(--color-white);
}

.empty-items__text {
  max-width: 450px;
  margin: 0 auto;
  color: var(--color-text-muted);
}

.empty-items__scene {
  position: relative;
  height: 240px;
  overflow: hidden;
}

.empty-items__ground {
  position: absolute;
  right: 0;
  bottom: 34px;
  left: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.08) 12%,
    rgba(255, 255, 255, 0.08) 88%,
    transparent 100%
  );
}

.tumbleweed-wrap {
  position: absolute;
  bottom: 35px;
  left: -140px;
  width: 92px;
  height: 92px;
  animation: tumbleweed-move 7s linear infinite;
}

.tumbleweed {
  display: block;
  width: 92px;
  height: 92px;
  object-fit: contain;
  transform-origin: center center;
  animation:
    tumbleweed-spin 1.15s linear infinite,
    tumbleweed-bounce 1.15s ease-in-out infinite;
  user-select: none;
  pointer-events: none;
}

.tumbleweed-shadow {
  position: absolute;
  bottom: -8px;
  left: 50%;
  width: 56px;
  height: 10px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.26);
  transform: translateX(-50%);
  filter: blur(2px);
  animation: tumbleweed-shadow 1.15s ease-in-out infinite;
}

.empty-items__button {
  min-width: 220px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 4px 38px rgba(37, 79, 176, 0.22);
}

@keyframes tumbleweed-move {
  0% {
    left: -140px;
  }
  100% {
    left: calc(100% + 140px);
  }
}

@keyframes tumbleweed-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes tumbleweed-bounce {
  0%,
  100% {
    translate: 0 0;
  }
  20% {
    translate: 0 -6px;
  }
  40% {
    translate: 0 -18px;
  }
  60% {
    translate: 0 -9px;
  }
  80% {
    translate: 0 -3px;
  }
}

@keyframes tumbleweed-shadow {
  0%,
  100% {
    width: 56px;
    opacity: 0.26;
  }
  40% {
    width: 36px;
    opacity: 0.14;
  }
}

@media (max-width: 767px) {
  .empty-items {
    min-height: 500px;
  }

  .empty-items__scene {
    height: 200px;
  }

  .tumbleweed-wrap {
    width: 72px;
    height: 72px;
  }

  .tumbleweed {
    width: 72px;
    height: 72px;
  }

  .empty-items__button {
    width: 100%;
    max-width: 280px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .tumbleweed-wrap,
  .tumbleweed,
  .tumbleweed-shadow {
    animation: none;
  }

  .tumbleweed-wrap {
    left: calc(50% - 46px);
  }
}
</style>
