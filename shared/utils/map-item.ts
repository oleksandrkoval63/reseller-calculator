import type { ClothingItem, ClothingItemBD } from '~~/entities/item/types'

export const mapDbItemToClothingItem = (item: ClothingItemBD): ClothingItem => {
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
    currencies: {
      purchasedCurrency: item.purchased_currency,
      plannedCurrency: item.planned_currency,
      soldCurrency: item.sold_currency,
    },
    exchangeRates: {
      purchasedExchangeRate:
        item.purchased_exchange_rate !== null ? Number(item.purchased_exchange_rate) : null,

      soldExchangeRate: item.sold_exchange_rate !== null ? Number(item.sold_exchange_rate) : null,
    },
    purchasedAt: item.purchased_at,
    soldAt: item.sold_at,
    image: item.image || '',
  }
}
