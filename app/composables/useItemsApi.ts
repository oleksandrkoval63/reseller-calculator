import type { ClothingItem, ClothingItemBD, ClothingItemForm } from '~~/entities/item/types'
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

  const updateItem = async (id: number, payload: Partial<ClothingItemForm>) => {
    const { error } = await supabase.from('items').update(payload).eq('id', id)
    if (error) throw error
  }

  const deleteItem = async (id: number) => {
    const { error } = await supabase.from('items').delete().eq('id', id)
    if (error) throw error
  }

  return {
    getItems,
    createItem,
    updateItem,
    deleteItem,
  }
}
