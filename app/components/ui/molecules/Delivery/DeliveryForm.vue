<script setup lang="ts">
import { VueDatePicker } from '@vuepic/vue-datepicker'
import { useAuthStore } from '~/stores/auth'
import { useDeliveriesStore } from '~/stores/deliveries'
import type { DeliveryWithItems } from '~~/entities/delivery/types'
import { createDeliveryForm } from '~~/features/delivery/model/form'
import '@vuepic/vue-datepicker/dist/main.css'

const emit = defineEmits<{
  close: []
}>()

const props = defineProps<{
  delivery?: DeliveryWithItems
}>()

const authStore = useAuthStore()
const deliveriesStore = useDeliveriesStore()

const { t } = useI18n()
const { errors, validateForm } = useDeliveryFormValidate()

const form = createDeliveryForm(props?.delivery)
const selectedCount = ref<number | null>(null)
const pickerRef = ref<{ clearSelectedItems: () => void } | null>(null)

const modes = [
  {
    label: t('delivery.form.mode.auto'),
    value: 'auto',
  },
  {
    label: t('delivery.form.mode.manual'),
    value: 'manual',
  },
]

const statusOptions = [
  {
    label: t('delivery.form.status.draft'),
    value: 'draft',
  },
  {
    label: t('delivery.form.status.inTransit'),
    value: 'inTransit',
  },
  {
    label: t('delivery.form.status.arrived'),
    value: 'arrived',
  },
  {
    label: t('delivery.form.status.cancelled'),
    value: 'cancelled',
  },
]

const handleSubmit = async () => {
  const isValid = validateForm(form)

  if (!isValid || !authStore.user?.id) return

  const formatted = mapDeliveryFormToPayload(form)

  if (props?.delivery?.id) {
    await deliveriesStore.editDelivery(props.delivery.id, formatted, form.itemIds)
  } else {
    await deliveriesStore.createNewDelivery(formatted, form.itemIds)
  }

  emit('close')
}

const setSelectedCount = (count: number) => {
  if (count < 1) {
    selectedCount.value = null
  }

  selectedCount.value = count
}

const handlePickerClear = () => {
  pickerRef.value?.clearSelectedItems()
}

const delBtnItemsState = computed(() => selectedCount.value && selectedCount.value > 1)

onMounted(() => deliveriesStore.setAvailableItems())
</script>

<template>
  <div>
    <AScroll padblock="75px">
      <div class="create-form">
        <div class="create-form__section">
          <AText as="h4">{{ t('form.sections.mainInfo') }}</AText>

          <div class="create-form__error">
            <AInput v-model="form.title" :placeholder="t('delivery.form.name')" />
            <AText v-if="errors.title" as="p" type="danger">{{ errors.title }}</AText>
          </div>

          <div class="create-form__error">
            <AInput v-model="form.note" :placeholder="t('delivery.form.note')" />
            <AText v-if="errors.note" as="p" type="danger">{{ errors.note }}</AText>
          </div>
        </div>

        <div class="create-form__section">
          <div class="picker-title">
            <AText as="h4">{{ t('delivery.form.items') }}</AText>
            <ABadge v-if="selectedCount">{{ selectedCount }}</ABadge>
            <AButton
              v-if="delBtnItemsState"
              class="delele-items__btn"
              styled="danger"
              @click.stop="handlePickerClear"
            >
              <AText size="14px">{{ t('itemPicker.delAll') }}</AText>
            </AButton>
          </div>

          <div class="create-form__error">
            <ItemPicker
              ref="pickerRef"
              v-model="form.itemIds"
              :items="deliveriesStore.availableItems"
              @update-count="setSelectedCount"
            />
            <AText v-if="errors.itemIds" as="p" type="danger">{{ errors.itemIds }}</AText>
          </div>
        </div>

        <div class="create-form__section">
          <AText as="h4">{{ t('form.sections.status') }}</AText>

          <div class="create-form__error">
            <MSelect v-model="form.status" :options="statusOptions" />
            <AText v-if="errors.status" as="p" type="danger">{{ errors.status }}</AText>
          </div>
        </div>

        <div class="create-form__section">
          <AText as="h4">{{ t('delivery.form.modeTitle') }}</AText>

          <div class="create-form__error">
            <ASwitcher v-model="form.pricingMode" :modes />
            <AText v-if="errors.pricingMode" as="p" type="danger">{{ errors.pricingMode }}</AText>
          </div>

          <div v-if="form.pricingMode === 'auto'" class="create-form__error">
            <AInput
              v-model="form.weightKg"
              type="number"
              :placeholder="t('delivery.form.weight')"
            />
            <AText v-if="errors.weightKg" as="p" type="danger">{{ errors.weightKg }}</AText>
          </div>

          <div v-else class="create-form__error">
            <AInput v-model="form.priceEur" type="number" :placeholder="t('delivery.form.price')" />
            <AText v-if="errors.priceEur" as="p" type="danger">{{ errors.priceEur }}</AText>
          </div>
        </div>

        <div class="create-form__section">
          <AText as="h4">{{ t('form.sections.date') }}</AText>

          <div class="create-form__block">
            <div class="create-form__error">
              <VueDatePicker
                v-model="form.sentAt"
                dark
                :placeholder="t('delivery.form.date.sentAt')"
              />
              <AText v-if="errors.sentAt" as="p" type="danger">{{ errors.sentAt }}</AText>
            </div>

            <div class="create-form__error">
              <VueDatePicker
                v-model="form.arrivedAt"
                dark
                :placeholder="t('delivery.form.date.arrivedAt')"
              />
              <AText v-if="errors.arrivedAt" as="p" type="danger">{{ errors.arrivedAt }}</AText>
            </div>
          </div>
        </div>
      </div>
    </AScroll>

    <div class="create-actions">
      <AButton styled="primary" @click="handleSubmit">
        {{ t('modals.actions.save') }}
      </AButton>

      <AButton @click="$emit('close')">
        {{ t('modals.actions.cancel') }}
      </AButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.delele-items__btn {
  padding: 2px 12px;
  border-radius: 8px;
}

.picker-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;

  .a-badge {
    padding: 4px 12px;
    border-radius: 8px;
    background: var(--color-button-background);
  }
}

.create-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.create-form__section {
  display: flex;
  flex-direction: column;
  gap: 4px;

  .text {
    margin-bottom: 4px;
  }
}

.create-form__block {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 4px;
}

.create-actions {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: end;
  padding-top: 10px;
}

.dp__theme_dark {
  --dp-background-color: var(--color-button-background);
  --dp-primary-color: #005cb2;
  --dp-border-color: var(--color-border);
  --dp-border-color-hover: var(--color-primary);
  --dp-input-padding: 12px 16px;
  --dp-border-radius: var(--badge-border-radius);
}
</style>
