export const modalRegistry = {
  LazyCreateItem: 'LazyCreateItem',
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
