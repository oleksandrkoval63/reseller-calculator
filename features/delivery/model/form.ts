import type { DeliveryForm, DeliveryWithItems } from '~~/entities/delivery/types/index'

export const createDeliveryForm = (delivery?: DeliveryWithItems): DeliveryForm => {
  const form = reactive<DeliveryForm>({
    title: delivery?.title ?? 'Delivery',
    note: delivery?.note ?? '',
    weightKg: delivery?.weightKg ?? null,
    priceEur: delivery?.priceEur ?? null,
    pricingMode: delivery?.pricingMode ?? 'manual',
    sentAt: delivery?.sentAt || '',
    arrivedAt: delivery?.arrivedAt || '',
    status: delivery?.status ?? 'draft',
    itemIds: delivery?.items?.map((item) => item.id) ?? [],
  })

  return form
}
