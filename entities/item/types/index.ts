export type ClothesStatus = 'draft' | 'listed' | 'sold'

export type ClothesStats = {
  purchasedPrice: number
  plannedPrice: number | null
  soldPrice: number | null
  quantity: number
}

export type ClothingItem = {
  id: number
  title: string
  brand: string
  category: string
  size: string
  stats: ClothesStats
  status: ClothesStatus
  purchasedAt: string
  soldAt: string | null
  image: string[]
}

export type ClothingItemForm = {
  title: string
  brand: string
  category: string
  size: string
  purchasedPrice: string
  plannedPrice: string
  soldPrice: string
  quantity: string
  status: 'draft' | 'listed' | 'sold'
  purchasedAt: string
  soldAt: string
  image: File[] | string[] | null
}

export type ClothingItemBD = {
  title: string
  brand: string
  category: string
  size: string
  purchased_price: number
  planned_price: number | null
  sold_price: number | null
  quantity: number
  status: 'draft' | 'listed' | 'sold'
  purchased_at: string
  sold_at: string | null
  image: string[]
}

export type FieldRules<T> = {
  required?: boolean
  validate?: (value: T, form: ClothingItemForm) => string
}

export type FormSchema = {
  [K in keyof ClothingItemForm]?: FieldRules<ClothingItemForm[K]>
}
