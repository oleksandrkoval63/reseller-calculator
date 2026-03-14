export const useFormatterCurrency = (lang: string, value: number | null, type?: string) => {
  if (!value) {
    return '-'
  }

  if (type === 'quantity') {
    return value
  }

  const formattedLang = useLangFormater(lang)

  const currencyLabel = lang === 'uk' ? 'грн' : '$'

  const formattedNumber = new Intl.NumberFormat(formattedLang, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)

  return lang === 'uk'
    ? `${formattedNumber} ${currencyLabel}`
    : `${currencyLabel}${formattedNumber}`
}
