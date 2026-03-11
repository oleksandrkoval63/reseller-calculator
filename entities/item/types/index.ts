export type ClothesStatus = 'draft' | 'listed' | 'sold'

export type ClothingItem = {
  id: number
  title: string
  brand: string
  category: string
  size: string
  status: ClothesStatus
  purchasedPrice: number
  plannedPrice: number | null
  soldPrice: number | null
  quantity: number
  profit: number | null
  purchasedAt: string
  soldAt: string | null
  image: string
}
