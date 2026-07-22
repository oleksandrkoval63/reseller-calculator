import { useCurrencyStore } from '~/stores/currency'
import type { DeliveryForm, DeliveryPayload } from '~~/entities/delivery/types'

export const mapDeliveryFormToPayload = async (form: DeliveryForm): Promise<DeliveryPayload> => {
  const currencyStore = useCurrencyStore()

  if (currencyStore.eurToUah === null) {
    await currencyStore.loadCurrentRate()
  }

  if (currencyStore.eurToUah === null) {
    throw new Error('Currency rate is not loaded')
  }

  return {
    title: form.title.trim(),
    note: form.note.trim() || null,
    weight_kg: form.weightKg,
    price_eur: form.pricingMode === 'manual' ? form.priceEur : null,
    pricing_mode: form.pricingMode,
    sent_at: useDayjsFormatter(form.sentAt),
    arrived_at: form?.arrivedAt ? useDayjsFormatter(form.arrivedAt) : null,
    status: form.status,
    delivery_currency: form.pricingMode === 'auto' ? 'EUR' : form.deliveryCurrency,
    delivery_exchange_rate: currencyStore.eurToUah,
  }
}
