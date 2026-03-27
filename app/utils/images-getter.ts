export const getImageUrls = async (paths: string[]) => {
  if (!paths?.length) return []

  const supabase = useSupabaseClient()

  const { data, error } = await supabase.storage
    .from('product-images')
    .createSignedUrls(paths, 60 * 60)

  if (error) {
    throw error
  }
  return data.filter((img) => img.signedUrl).map((img) => img.signedUrl)
}
