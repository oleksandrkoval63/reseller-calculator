import type { ClothingItem } from '~~/entities/item/types'

export const useItemsStore = defineStore(
  'items',
  () => {
    const items = ref<ClothingItem[]>([])
    const itemsDisplay = ref<'list' | 'grid'>('list')
    const isLoading = ref(false)

    const setItemsDisplay = (display: 'list' | 'grid') => {
      itemsDisplay.value = display
    }

    return { items, itemsDisplay, setItemsDisplay, isLoading }
  },
  {
    persist: {
      pick: ['itemsDisplay'],
    },
  },
)
