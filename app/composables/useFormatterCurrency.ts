import type { ClothesStats, PriceCurrencies, PriceRates } from '~~/entities/item/types'
import type { CurrencyCode } from '~~/shared/types'

import { useCurrencyStore } from '~/stores/currency'
import { useSettingsStore } from '~/stores/settings'

type PriceType = keyof ClothesStats | 'profit'

export const useFormatterCurrency = (
  lang: string,
  value: number | null,
  type: PriceType,
  currencies: PriceCurrencies,
  exchangeRates: PriceRates,
) => {
  const currencyStore = useCurrencyStore()
  const settingsStore = useSettingsStore()

  if (value === null || value === undefined) {
    return '-'
  }

  if (type === 'quantity') {
    return String(value)
  }

  let sourceCurrency: CurrencyCode | null = null
  let displayCurrency: CurrencyCode = 'UAH'
  let convertedValue: number | null = value

  if (type === 'purchasedPrice') {
    sourceCurrency = currencies.purchasedCurrency
    displayCurrency = settingsStore.purchaseDisplayCurrency

    if (!sourceCurrency) return '-'

    convertedValue = currencyStore.convertByRate(
      value,
      sourceCurrency,
      displayCurrency,
      exchangeRates.purchasedExchangeRate,
    )
  }

  if (type === 'plannedPrice') {
    sourceCurrency = currencies.plannedCurrency
    displayCurrency = settingsStore.plannedDisplayCurrency

    if (!sourceCurrency) return '-'

    convertedValue = currencyStore.convert(value, sourceCurrency, displayCurrency)
  }

  if (type === 'soldPrice') {
    sourceCurrency = currencies.soldCurrency
    displayCurrency = settingsStore.soldDisplayCurrency

    if (!sourceCurrency) return '-'

    convertedValue = currencyStore.convertByRate(
      value,
      sourceCurrency,
      displayCurrency,
      exchangeRates.soldExchangeRate,
    )
  }

  if (type === 'profit') {
    displayCurrency = settingsStore.profitDisplayCurrency

    convertedValue = currencyStore.convertByRate(
      value,
      'UAH',
      displayCurrency,
      exchangeRates.soldExchangeRate,
    )
  }

  if (convertedValue === null) {
    return '-'
  }

  const formattedLang = useLangFormater(lang)

  return new Intl.NumberFormat(formattedLang, {
    style: 'currency',
    currency: displayCurrency,
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertedValue)
}
