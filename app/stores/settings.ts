import type { CurrencyCode } from '~~/shared/types'

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const globalCurrency = ref<CurrencyCode>('UAH')
    const purchaseDisplayCurrency = ref<CurrencyCode>('UAH')
    const plannedDisplayCurrency = ref<CurrencyCode>('UAH')
    const soldDisplayCurrency = ref<CurrencyCode>('UAH')
    const profitDisplayCurrency = ref<CurrencyCode>('UAH')

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

    const setGlobalCurrency = (currency: CurrencyCode) => {
      globalCurrency.value = currency
    }

    const setPurchaseDisplayCurrency = (purchaseCurrency: CurrencyCode) => {
      purchaseDisplayCurrency.value = purchaseCurrency
    }

    const setPlannedDisplayCurrency = (plannedCurrency: CurrencyCode) => {
      plannedDisplayCurrency.value = plannedCurrency
    }

    const setSoldDisplayCurrency = (soldCurrency: CurrencyCode) => {
      soldDisplayCurrency.value = soldCurrency
    }

    const setProfitDisplayCurrency = (profitCurrency: CurrencyCode) => {
      profitDisplayCurrency.value = profitCurrency
    }

    return {
      currentLocale,
      initLocale,
      setCurrentLocale,
      isLoading,
      baseDeliveryPrice,
      baseDeliveryWeight,
      deliveryExtraPricePerKg,

      globalCurrency,
      purchaseDisplayCurrency,
      plannedDisplayCurrency,
      soldDisplayCurrency,
      profitDisplayCurrency,

      setGlobalCurrency,
      setPurchaseDisplayCurrency,
      setPlannedDisplayCurrency,
      setSoldDisplayCurrency,
      setProfitDisplayCurrency,
    }
  },
  {
    persist: {
      pick: [
        'currentLocale',
        'globalCurrency',
        'purchaseDisplayCurrency',
        'plannedDisplayCurrency',
        'soldDisplayCurrency',
        'profitDisplayCurrency',
      ],
    },
  },
)
