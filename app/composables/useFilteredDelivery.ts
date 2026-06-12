import type { Delivery } from '~~/entities/delivery/types'

export const useFilteredDelivery = (
  deliveries: Ref<Delivery[]>,
  searchedText: Ref<string>,
  sorting: Ref<Sorting>,
) => {
  const filteredDeliveries = computed(() => {
    const search = (searchedText.value ?? '').trim().toLowerCase()
    const status = sorting.value.status

    const filtered = (deliveries.value ?? []).filter((delivery) => {
      const title = String(delivery?.title ?? '').toLowerCase()

      const matchesSearch = !search || title.includes(search)

      const matchesStatus = status === 'all' || delivery.status === status

      return matchesSearch && matchesStatus
    })

    return sortDeliveries(filtered, sorting.value.type)
  })

  return { filteredDeliveries }
}
