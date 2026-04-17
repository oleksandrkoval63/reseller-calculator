import { useSettingsStore } from '~/stores/settings'

export const deliveryPriceCalculator = (weight: number | null): number | null => {
  if (!weight) return null

  const settingsStore = useSettingsStore()

  if (weight < settingsStore.baseDeliveryWeight) {
    return settingsStore.baseDeliveryPrice
  }

  return weight * settingsStore.deliveryExtraPricePerKg
}
