import type { ClothingItem } from '~~/entities/item/types'

export const useItemsStore = defineStore(
  'items',
  () => {
    const items = ref<ClothingItem[]>([])
    const summaryProfit = ref<number[]>([])
    const itemsDisplay = ref<'list' | 'grid'>('list')
    const isLoading = ref(false)

    const setItemsDisplay = (display: 'list' | 'grid') => {
      itemsDisplay.value = display
      summaryProfit.value = []
    }

    const setItems = (clothes: ClothingItem[]) => {
      items.value = clothes
    }

    const setSummaryProfit = (profit: number) => {
      summaryProfit.value.push(profit)
    }

    return {
      items,
      setItems,
      summaryProfit,
      setSummaryProfit,
      itemsDisplay,
      setItemsDisplay,
      isLoading,
    }
  },
  {
    persist: {
      pick: ['itemsDisplay'],
    },
  },
)
