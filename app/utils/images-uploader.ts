export const uploadImages = async (files: File[]) => {
  const bucket = 'product-images'
  const itemId = crypto.randomUUID()
  const supabase = useSupabaseClient()

  const uploadedPaths: string[] = []

  for (const file of files) {
    const ext = file.name.split('.').pop()
    const fileName = `${crypto.randomUUID()}.${ext}`
    const filePath = `clothing/${itemId}/${fileName}`

    const { error } = await supabase.storage.from(bucket).upload(filePath, file)

    if (error) {
      throw error
    }

    uploadedPaths.push(filePath)
  }

  return uploadedPaths
}
