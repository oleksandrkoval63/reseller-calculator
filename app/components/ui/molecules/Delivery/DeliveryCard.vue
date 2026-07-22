<script setup lang="ts">
import { useDeliveriesStore } from '~/stores/deliveries'
import type { Delivery } from '~~/entities/delivery/types'
import { modalRegistry } from '~~/shared/config/modal-registry'

const props = defineProps<{
  parcel: Delivery
  idx: number
}>()

const deliveriesStore = useDeliveriesStore()

const { t, locale } = useI18n()
const { open } = useModals()

const parcelItems = computed(() => deliveriesStore.deliveryItemsMap[props?.parcel.id])

const parcelStatus = computed(() => t(`delivery.card.status.${props?.parcel?.status}`))

const parcelCurrency = computed(() =>
  props?.parcel?.pricingMode === 'manual'
    ? useFormatterCurrency(locale.value, props?.parcel?.priceEur, {
        type: 'delivery',
        currencies: props?.parcel.deliveryCurrency,
        exchangeRates: props?.parcel.deliveryExchangeRate,
      })
    : useFormatterCurrency(locale.value, deliveryPriceCalculator(props?.parcel?.weightKg), {
        type: 'delivery',
        currencies: props?.parcel.deliveryCurrency,
        exchangeRates: props?.parcel.deliveryExchangeRate,
      }),
)

const parcelTitle = computed(() => props?.parcel?.title ?? `Delivery ${props.idx + 1}`)

const handleDeleteDelivery = () => {
  open(modalRegistry.LazyConfirmDelete, {
    id: props?.parcel?.id,
    type: 'deliveries',
    title: t('modals.confirmDelete.deliveries.title'),
    desc: t('modals.confirmDelete.deliveries.desc'),
  })
}

onMounted(() => deliveriesStore.setDeliveryItems(props?.parcel?.id))
</script>

<template>
  <ABadge class="delivery-card">
    <AText as="span" size="24px" class="delivery-title">{{ parcelTitle }}</AText>

    <div v-if="parcelItems?.length" class="delivery-block">
      <AText weight="500">{{ t('delivery.card.titles.qty') }}</AText>
      <AText>{{ parcelItems.length }}</AText>
    </div>

    <div v-if="parcelStatus" class="delivery-block">
      <AText weight="500">{{ t('delivery.card.titles.status') }}</AText>
      <AText>{{ parcelStatus }}</AText>
    </div>

    <div v-if="parcelCurrency" class="delivery-block">
      <AText weight="500">{{ t('delivery.card.titles.currency') }}</AText>
      <AText>{{ parcelCurrency }}</AText>
    </div>

    <div v-if="parcel?.sentAt" class="delivery-block">
      <AText weight="500">{{ t('delivery.card.titles.sentAt') }}</AText>
      <AText>{{ parcel.sentAt }}</AText>
    </div>

    <div v-if="parcel?.arrivedAt" class="delivery-block">
      <AText weight="500">{{ t('delivery.card.titles.arrivedAt') }}</AText>
      <AText>{{ parcel.arrivedAt }}</AText>
    </div>

    <AButton
      class="delivery-btn"
      styled="danger"
      aria-label="Удалить"
      @click.stop="handleDeleteDelivery"
      >🗑</AButton
    >

    <NuxtImg class="delivery-bg" src="images/delivery/bg.webp" />
  </ABadge>
</template>

<style scoped lang="scss">
.delivery-card {
  display: grid;
  grid-template-columns: minmax(150px, 1fr) repeat(auto-fit, minmax(100px, 1fr));
  border: 1px solid var(--color-button-border);
  cursor: pointer;
  background: var(--color-button-background);
  padding: 12px 24px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    inset: 0;
    top: 0;
    left: 0;
    background: rgba($color: #000, $alpha: 0.75);
    border-radius: 12px;
    z-index: -1;
    position: absolute;
    transition: all 0.5s ease;
    backdrop-filter: blur(2px);
  }

  &:hover {
    &::after {
      backdrop-filter: blur(4px);
    }

    .delivery-bg {
      transform: scale(1.1);
    }
  }
}

.delivery-bg {
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  height: 100%;
  width: 100%;
  z-index: -1;
  transition: all 0.5s ease;
}

.delivery-btn {
  max-width: 48px;
  max-height: 48px;
  margin-left: auto;
  width: 100%;
}

.delivery-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.delivery-title {
  text-align: left;
  text-transform: capitalize;
}
</style>
