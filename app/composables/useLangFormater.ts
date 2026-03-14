export const useLangFormater = (lang: string, option?: 'currency') => {
  if (!option) {
    return lang
  }

  if (option === 'currency') {
    return lang === 'uk' ? 'uk-UA' : 'en-US'
  }
}
