import type { ClothingItem } from '~~/entities/item/types'

export const sortItems = (items: ClothingItem[], sortType: SortingType) => {
  const sorted = [...items]

  switch (sortType) {
    case 'expensive':
      return sorted.sort((a, b) => Number(b.stats.purchasedPrice) - Number(a.stats.purchasedPrice))

    case 'cheap':
      return sorted.sort((a, b) => Number(a.stats.purchasedPrice) - Number(b.stats.purchasedPrice))

    case 'new':
      return sorted.sort(
        (a, b) => new Date(b.purchasedAt).getTime() - new Date(a.purchasedAt).getTime(),
      )

    case 'old':
      return sorted.sort(
        (a, b) => new Date(a.purchasedAt).getTime() - new Date(b.purchasedAt).getTime(),
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
