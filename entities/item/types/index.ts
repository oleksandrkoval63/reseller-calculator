import type { CurrencyCode } from '~~/shared/types'

export type ClothesStatus = 'draft' | 'listed' | 'sold'

export type ClothesStats = {
  purchasedPrice: number
  plannedPrice: number | null
  soldPrice: number | null
  quantity: number
}

export type PriceCurrencies = {
  purchasedCurrency: CurrencyCode
  plannedCurrency: CurrencyCode | null
  soldCurrency: CurrencyCode | null
}

export type PriceRates = {
  purchasedExchangeRate: number | null
  soldExchangeRate: number | null
}

export type ClothingItem = {
  id: number
  title: string
  brand: string
  category: string
  size: string
  stats: ClothesStats
  currencies: PriceCurrencies
  exchangeRates: PriceRates
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
  purchasedCurrency: CurrencyCode

  plannedPrice: string
  plannedCurrency: CurrencyCode

  soldPrice: string
  soldCurrency: CurrencyCode

  quantity: string
  status: 'draft' | 'listed' | 'sold'
  purchasedAt: string
  soldAt: string
  image: File[] | string[] | null
}

export type ClothingItemBD = {
  id: number
  title: string
  brand: string
  category: string
  size: string

  purchased_price: number
  purchased_currency: CurrencyCode
  purchased_exchange_rate: number | null

  planned_price: number | null
  planned_currency: CurrencyCode | null

  sold_price: number | null
  sold_currency: CurrencyCode | null
  sold_exchange_rate: number | null

  quantity: number
  status: 'draft' | 'listed' | 'sold'
  purchased_at: string
  sold_at: string | null
  image: string[]
}

export type ClothingItemPayload = {
  title: string
  brand: string
  category: string
  size: string

  purchased_price: number
  purchased_currency: CurrencyCode
  purchased_exchange_rate: number | null

  planned_price: number | null
  planned_currency: CurrencyCode | null

  sold_price: number | null
  sold_currency: CurrencyCode | null
  sold_exchange_rate: number | null

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
