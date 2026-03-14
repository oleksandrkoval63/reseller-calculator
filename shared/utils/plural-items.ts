export const pluralizeItems = (count: number, locale: string) => {
  const normalizedLocale = locale.toLowerCase()

  if (normalizedLocale.startsWith('uk')) {
    const rule = new Intl.PluralRules('uk-UA').select(count)

    if (rule === 'one') return `${count} айтем`
    if (rule === 'few') return `${count} айтеми`

    return `${count} айтемів`
  }

  const rule = new Intl.PluralRules('en-US').select(count)

  if (rule === 'one') return `${count} item`

  return `${count} items`
}
