type CurrencyRateResponse = {
  from: CurrencyCode
  to: CurrencyCode
  rate: number
  date: string
}

export const useCurrencyStore = defineStore('currencies', () => {
  const eurToUah = ref<number | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const updatedAt = ref<string | null>(null)

  const loadCurrentRate = async () => {
    try {
      isLoading.value = true
      error.value = null

      const response = await $fetch<CurrencyRateResponse>('/api/currency/rate', {
        query: {
          from: 'EUR',
          to: 'UAH',
        },
      })

      eurToUah.value = response.rate
      updatedAt.value = response.date
    } catch (requestError) {
      console.log('Failed to load currency rate:', requestError)

      error.value = 'Failed to load currency rate'
    } finally {
      isLoading.value = false
    }
  }

  const loadRateByDate = async (date: string): Promise<number | null> => {
    try {
      const response = await $fetch<CurrencyRateResponse>('/api/currency/rate', {
        query: {
          from: 'EUR',
          to: 'UAH',
          date,
        },
      })

      return Number(response.rate)
    } catch (requestError) {
      console.error('Failed to load historical rate:', requestError)

      return null
    }
  }

  const getRate = (from: CurrencyCode, to: CurrencyCode): number | null => {
    if (from === to) return 1

    if (eurToUah.value === null) return null

    if (from === 'UAH' && to === 'EUR') {
      return 1 / eurToUah.value
    }

    if (from === 'EUR' && to === 'UAH') {
      return eurToUah.value
    }

    return null
  }

  const convert = (amount: number, from: CurrencyCode, to: CurrencyCode): number | null => {
    const rate = getRate(from, to)

    if (rate === null) {
      return null
    }

    return amount * rate
  }

  const convertByRate = (
    amount: number,
    from: CurrencyCode,
    to: CurrencyCode,
    eurToUahRate: number | null,
  ): number | null => {
    if (from === to) {
      return amount
    }

    if (eurToUahRate === null) {
      return null
    }

    if (from === 'UAH' && to === 'EUR') {
      return amount / eurToUahRate
    }

    if (from === 'EUR' && to === 'UAH') {
      return amount * eurToUahRate
    }

    return null
  }

  const convertToUah = (
    amount: number | null,
    currency: CurrencyCode | null,
    eurToUahRate: number | null,
  ): number | null => {
    if (amount === null || currency === null) {
      return null
    }

    if (currency === 'UAH') {
      return amount
    }

    if (eurToUahRate === null) {
      return null
    }

    return amount * eurToUahRate
  }

  return {
    isLoading,
    eurToUah,
    error,
    updatedAt,
    loadCurrentRate,
    loadRateByDate,
    getRate,
    convert,
    convertByRate,
    convertToUah,
  }
})
