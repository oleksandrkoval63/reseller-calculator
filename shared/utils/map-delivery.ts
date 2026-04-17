import type { Delivery, DeliveryDB } from '~~/entities/delivery/types'

export const mapDbDeliveryToDelivery = (delivery: DeliveryDB): Delivery => {
  return {
    id: delivery.id,
    userId: delivery.user_id,
    title: delivery.title,
    note: delivery.note ?? '',
    weightKg: delivery.weight_kg,
    priceEur: delivery.price_eur,
    pricingMode: delivery.pricing_mode,
    sentAt: delivery.sent_at,
    arrivedAt: delivery.arrived_at,
    status: delivery.status,
    createdAt: delivery.created_at,
    updatedAt: delivery.updated_at,
  }
}
