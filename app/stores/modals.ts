import type { ModalName, ModalPropsMap } from '~~/shared/config/modal-registry'

type ModalPayload<T extends ModalName = ModalName> = {
  name: T
  props: ModalPropsMap[T]
}

export const useModalsStore = defineStore('modals', () => {
  const current = ref<ModalPayload | null>(null)

  const isOpen = computed(() => !!current.value)

  const open = <T extends ModalName>(name: T, props?: ModalPropsMap[T]) => {
    current.value = {
      name,
      props,
    } as ModalPayload
  }

  const close = () => {
    current.value = null
  }

  return {
    current,
    isOpen,
    open,
    close,
  }
})
