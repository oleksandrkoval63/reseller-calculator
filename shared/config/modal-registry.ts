import CreateItem from '~/components/modals/CreateItem.vue'

export const modalRegistry = {
  LazyCreateItem: CreateItem,
  LazyEditItem: 'LazyEditItem',
  LazyConfirmDelete: 'LazyConfirmDelete',
} as const

export type ModalName = keyof typeof modalRegistry

export type ModalPropsMap = {
  LazyCreateItem: {
    initialValues?: {
      title?: string
      brand?: string
      category?: string
      size?: string
    }
  }

  LazyEditItem: {
    itemId: number
  }

  LazyConfirmDelete: {
    itemId: number
  }
}
