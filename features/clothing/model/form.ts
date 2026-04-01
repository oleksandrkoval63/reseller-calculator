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
    plannedPrice: stats?.plannedPrice ? String(stats.plannedPrice) : '',
    soldPrice: stats?.soldPrice ? String(stats.soldPrice) : '',
    quantity: stats?.quantity ? String(stats.quantity) : '1',
    purchasedAt: item?.purchasedAt || '',
    soldAt: item?.soldAt || '',
    image: item?.image || [],
  })

  return form
}
