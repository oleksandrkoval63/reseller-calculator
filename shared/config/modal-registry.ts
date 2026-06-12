import type { Delivery } from '~~/entities/delivery/types'
import type { ClothingItem } from '~~/entities/item/types'

export const modalRegistry = {
  LazyCreateItem: 'LazyCreateItem',
  LazyEditItem: 'LazyEditItem',
  LazyConfirmDelete: 'LazyConfirmDelete',
  LazyAuthLogin: 'LazyAuthLogin',
  LazyCreateDelivery: 'LazyCreateDelivery',
  LazyEditDelivery: 'LazyEditDelivery',
} as const

export type ModalName = keyof typeof modalRegistry

export type ModalPropsMap = {
  LazyCreateItem: null

  LazyEditItem: {
    item: ClothingItem
  }

  LazyConfirmDelete: {
    id: number
    type: 'items' | 'deliveries'
    imageKeys?: string[]
    title: string
    desc: string
  }

  LazyAuthLogin: null

  LazyCreateDelivery: null

  LazyEditDelivery: {
    delivery: Delivery
  }
}
