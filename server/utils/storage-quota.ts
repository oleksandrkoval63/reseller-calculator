import type { H3Event } from 'h3'
import { createSupabaseAdmin } from '~~/server/utils/supabase-admin'

type ItemImageSizesRow = {
  image_sizes: number[] | null
}

export const getUserUsedBytes = async (_event: H3Event, userId: string) => {
  const supabase = createSupabaseAdmin()

  const { data, error } = await supabase.from('items').select('image_sizes').eq('user_id', userId)

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }

  const rows = (data ?? []) as ItemImageSizesRow[]

  return rows.reduce((sum: number, row: ItemImageSizesRow) => {
    const sizes = Array.isArray(row.image_sizes) ? row.image_sizes : []

    return sum + sizes.reduce((acc: number, size: number) => acc + Number(size || 0), 0)
  }, 0)
}

export const getTotalUsedBytes = async (_event: H3Event) => {
  const supabase = createSupabaseAdmin()

  const { data, error } = await supabase.from('items').select('image_sizes')

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }

  const rows = (data ?? []) as ItemImageSizesRow[]

  return rows.reduce((sum: number, row: ItemImageSizesRow) => {
    const sizes = Array.isArray(row.image_sizes) ? row.image_sizes : []

    return sum + sizes.reduce((acc: number, size: number) => acc + Number(size || 0), 0)
  }, 0)
}
