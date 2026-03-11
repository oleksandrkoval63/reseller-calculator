export const useFormatterCurrency = (lang: string, value: number | null) => {
  if (!value) {
    return '-'
  }

  const formattedLang = useLangFormater(lang)

  const langToCurrency = computed(() => (lang === 'uk' ? 'UAH' : 'USD'))

  const formater = new Intl.NumberFormat(formattedLang, {
    style: 'currency',
    currency: langToCurrency.value,
    maximumFractionDigits: 2,
  }).format(value)

  return formater
}
