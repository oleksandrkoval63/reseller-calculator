import type { ClothingItem } from '~~/entities/item/types'

export type DeliveryStatus = 'draft' | 'in_transit' | 'arrived' | 'cancelled'
export type DeliveryPricingMode = 'manual' | 'auto'
export type ItemDeliveryStatus = 'not_sent' | 'in_delivery' | 'delivered'

export type DeliveryDB = {
  id: number
  user_id: string
  title: string
  note: string | null
  weight_kg: number | null
  price_eur: number | null
  pricing_mode: DeliveryPricingMode
  sent_at: string | null
  arrived_at: string | null
  status: DeliveryStatus
  created_at: string
  updated_at: string
}

export type Delivery = {
  id: number
  userId: string
  title: string
  note: string
  weightKg: number | null
  priceEur: number | null
  pricingMode: DeliveryPricingMode
  sentAt: string | null
  arrivedAt: string | null
  status: DeliveryStatus
  createdAt: string
  updatedAt: string
}

export type DeliveryWithItems = Delivery & {
  items: ClothingItem[]
}

export type DeliveryPayload = {
  title?: string
  note?: string | null
  weight_kg?: number | null
  price_eur?: number | null
  pricing_mode?: DeliveryPricingMode
  sent_at?: string | null
  arrived_at?: string | null
  status?: DeliveryStatus
}

export type DeliveryForm = {
  title: string
  note: string
  weightKg: number | null
  priceEur: number | null
  pricingMode: DeliveryPricingMode
  sentAt: string
  arrivedAt: string
  status: DeliveryStatus
  itemIds: number[]
}

export type DeliveryFormSchema = Partial<
  Record<
    keyof DeliveryForm,
    {
      required?: boolean
      validate?: (value: unknown, form: DeliveryForm) => string
    }
  >
>
