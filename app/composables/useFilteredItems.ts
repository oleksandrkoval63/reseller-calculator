import type { ClothingItem } from '~~/entities/item/types'

export const useFilteredItems = (
  items: Ref<ClothingItem[]>,
  searchedText: Ref<string>,
  sorting: Ref<Sorting>,
) => {
  const filteredItems = computed(() => {
    const search = (searchedText.value ?? '').trim().toLowerCase()
    const status = sorting.value.status

    const filtered = (items.value ?? []).filter((item) => {
      const title = String(item?.title ?? '').toLowerCase()
      const brand = String(item?.brand ?? '').toLowerCase()

      const matchesSearch = !search || title.includes(search) || brand.includes(search)

      const matchesStatus = status === 'all' || item.status === status

      return matchesSearch && matchesStatus
    })

    return sortItems(filtered, sorting.value.type)
  })

  return { filteredItems }
}
