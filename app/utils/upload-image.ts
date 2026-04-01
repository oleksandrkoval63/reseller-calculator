export const uploadImageToR2 = async (file: File, userId: string) => {
  const compressedFile = await compressImageSmart(file)

  const formData = new FormData()
  formData.append('file', compressedFile)
  formData.append('userId', userId)

  return await $fetch<UploadedImage>('/api/upload-image', {
    method: 'POST',
    body: formData,
  })
}

export const uploadImagesToR2 = async (files: File[], userId: string) => {
  return await Promise.all(files.map((file) => uploadImageToR2(file, userId)))
}
