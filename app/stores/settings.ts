export const useSettingsStore = defineStore('settings', () => {
  const currentLocale = ref<'uk' | 'en'>('uk')
  const isLoading = ref(false)

  const baseDeliveryWeight = ref<number>(10)
  const baseDeliveryPrice = ref<number>(15)
  const deliveryExtraPricePerKg = ref<number>(1.5)

  const initLocale = (locale: 'uk' | 'en') => {
    currentLocale.value = locale
  }

  const setCurrentLocale = (locale: 'uk' | 'en') => {
    currentLocale.value = locale
  }

  return {
    currentLocale,
    initLocale,
    setCurrentLocale,
    isLoading,
    baseDeliveryPrice,
    baseDeliveryWeight,
    deliveryExtraPricePerKg,
  }
})
