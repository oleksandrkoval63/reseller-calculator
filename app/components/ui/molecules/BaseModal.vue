<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    isOpen: boolean
    width?: string
    closeOnBackdrop?: boolean
    closeOnEsc?: boolean
  }>(),
  {
    width: '720px',
    closeOnBackdrop: true,
    closeOnEsc: true,
  },
)

const emit = defineEmits<{
  close: []
}>()

const handleBackdropClick = () => {
  if (!props.closeOnBackdrop) return
  emit('close')
}

const handleKeydown = (event: KeyboardEvent) => {
  if (!props.isOpen) return
  if (!props.closeOnEsc) return
  if (event.key !== 'Escape') return

  emit('close')
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="overlay" @click.self="handleBackdropClick">
        <div class="popup" :style="{ maxWidth: width }">
          <AButton class="popup-close" aria-label="Close modal" @click="$emit('close')">
            ✕
          </AButton>
          <div class="popup-body">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(4, 8, 18, 0.72);
  backdrop-filter: blur(10px);
}

.popup {
  position: relative;
  width: 100%;
  max-height: calc(100vh - 48px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(18, 25, 43, 0.98) 0%, rgba(12, 18, 32, 0.98) 100%);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
}

.popup-close {
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--color-white);
  font-size: 18px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-1px);
  }
}

.popup-body {
  padding: 28px;
  position: relative;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.22s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 767px) {
  .overlay {
    padding: 16px;
  }

  .popup {
    max-height: calc(100vh - 32px);
    border-radius: 20px;
  }

  .popup-body {
    padding: 20px 18px 18px;
  }
}
</style>
