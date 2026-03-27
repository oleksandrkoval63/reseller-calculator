import { useModalsStore } from '~/stores/modals'

export const useModals = () => {
  const modalStore = useModalsStore()

  return {
    currentModal: computed(() => modalStore.current),
    isModalOpen: computed(() => modalStore.isOpen),
    open: modalStore.open,
    close: modalStore.close,
  }
}
