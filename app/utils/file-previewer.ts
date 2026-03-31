export const createPreviewItems = (items: (File | string)[]) => {
  return items.map((item) => {
    if (isFile(item)) {
      return {
        id: `${item.name}-${item.size}-${item.lastModified}-${crypto.randomUUID()}`,
        name: item.name,
        file: item,
        url: URL.createObjectURL(item),
        size: item.size,
        kind: 'file' as const,
      }
    }

    const fileName = item.split('/').pop() ?? 'image'

    return {
      id: `${item}-${crypto.randomUUID()}`,
      name: fileName,
      url: getImageUrls(item),
      kind: 'saved' as const,
    }
  })
}
