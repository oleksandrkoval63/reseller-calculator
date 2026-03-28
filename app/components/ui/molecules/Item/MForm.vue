<script setup lang="ts">
import { VueDatePicker } from '@vuepic/vue-datepicker'
import { createForm } from '~~/features/clothing/model/form'
import AInput from '../../atoms/AInput.vue'
import '@vuepic/vue-datepicker/dist/main.css'

const emit = defineEmits<{
  close: []
}>()

const { t } = useI18n()
const { createItem } = useItemsApi()
const { errors, validateForm } = useFormValidate()

const form = createForm()

const handleSubmit = async () => {
  const isValid = validateForm(form)

  if (!isValid) return

  const formatted = await mapFormToPayload(form)
  await createItem(formatted)

  emit('close')
}

const statusOptions = [
  {
    label: t('status.draft'),
    value: 'draft',
  },
  {
    label: t('status.listed'),
    value: 'listed',
  },
  {
    label: t('status.sold'),
    value: 'sold',
  },
]
</script>

<template>
  <div>
    <AScroll padblock="75px">
      <form class="create-form">
        <div class="create-form__section">
          <AText as="h4">{{ t('form.sections.mainInfo') }}</AText>
          <MFileGallery
            v-model="form.image"
            :label="t('gallery.label')"
            :hint="t('gallery.hint')"
            :multiple="true"
            :max-files="6"
          />

          <div class="create-form__error">
            <AInput v-model="form.title" :placeholder="t('form.fields.title')" />
            <AText v-if="errors.title" as="p" type="danger">{{ errors.title }}</AText>
          </div>
          <div class="create-form__block">
            <div class="create-form__error">
              <AInput v-model="form.brand" :placeholder="t('form.fields.brand')" />
              <AText v-if="errors.brand" as="p" type="danger">{{ errors.brand }}</AText>
            </div>

            <div class="create-form__error">
              <AInput v-model="form.category" :placeholder="t('form.fields.category')" />
              <AText v-if="errors.category" as="p" type="danger">{{ errors.category }}</AText>
            </div>
          </div>
          <div class="create-form__block">
            <div class="create-form__error">
              <AInput v-model="form.size" :placeholder="t('form.fields.size')" />
              <AText v-if="errors.size" as="p" type="danger">{{ errors.size }}</AText>
            </div>

            <div class="create-form__error">
              <AInput
                v-model="form.quantity"
                type="number"
                :placeholder="t('form.fields.quantity')"
                modifiers="qty"
              />
              <AText v-if="errors.quantity" as="p" type="danger">{{ errors.quantity }}</AText>
            </div>
          </div>
        </div>

        <div class="create-form__section">
          <AText as="h4">{{ t('form.sections.status') }}</AText>

          <div class="create-form__error">
            <ASelect v-model="form.status" :options="statusOptions" />
            <AText v-if="errors.status" as="p" type="danger">{{ errors.status }}</AText>
          </div>
        </div>

        <div class="create-form__section">
          <AText as="h4">{{ t('form.sections.price') }}</AText>
          <div class="create-form__block">
            <div class="create-form__error">
              <AInput
                v-model="form.purchasedPrice"
                type="number"
                :placeholder="t('form.fields.purchasedPrice')"
              />
              <AText v-if="errors.purchasedPrice" as="p" type="danger">{{
                errors.purchasedPrice
              }}</AText>
            </div>

            <div class="create-form__error">
              <AInput
                v-model="form.plannedPrice"
                type="number"
                :placeholder="t('form.fields.plannedPrice')"
              />
              <AText v-if="errors.plannedPrice" as="p" type="danger">{{
                errors.plannedPrice
              }}</AText>
            </div>

            <div class="create-form__error">
              <AInput
                v-model="form.soldPrice"
                type="number"
                :placeholder="t('form.fields.soldPrice')"
              />
              <AText v-if="errors.soldPrice" as="p" type="danger">{{ errors.soldPrice }}</AText>
            </div>
          </div>
        </div>

        <div class="create-form__section">
          <AText as="h4">{{ t('form.sections.date') }}</AText>
          <div class="create-form__block">
            <div class="create-form__error">
              <VueDatePicker
                v-model="form.purchasedAt"
                dark
                :placeholder="t('form.fields.purchasedAt')"
              />
              <AText v-if="errors.purchasedAt" as="p" type="danger">{{ errors.purchasedAt }}</AText>
            </div>

            <div class="create-form__error">
              <VueDatePicker v-model="form.soldAt" dark :placeholder="t('form.fields.soldAt')" />
              <AText v-if="errors.soldAt" as="p" type="danger">{{ errors.soldAt }}</AText>
            </div>
          </div>
        </div>
      </form>
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
