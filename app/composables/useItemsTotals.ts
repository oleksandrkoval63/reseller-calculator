import { useCurrencyStore } from '~/stores/currency'
import { useItemsStore } from '~/stores/items'
import { useSettingsStore } from '~/stores/settings'

export const useItemsTotals = (lang: string) => {
  const itemsStore = useItemsStore()
  const currencyStore = useCurrencyStore()
  const settingsStore = useSettingsStore()

  const summaryPurchase = computed(() => {
    return itemsStore.filteredItems.reduce((total, currentItem) => {
      const amount = currencyStore.convertToUah(
        currentItem.stats.purchasedPrice,
        currentItem.currencies.purchasedCurrency,
        currentItem.exchangeRates.purchasedExchangeRate,
      )

      return total + (amount ?? 0)
    }, 0)
  })

  const summarySold = computed(() => {
    return itemsStore.filteredItems.reduce((total, currentItem) => {
      const amount = currencyStore.convertToUah(
        currentItem.stats.soldPrice,
        currentItem.currencies.soldCurrency,
        currentItem.exchangeRates.soldExchangeRate,
      )

      return total + (amount ?? 0)
    }, 0)
  })

  const summaryProfit = computed(() => {
    return itemsStore.filteredItems.reduce((total, currentItem) => {
      if (currentItem.stats.soldPrice === null) {
        return total
      }

      const purchasedInUah = currencyStore.convertToUah(
        currentItem.stats.purchasedPrice,
        currentItem.currencies.purchasedCurrency,
        currentItem.exchangeRates.purchasedExchangeRate,
      )

      const soldInUah = currencyStore.convertToUah(
        currentItem.stats.soldPrice,
        currentItem.currencies.soldCurrency,
        currentItem.exchangeRates.soldExchangeRate,
      )

      if (purchasedInUah === null || soldInUah === null) {
        return total
      }

      return total + (soldInUah - purchasedInUah)
    }, 0)
  })

  const convertGlobalTotal = (valueInUah: number): number | null => {
    return currencyStore.convert(valueInUah, 'UAH', settingsStore.globalCurrency)
  }

  const displayedPurchase = computed(() => {
    return convertGlobalTotal(summaryPurchase.value)
  })

  const displayedSold = computed(() => {
    return convertGlobalTotal(summarySold.value)
  })

  const displayedProfit = computed(() => {
    return convertGlobalTotal(summaryProfit.value)
  })

  const formatGlobalCurrency = (value: number | null) => {
    if (value === null) {
      return '-'
    }

    const formattedLang = useLangFormater(lang)

    return new Intl.NumberFormat(formattedLang, {
      style: 'currency',
      currency: settingsStore.globalCurrency,
      currencyDisplay: 'narrowSymbol',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  return {
    summaryPurchase,
    summarySold,
    summaryProfit,

    displayedPurchase,
    displayedSold,
    displayedProfit,

    formatGlobalCurrency,
  }
}
