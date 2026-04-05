import type { Sorting } from '~~/shared/types'

export const useFiltersStore = defineStore('filters', () => {
  const searchedText = ref<string>('')
  const sorting = ref<Sorting>({ status: 'all', type: 'all' })

  const setSorting = (sort: Partial<Sorting>) => {
    sorting.value = {
      ...sorting.value,
      ...sort,
    }
  }

  const setSearchedText = (text: string) => {
    searchedText.value = text
  }

  return {
    searchedText,
    setSearchedText,
    setSorting,
    sorting,
  }
})
