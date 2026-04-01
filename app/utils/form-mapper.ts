import type { ClothingItemBD, ClothingItemForm } from '~~/entities/item/types'
import { uploadImagesToR2 } from '~~/app/utils/upload-image'

export const mapFormToPayload = async (
  form: ClothingItemForm,
  userId: string,
  existingImageSizes: number[] = [],
): Promise<ClothingItemBD & { image_sizes: number[] }> => {
  const currentImages = form.image ?? []

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
    planned_price: form.plannedPrice ? Number(form.plannedPrice) : null,
    sold_price: form.soldPrice ? Number(form.soldPrice) : null,
    quantity: Number(form.quantity),
    purchased_at: useDayjsFormatter(form.purchasedAt),
    sold_at: form.soldAt ? useDayjsFormatter(form.soldAt) : null,
    image: [...existingKeys, ...uploaded.map((img) => img.key)],
    image_sizes: [...existingImageSizes, ...uploaded.map((img) => img.size)],
  }
}
