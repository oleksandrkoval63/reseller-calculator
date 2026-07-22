import { useCurrencyStore } from '~/stores/currency'
import { useSettingsStore } from '~/stores/settings'
import type { PriceCurrencies, PriceRates } from '~~/entities/item/types'

type ItemPriceType = 'quantity' | 'purchasedPrice' | 'plannedPrice' | 'soldPrice' | 'profit'

type FormatterCurrencyParams =
  | {
      type: ItemPriceType
      currencies: PriceCurrencies
      exchangeRates: PriceRates
    }
  | {
      type: 'delivery'
      currencies: CurrencyCode
      exchangeRates: number
    }

export const useFormatterCurrency = (
  lang: string,
  value: number | null | undefined,
  params?: FormatterCurrencyParams,
) => {
  if (value == null) return '-'
  if (!params) return String(value)
  if (params.type === 'quantity') return String(value)

  const currencyStore = useCurrencyStore()
  const settingsStore = useSettingsStore()

  let displayCurrency: CurrencyCode
  let convertedValue: number | null

  switch (params.type) {
    case 'purchasedPrice':
      displayCurrency = settingsStore.purchaseDisplayCurrency

      convertedValue = currencyStore.convertByRate(
        value,
        params.currencies.purchasedCurrency,
        displayCurrency,
        params.exchangeRates.purchasedExchangeRate,
      )
      break

    case 'plannedPrice': {
      const sourceCurrency = params.currencies.plannedCurrency

      if (!sourceCurrency) return '-'

      displayCurrency = settingsStore.plannedDisplayCurrency
      convertedValue = currencyStore.convert(value, sourceCurrency, displayCurrency)
      break
    }

    case 'soldPrice': {
      const sourceCurrency = params.currencies.soldCurrency

      if (!sourceCurrency) return '-'

      displayCurrency = settingsStore.soldDisplayCurrency
      convertedValue = currencyStore.convertByRate(
        value,
        sourceCurrency,
        displayCurrency,
        params.exchangeRates.soldExchangeRate,
      )
      break
    }

    case 'profit':
      displayCurrency = settingsStore.profitDisplayCurrency
      convertedValue = currencyStore.convertByRate(
        value,
        'UAH',
        displayCurrency,
        params.exchangeRates.soldExchangeRate,
      )
      break

    case 'delivery':
      displayCurrency = settingsStore.globalCurrency
      convertedValue = currencyStore.convertByRate(
        value,
        params.currencies,
        displayCurrency,
        params.exchangeRates,
      )
      break
  }

  if (convertedValue == null) return '-'

  return new Intl.NumberFormat(useLangFormater(lang), {
    style: 'currency',
    currency: displayCurrency,
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertedValue)
}
