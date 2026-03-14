export const useProfit = (purchasedPrice: number, soldPrice: number) => {
  return soldPrice ? soldPrice - purchasedPrice : 0
}
