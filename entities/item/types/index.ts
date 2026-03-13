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
  image: string
}
