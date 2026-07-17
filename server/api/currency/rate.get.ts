import type { CurrencyCode } from '~~/shared/types'

type FrankfurterRateResponse = {
  date: string
  base: CurrencyCode
  quote: CurrencyCode
  rate: number
}

const allowedCurrencies: CurrencyCode[] = ['UAH', 'EUR']

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const from = String(query.from ?? '').toUpperCase()
  const to = String(query.to ?? '').toUpperCase()
  const date = query.date ? String(query.date) : undefined

  if (
    !allowedCurrencies.includes(from as CurrencyCode) ||
    !allowedCurrencies.includes(to as CurrencyCode)
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Unsupported source currency',
    })
  }

  if (from === to) {
    return {
      from,
      to,
      rate: 1,
      date: date ?? new Date().toISOString().slice(0, 10),
    }
  }

  const data = await $fetch<FrankfurterRateResponse>(
    `https://api.frankfurter.dev/v2/rate/${from}/${to}`,
    {
      query: date ? { date } : undefined,
    },
  )

  return {
    from: data.base,
    to: data.quote,
    rate: Number(data.rate),
    date: data.date,
  }
})
