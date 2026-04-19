import type { ClothingItem } from '~~/entities/item/types'
import type {
  Delivery,
  DeliveryDB,
  DeliveryPayload,
  DeliveryStatus,
  ItemDeliveryStatus,
} from '~~/entities/delivery/types'
import { mapDbDeliveryToDelivery } from '~~/shared/utils/map-delivery'
import { mapDbItemToClothingItem } from '~~/shared/utils/map-item'

export const useDeliveriesApi = () => {
  const getCurrentUser = async () => {
    const supabase = useSupabaseClient()

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error) throw error
    if (!user) throw new Error('User is not authenticated')

    return user
  }

  const getDeliveries = async (): Promise<Delivery[]> => {
    const supabase = useSupabaseClient()
    const user = await getCurrentUser()

    const { data, error } = await supabase
      .from('deliveries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return (data as DeliveryDB[] | null)?.map(mapDbDeliveryToDelivery) ?? []
  }

  const getDeliveryItems = async (deliveryId: number): Promise<ClothingItem[]> => {
    const supabase = useSupabaseClient()
    const user = await getCurrentUser()

    const { data, error } = await supabase
      .from('items')
      .select('*')
      .eq('user_id', user.id)
      .eq('delivery_id', deliveryId)
      .order('created_at', { ascending: false })

    if (error) throw error

    return (data || []).map(mapDbItemToClothingItem)
  }

  const getAvailableItemsForDelivery = async (): Promise<ClothingItem[]> => {
    const supabase = useSupabaseClient()
    const user = await getCurrentUser()

    const { data, error } = await supabase
      .from('items')
      .select('*')
      .eq('user_id', user.id)
      .is('delivery_id', null)
      .eq('delivery_status', 'not_sent')
      .order('created_at', { ascending: false })

    if (error) throw error

    return (data || []).map(mapDbItemToClothingItem)
  }

  const createDelivery = async (payload: DeliveryPayload): Promise<Delivery> => {
    const supabase = useSupabaseClient()
    const user = await getCurrentUser()

    const { data, error } = await supabase
      .from('deliveries')
      .insert({
        user_id: user.id,
        title: payload.title,
        note: payload.note ?? null,
        weight_kg: payload.weight_kg ?? null,
        price_eur: payload.price_eur ?? null,
        pricing_mode: payload.pricing_mode ?? 'manual',
        sent_at: payload.sent_at ?? null,
        arrived_at: payload.arrived_at ?? null,
        status: payload.status ?? 'draft',
      })
      .select()
      .single()

    if (error) throw error

    return mapDbDeliveryToDelivery(data as DeliveryDB)
  }

  const updateDelivery = async (id: number, payload: DeliveryPayload) => {
    const supabase = useSupabaseClient()

    const { error } = await supabase
      .from('deliveries')
      .update({
        title: payload.title,
        note: payload.note ?? null,
        weight_kg: payload.weight_kg ?? null,
        price_eur: payload.price_eur ?? null,
        pricing_mode: payload.pricing_mode ?? 'manual',
        sent_at: payload.sent_at ?? null,
        arrived_at: payload.arrived_at ?? null,
        status: payload.status ?? 'draft',
      })
      .eq('id', id)

    if (error) throw error
  }

  const attachItemsToDelivery = async (
    deliveryId: number,
    itemIds: number[],
    deliveryStatus: ItemDeliveryStatus = 'in_delivery',
  ) => {
    if (!itemIds.length) return

    const supabase = useSupabaseClient()

    const { error } = await supabase
      .from('items')
      .update({
        delivery_id: deliveryId,
        delivery_status: deliveryStatus,
      })
      .in('id', itemIds)

    if (error) throw error
  }

  const detachItemsFromDelivery = async (itemIds: number[]) => {
    if (!itemIds.length) return

    const supabase = useSupabaseClient()

    const { error } = await supabase
      .from('items')
      .update({
        delivery_id: null,
        delivery_status: 'not_sent',
      })
      .in('id', itemIds)

    if (error) throw error
  }

  const syncDeliveryItems = async ({
    deliveryId,
    nextItemIds,
  }: {
    deliveryId: number
    nextItemIds: number[]
  }) => {
    const currentItems = await getDeliveryItems(deliveryId)
    const currentIds = currentItems.map((item) => item.id)

    const itemIdsToAdd = nextItemIds.filter((id) => !currentIds.includes(id))
    const itemIdsToRemove = currentIds.filter((id) => !nextItemIds.includes(id))

    await detachItemsFromDelivery(itemIdsToRemove)
    await attachItemsToDelivery(deliveryId, itemIdsToAdd)
  }

  const updateDeliveryItemsStatus = async (
    deliveryId: number,
    deliveryStatus: ItemDeliveryStatus,
  ) => {
    const supabase = useSupabaseClient()

    const { error } = await supabase
      .from('items')
      .update({
        delivery_status: deliveryStatus,
      })
      .eq('delivery_id', deliveryId)

    if (error) throw error
  }

  const removeDelivery = async (deliveryId: number) => {
    const supabase = useSupabaseClient()

    await updateDeliveryItemsStatus(deliveryId, 'not_sent')

    const { error: resetItemsError } = await supabase
      .from('items')
      .update({
        delivery_id: null,
        delivery_status: 'not_sent',
      })
      .eq('delivery_id', deliveryId)

    if (resetItemsError) throw resetItemsError

    const { error: deleteDeliveryError } = await supabase
      .from('deliveries')
      .delete()
      .eq('id', deliveryId)

    if (deleteDeliveryError) throw deleteDeliveryError
  }

  const updateDeliveryStatus = async (deliveryId: number, status: DeliveryStatus) => {
    const supabase = useSupabaseClient()

    const { error } = await supabase.from('deliveries').update({ status }).eq('id', deliveryId)

    if (error) throw error

    if (status === 'arrived') {
      await updateDeliveryItemsStatus(deliveryId, 'delivered')
      return
    }

    if (status === 'in_transit') {
      await updateDeliveryItemsStatus(deliveryId, 'in_delivery')
      return
    }

    if (status === 'draft' || status === 'cancelled') {
      await updateDeliveryItemsStatus(deliveryId, 'not_sent')
    }
  }

  return {
    getDeliveries,
    getDeliveryItems,
    getAvailableItemsForDelivery,
    createDelivery,
    updateDelivery,
    attachItemsToDelivery,
    detachItemsFromDelivery,
    syncDeliveryItems,
    updateDeliveryItemsStatus,
    updateDeliveryStatus,
    removeDelivery,
  }
}
