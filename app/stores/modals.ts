import type { ModalName, ModalPropsMap } from '~~/shared/config/modal-registry'

type ModalPayload<T extends ModalName = ModalName> = {
  name: T
  props: ModalPropsMap[T]
}

export const useModalsStore = defineStore('modals', () => {
  const current = ref<ModalPayload | null>(null)

  const currentWidth = ref<string>('')

  const isOpen = computed(() => !!current.value)

  const open = <T extends ModalName>(name: T, props?: ModalPropsMap[T], width?: string) => {
    current.value = {
      name,
      props,
    } as ModalPayload

    currentWidth.value = width ?? '720px'
  }

  const close = () => {
    current.value = null
  }

  return {
    current,
    isOpen,
    open,
    close,
    currentWidth,
  }
})
