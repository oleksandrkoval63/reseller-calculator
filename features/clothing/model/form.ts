import type { ClothingItemForm } from '~~/entities/item/types'

export const createForm = (): ClothingItemForm => {
  const form = reactive<ClothingItemForm>({
    title: '',
    brand: '',
    category: '',
    size: '',
    status: 'draft',
    purchasedPrice: '',
    plannedPrice: '',
    soldPrice: '',
    quantity: '1',
    purchasedAt: '',
    soldAt: '',
    image: [],
  })

  return form
}
