<script setup lang="ts">
import SkeletonModals from './skeletons/SkeletonModals.vue'

const { currentModal, isModalOpen, close } = useModals()

const createAsyncModal = (loader: () => Promise<Component>) => {
  return defineAsyncComponent({
    loader,
    loadingComponent: SkeletonModals,
    delay: 0,
    suspensible: false,
  })
}

const componentMap = {
  LazyCreateItem: createAsyncModal(() => import('~/components/modals/CreateItem.vue')),
  LazyEditItem: createAsyncModal(() => import('~/components/modals/EditItem.vue')),
  LazyConfirmDelete: createAsyncModal(() => import('~/components/modals/ConfirmDelete.vue')),
  LazyAuthLogin: createAsyncModal(() => import('~/components/modals/AuthLogin.vue')),
  LazyCreateDelivery: createAsyncModal(() => import('~/components/modals/CreateDelivery.vue')),
  LazyEditDelivery: createAsyncModal(() => import('~/components/modals/EditDelivery.vue')),
} as const

const currentComponent = computed(() => {
  const name = currentModal.value?.name

  return name ? componentMap[name] : null
})

const modalProps = computed(() => currentModal.value?.props ?? {})
</script>

<template>
  <BaseModal :is-open="isModalOpen" @close="close">
    <component
      :is="currentComponent"
      v-if="isModalOpen && currentComponent"
      v-bind="modalProps"
      @close="close"
    />
  </BaseModal>
</template>
