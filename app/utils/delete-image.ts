export const deleteImagesFromR2 = async (keys: string[]) => {
  if (!keys.length) return

  await $fetch('/api/images/delete', {
    method: 'POST',
    body: { keys },
  })
}
