import type { ClothingItem } from '~~/entities/item/types'

export const modalRegistry = {
  LazyCreateItem: 'LazyCreateItem',
  LazyEditItem: 'LazyEditItem',
  LazyConfirmDelete: 'LazyConfirmDelete',
  LazyAuthLogin: 'LazyAuthLogin',
  LazyCreateDelivery: 'LazyCreateDelivery',
} as const

export type ModalName = keyof typeof modalRegistry

export type ModalPropsMap = {
  LazyCreateItem: null

  LazyEditItem: {
    item: ClothingItem
  }

  LazyConfirmDelete: {
    itemId: number
    imageKeys: string[]
  }

  LazyAuthLogin: null

  LazyCreateDelivery: null
}
