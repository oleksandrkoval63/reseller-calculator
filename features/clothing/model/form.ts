import type { ClothingItem, ClothingItemForm } from '~~/entities/item/types'

export const createForm = (item?: ClothingItem): ClothingItemForm => {
  const stats = item?.stats

  const form = reactive<ClothingItemForm>({
    title: item?.title || '',
    brand: item?.brand || '',
    category: item?.category || '',
    size: item?.size || '',
    status: item?.status || 'draft',
    purchasedPrice: stats?.purchasedPrice ? String(stats.purchasedPrice) : '',
    purchasedCurrency: item?.currencies?.purchasedCurrency || 'UAH',
    plannedPrice: stats?.plannedPrice ? String(stats.plannedPrice) : '',
    plannedCurrency: item?.currencies?.plannedCurrency || 'UAH',
    soldPrice: stats?.soldPrice ? String(stats.soldPrice) : '',
    soldCurrency: item?.currencies?.soldCurrency || 'UAH',
    quantity: stats?.quantity ? String(stats.quantity) : '1',
    purchasedAt: item?.purchasedAt || '',
    soldAt: item?.soldAt || '',
    image: item?.image || [],
  })

  return form
}
