export const useFormatterCurrency = (lang: string, value: number | null, type?: string) => {
  if (!value) {
    return '-'
  }

  if (type === 'quantity') {
    return value
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
