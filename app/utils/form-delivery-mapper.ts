import type { DeliveryForm } from '~~/entities/delivery/types'

export const mapDeliveryFormToPayload = (form: DeliveryForm) => {
  return {
    title: form.title.trim(),
    note: form.note.trim() || null,
    weight_kg: form.weightKg,
    price_eur: form.pricingMode === 'manual' ? form.priceEur : null,
    pricing_mode: form.pricingMode,
    sent_at: useDayjsFormatter(form.sentAt),
    arrived_at: form?.arrivedAt ? useDayjsFormatter(form.arrivedAt) : null,
    status: form.status,
  }
}
