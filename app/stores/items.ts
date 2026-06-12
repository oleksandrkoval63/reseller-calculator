import type { ClothingItem } from '~~/entities/item/types'

const getProfit = (purchasedPrice: number, soldPrice: number | null) => {
  return soldPrice !== null ? soldPrice - purchasedPrice : 0
}

export const useItemsStore = defineStore(
  'items',
  () => {
    const { getItems, deleteItem } = useItemsApi()

    const items = ref<ClothingItem[]>([])
    const filteredItems = ref<ClothingItem[]>([])

    const searchedText = ref<string>('')
    const sorting = ref<Sorting>({ status: 'all', type: 'all' })

    const itemsQty = ref<number>(items.value?.length || 0)
    const itemsDisplay = ref<'list' | 'grid'>('list')

    const isLoading = ref(false)
    const isFetched = ref(false)
    const errorMsg = ref<string>('')

    const setSorting = (sort: Partial<Sorting>) => {
      sorting.value = {
        ...sorting.value,
        ...sort,
      }
    }

    const setSearchedText = (text: string) => {
      searchedText.value = text
    }

    const setItemQty = (quantity: number) => {
      itemsQty.value = quantity
    }

    const setLoading = (status: true | false) => {
      isLoading.value = status
    }

    const setFetched = (status: true | false) => {
      isFetched.value = status
    }

    const setError = (error: string) => {
      errorMsg.value = error
    }

    const setItemsDisplay = (display: 'list' | 'grid') => {
      itemsDisplay.value = display
    }

    const setItems = async () => {
      try {
        setLoading(true)
        setError('')

        items.value = await getItems()
      } catch (error: any) {
        setError(error.message || 'Failed to load items')
      } finally {
        setLoading(false)
        setFetched(true)
      }
    }

    const setFilteredItems = (filtered: ClothingItem[]) => {
      filteredItems.value = filtered
    }

    const delItem = async (id: number, imgKeys: string[]) => {
      await deleteItem(id, imgKeys)
      await setItems()
    }

    const summaryProfit = computed(() => {
      return filteredItems.value.reduce((acc, item) => {
        return acc + getProfit(item.stats.purchasedPrice, item.stats.soldPrice)
      }, 0)
    })

    const summaryPurchase = computed(() => {
      return filteredItems.value.reduce(
        (acc, currentItem) => acc + (currentItem?.stats?.purchasedPrice || 0),
        0,
      )
    })

    const summarySold = computed(() => {
      return filteredItems.value.reduce(
        (acc, currentItem) => acc + (currentItem?.stats?.soldPrice || 0),
        0,
      )
    })

    return {
      items,
      itemsQty,
      setItemQty,
      setItems,
      filteredItems,
      setFilteredItems,
      summaryProfit,
      summaryPurchase,
      summarySold,
      itemsDisplay,
      setItemsDisplay,
      isLoading,
      isFetched,
      setFetched,
      setLoading,
      errorMsg,
      setError,
      delItem,
      setSorting,
      setSearchedText,
      sorting,
      searchedText,
    }
  },
  {
    persist: {
      pick: ['itemsDisplay'],
    },
  },
)
