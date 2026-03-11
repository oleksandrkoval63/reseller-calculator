export const useLang = () => {
  const route = useRoute()

  const lang = computed(() => {
    if (route?.path.replace('/', '').includes('uk')) {
      return 'uk'
    }

    return 'en'
  })

  return lang
}
