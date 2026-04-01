import type { ClothingItem, ClothingItemBD } from '~~/entities/item/types'
import { mapDbItemToClothingItem } from '~~/shared/utils/map-item'

export const useItemsApi = () => {
  const supabase = useSupabaseClient()

  const getItems = async (): Promise<ClothingItem[]> => {
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return (data || []).map(mapDbItemToClothingItem)
  }

  const createItem = async (payload: ClothingItemBD) => {
    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user

    if (!user) throw new Error('Unauthorized')

    const { error } = await supabase.from('items').insert({
      user_id: user.id,
      title: payload.title,
      brand: payload.brand,
      category: payload.category,
      size: payload.size,
      purchased_price: payload.purchased_price,
      planned_price: payload.planned_price,
      sold_price: payload.sold_price,
      quantity: payload.quantity,
      status: payload.status,
      purchased_at: payload.purchased_at,
      sold_at: payload.sold_at,
      image: payload.image,
    })

    if (error) throw error
  }

  const updateItem = async (
    id: number,
    payload: ClothingItemBD,
    previousImageKeys: string[] = [],
  ) => {
    const nextImageKeys = Array.isArray(payload.image) ? payload.image : []
    const removedKeys = previousImageKeys.filter((key) => !nextImageKeys.includes(key))
    const r2RemovedKeys = removedKeys.filter((key) => key.startsWith('users/'))

    const { error } = await supabase.from('items').update(payload).eq('id', id)
    if (error) throw error

    if (r2RemovedKeys.length) {
      await deleteImagesFromR2(r2RemovedKeys)
    }
  }

  const deleteItem = async (id: number, imageKeys: string[] = []) => {
    const { error } = await supabase.from('items').delete().eq('id', id)
    if (error) throw error

    const r2Keys = imageKeys.filter((key) => key.startsWith('users/'))

    if (r2Keys.length) {
      await deleteImagesFromR2(r2Keys)
    }
  }

  return {
    getItems,
    createItem,
    updateItem,
    deleteItem,
  }
}
