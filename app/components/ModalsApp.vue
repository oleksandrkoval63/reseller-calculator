<script setup lang="ts">
import { modalRegistry } from '~~/shared/config/modal-registry'

const { currentModal, isModalOpen, close } = useModals()

const currentComponent = computed(() => {
  const name = currentModal.value?.name

  return name ? modalRegistry[name] : null
})

const modalProps = computed(() => currentModal.value?.props ?? {})
</script>

<template>
  <BaseModal :is-open="isModalOpen" @close="close">
    <component :is="currentComponent" v-if="currentComponent" v-bind="modalProps" @close="close" />
  </BaseModal>
</template>
