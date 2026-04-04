<script setup lang="ts">
const { currentModal, isModalOpen, close } = useModals()

const componentMap = {
  LazyCreateItem: defineAsyncComponent(() => import('~/components/modals/CreateItem.vue')),
  LazyEditItem: defineAsyncComponent(() => import('~/components/modals/EditItem.vue')),
  LazyConfirmDelete: defineAsyncComponent(() => import('~/components/modals/ConfirmDelete.vue')),
  LazyAuthLogin: defineAsyncComponent(() => import('~/components/modals/AuthLogin.vue')),
} as const

const currentComponent = computed(() => {
  const name = currentModal.value?.name

  return name ? componentMap[name] : null
})

const modalProps = computed(() => currentModal.value?.props ?? {})
</script>

<template>
  <BaseModal :is-open="isModalOpen" @close="close">
    <component :is="currentComponent" v-if="currentComponent" v-bind="modalProps" @close="close" />
  </BaseModal>
</template>
