export const getImageUrl = (key: string) => `/api/images/${key}`

export const getImageUrls = (keys: string[]) => {
  return keys.map(getImageUrl)
}
