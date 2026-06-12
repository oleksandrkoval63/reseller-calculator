import type { Delivery } from '~~/entities/delivery/types'
import type { SortingDeliveryType } from '~~/shared/types'

export const sortDeliveries = (deliveries: Delivery[], sortType: SortingDeliveryType) => {
  const sorted = [...deliveries]

  switch (sortType) {
    case 'expensive':
      return sorted.sort((a, b) => Number(b.priceEur) - Number(a.priceEur))

    case 'cheap':
      return sorted.sort((a, b) => Number(a.priceEur) - Number(b.priceEur))

    case 'heavy':
      return sorted.sort((a, b) => Number(b.weightKg) - Number(a.weightKg))

    case 'light':
      return sorted.sort((a, b) => Number(a.weightKg) - Number(b.weightKg))

    case 'new':
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )

    case 'old':
      return sorted.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      )

    case 'az':
      return sorted.sort((a, b) => String(a.title).localeCompare(String(b.title)))

    case 'za':
      return sorted.sort((a, b) => String(b.title).localeCompare(String(a.title)))

    case 'all':
    default:
      return sorted
  }
}
