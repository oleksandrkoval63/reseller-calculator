import type { ClothingItem } from '~~/entities/item/types'
import type { Delivery, DeliveryPayload, DeliveryStatus } from '~~/entities/delivery/types'
import { getErrorMessage } from '~~/shared/utils/error-getter'

export const useDeliveriesStore = defineStore('deliveries', () => {
  const {
    getDeliveries,
    getDeliveryItems,
    getAvailableItemsForDelivery,
    createDelivery,
    updateDelivery,
    syncDeliveryItems,
    updateDeliveryStatus,
    updateDeliveryItemsStatus,
    removeDelivery,
  } = useDeliveriesApi()

  const deliveries = ref<Delivery[]>([])
  const deliveryItemsMap = ref<Record<number, ClothingItem[]>>({})
  const availableItems = ref<ClothingItem[]>([])
  const isLoading = ref(false)
  const isFetched = ref(false)
  const errorMsg = ref('')

  const setLoading = (status: boolean) => {
    isLoading.value = status
  }

  const setFetched = (status: boolean) => {
    isFetched.value = status
  }

  const setError = (error: string) => {
    errorMsg.value = error
  }

  const setDeliveries = async () => {
    try {
      setLoading(true)
      setError('')

      deliveries.value = await getDeliveries()
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Failed to load deliveries'))
    } finally {
      setLoading(false)
      setFetched(true)
    }
  }

  const setDeliveryItems = async (deliveryId: number) => {
    try {
      setError('')
      deliveryItemsMap.value[deliveryId] = await getDeliveryItems(deliveryId)
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Failed to load delivery items'))
    }
  }

  const setAvailableItems = async () => {
    try {
      setError('')
      availableItems.value = await getAvailableItemsForDelivery()
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Failed to load available items'))
    }
  }

  const createNewDelivery = async (payload: DeliveryPayload, itemIds: number[]) => {
    try {
      setLoading(true)
      setError('')

      const delivery = await createDelivery(payload)

      if (itemIds.length) {
        await syncDeliveryItems({
          deliveryId: delivery.id,
          nextItemIds: itemIds,
        })
      }

      await Promise.all([setDeliveries(), setAvailableItems()])
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Failed to create delivery'))

      throw error
    } finally {
      setLoading(false)
    }
  }

  const editDelivery = async (
    deliveryId: number,
    payload: DeliveryPayload,
    nextItemIds: number[],
  ) => {
    try {
      setLoading(true)
      setError('')

      await updateDelivery(deliveryId, payload)
      await syncDeliveryItems({
        deliveryId,
        nextItemIds,
      })

      await updateDeliveryItemsStatus(
        deliveryId,
        payload.status === 'arrived'
          ? 'delivered'
          : payload.status === 'in_transit'
            ? 'in_delivery'
            : 'not_sent',
      )

      await Promise.all([setDeliveries(), setDeliveryItems(deliveryId), setAvailableItems()])
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Failed to update delivery'))

      throw error
    } finally {
      setLoading(false)
    }
  }

  const deleteDelivery = async (deliveryId: number) => {
    try {
      setLoading(true)
      setError('')

      await removeDelivery(deliveryId)

      const nextMap = { ...deliveryItemsMap.value }
      Reflect.deleteProperty(nextMap, deliveryId)
      deliveryItemsMap.value = nextMap

      await Promise.all([setDeliveries(), setAvailableItems()])
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Failed to load items'))
      throw error
    } finally {
      setLoading(false)
    }
  }

  const changeDeliveryStatus = async (deliveryId: number, status: DeliveryStatus) => {
    try {
      setLoading(true)
      setError('')

      await updateDeliveryStatus(deliveryId, status)

      await Promise.all([setDeliveries(), setDeliveryItems(deliveryId), setAvailableItems()])
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Failed to change delivery status'))

      throw error
    } finally {
      setLoading(false)
    }
  }

  const deliveryCount = computed(() => deliveries.value.length)

  return {
    deliveries,
    deliveryItemsMap,
    availableItems,
    isLoading,
    isFetched,
    errorMsg,
    deliveryCount,
    setDeliveries,
    setDeliveryItems,
    setAvailableItems,
    createNewDelivery,
    editDelivery,
    deleteDelivery,
    changeDeliveryStatus,
    setLoading,
    setFetched,
    setError,
  }
})
