export const useFiltersStore = defineStore('filters', () => {
  const searchedText = ref<string>('')

  const setSearchedText = (text: string) => {
    searchedText.value = text
  }
  return { searchedText, setSearchedText }
})
