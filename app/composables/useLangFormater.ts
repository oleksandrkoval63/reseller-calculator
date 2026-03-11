export const useLangFormater = (lang: string, option?: 'currency') => {
  const pureLang = lang.replace('/', '')

  if (!option) {
    return pureLang
  }

  if (option === 'currency') {
    return pureLang === 'uk' ? 'uk-UA' : 'en-US'
  }
}
