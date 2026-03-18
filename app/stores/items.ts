import type { ClothingItem } from '~~/entities/item/types'

const getProfit = (purchasedPrice: number, soldPrice: number | null) => {
  return soldPrice !== null ? soldPrice - purchasedPrice : 0
}

export const useItemsStore = defineStore(
  'items',
  () => {
    const { getItems, deleteItem } = useItemsApi()

    const items = ref<ClothingItem[]>([])
    const itemsDisplay = ref<'list' | 'grid'>('list')
    const isLoading = ref(false)
    const errorMsg = ref<string>('')

    const setLoading = (status: true | false) => {
      isLoading.value = status
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
      }
    }

    const delItem = async (id: number) => {
      await deleteItem(id)
      await setItems()
    }

    const summaryProfit = computed(() => {
      return items.value.reduce((acc, item) => {
        return acc + getProfit(item.stats.purchasedPrice, item.stats.soldPrice)
      }, 0)
    })

    const summaryPurchase = computed(() => {
      return items.value.reduce(
        (acc, currentItem) => acc + (currentItem?.stats?.purchasedPrice || 0),
        0,
      )
    })

    const summarySold = computed(() => {
      return items.value.reduce((acc, currentItem) => acc + (currentItem?.stats?.soldPrice || 0), 0)
    })

    return {
      items,
      setItems,
      summaryProfit,
      summaryPurchase,
      summarySold,
      itemsDisplay,
      setItemsDisplay,
      isLoading,
      setLoading,
      errorMsg,
      setError,
      delItem,
    }
  },
  {
    persist: {
      pick: ['itemsDisplay'],
    },
  },
)
