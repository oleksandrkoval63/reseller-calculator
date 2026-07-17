export const useProfit = (
  purchasedPrice: number,
  purchasedCurrency: CurrencyCode,
  purchasedRate: number | null,
  soldPrice: number | null,
  soldCurrency: CurrencyCode | null,
  soldRate: number | null,
): number | null => {
  if (soldPrice === null || soldCurrency === null || purchasedRate === null || soldRate === null) {
    return null
  }

  const purchasedInUah =
    purchasedCurrency === 'UAH' ? purchasedPrice : purchasedPrice * purchasedRate

  const soldInUah = soldCurrency === 'UAH' ? soldPrice : soldPrice * soldRate

  return soldInUah - purchasedInUah
}
