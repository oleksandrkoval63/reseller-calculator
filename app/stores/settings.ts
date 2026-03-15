export const useSettingsStore = defineStore('settings', () => {
  const currentLocale = ref<'uk' | 'en'>('uk')
  const isLoading = ref(false)

  const initLocale = (locale: 'uk' | 'en') => {
    currentLocale.value = locale
  }

  const setCurrentLocale = (locale: 'uk' | 'en') => {
    currentLocale.value = locale
  }

  return {
    currentLocale,
    initLocale,
    setCurrentLocale,
    isLoading,
  }
})
