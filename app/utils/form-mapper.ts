import type { ClothingItemBD, ClothingItemForm } from '~~/entities/item/types'

export const mapFormToPayload = async (form: ClothingItemForm): Promise<ClothingItemBD> => {
  const currentImages = form.image ?? []

  const existingPaths = currentImages.filter((img): img is string => typeof img === 'string')
  const newFiles = currentImages.filter((img): img is File => img instanceof File)

  const uploadedPaths = newFiles.length ? await uploadImages(newFiles) : []

  const finalImagePaths = [...existingPaths, ...uploadedPaths]

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
    image: finalImagePaths,
  }
}
