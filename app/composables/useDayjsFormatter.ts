export const useDayjsFormatter = (date?: string) => {
  const dayjs = useDayjs()

  return dayjs(date || undefined)
    .utc()
    .tz()
    .format('YYYY-MM-DD')
}
