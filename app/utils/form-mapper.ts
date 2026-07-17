import type { ClothingItemForm, ClothingItemPayload } from '~~/entities/item/types'
import { uploadImagesToR2 } from '~~/app/utils/upload-image'
import { useCurrencyStore } from '~/stores/currency'

export const mapFormToPayload = async (
  form: ClothingItemForm,
  userId: string,
  existingImageSizes: number[] = [],
): Promise<ClothingItemPayload & { image_sizes: number[] }> => {
  const currentImages = form.image ?? []
  const currencyStore = useCurrencyStore()

  if (currencyStore.eurToUah === null) {
    await currencyStore.loadCurrentRate()
  }

  if (currencyStore.eurToUah === null) {
    throw new Error('Currency rate is not loaded')
  }

  const isSold = form.status === 'sold' || Boolean(form.soldPrice)

  const existingKeys = currentImages.filter((img): img is string => typeof img === 'string')
  const newFiles = currentImages.filter((img): img is File => img instanceof File)

  const uploaded = newFiles.length ? await uploadImagesToR2(newFiles, userId) : []

  return {
    title: form.title.trim(),
    brand: form.brand.trim(),
    category: form.category.trim(),
    size: form.size.trim(),
    status: form.status,

    purchased_price: Number(form.purchasedPrice),
    purchased_currency: form.purchasedCurrency,
    purchased_exchange_rate: currencyStore.eurToUah,

    planned_price: form.plannedPrice ? Number(form.plannedPrice) : null,
    planned_currency: form.plannedPrice ? form.plannedCurrency : null,

    sold_price: isSold && form.soldPrice ? Number(form.soldPrice) : null,
    sold_currency: isSold && form.soldPrice ? form.soldCurrency : null,
    sold_exchange_rate: isSold ? currencyStore.eurToUah : null,

    quantity: Number(form.quantity),
    purchased_at: useDayjsFormatter(form.purchasedAt),
    sold_at: form.soldAt ? useDayjsFormatter(form.soldAt) : null,
    image: [...existingKeys, ...uploaded.map((img) => img.key)],
    image_sizes: [...existingImageSizes, ...uploaded.map((img) => img.size)],
  }
}
