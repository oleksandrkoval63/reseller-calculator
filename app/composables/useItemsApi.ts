import type { ClothingItem } from '~~/entities/item/types'
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

  const createItem = async (payload: {
    title: string
    brand: string
    category: string
    size: string
    purchasedPrice: number
    plannedPrice: number | null
    soldPrice: number | null
    quantity: number
    status: 'draft' | 'listed' | 'sold'
    purchasedAt: string
    soldAt: string | null
    image: string
  }) => {
    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user

    if (!user) throw new Error('Unauthorized')

    const { error } = await supabase.from('items').insert({
      user_id: user.id,
      title: payload.title,
      brand: payload.brand,
      category: payload.category,
      size: payload.size,
      purchased_price: payload.purchasedPrice,
      planned_price: payload.plannedPrice,
      sold_price: payload.soldPrice,
      quantity: payload.quantity,
      status: payload.status,
      purchased_at: payload.purchasedAt,
      sold_at: payload.soldAt,
      image: payload.image,
    })

    if (error) throw error
  }

  const updateItem = async (
    id: number,
    payload: Partial<{
      title: string
      brand: string
      category: string
      size: string
      purchased_price: number
      planned_price: number | null
      sold_price: number | null
      quantity: number
      status: 'draft' | 'listed' | 'sold'
      purchased_at: string
      sold_at: string | null
      image: string
    }>,
  ) => {
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
