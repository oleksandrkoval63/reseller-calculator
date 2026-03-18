import type { ClothingItem } from '~~/entities/item/types'

export const mapDbItemToClothingItem = (item: any): ClothingItem => {
  return {
    id: item.id,
    title: item.title,
    brand: item.brand,
    category: item.category,
    size: item.size,
    status: item.status,
    stats: {
      purchasedPrice: Number(item.purchased_price),
      plannedPrice: item.planned_price !== null ? Number(item.planned_price) : null,
      soldPrice: item.sold_price !== null ? Number(item.sold_price) : null,
      quantity: item.quantity,
    },
    purchasedAt: item.purchased_at,
    soldAt: item.sold_at,
    image: item.image || '',
  }
}
