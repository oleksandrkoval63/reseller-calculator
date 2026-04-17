import type { DeliveryForm, DeliveryFormSchema } from '~~/entities/delivery/types'

export const deliveryFormSchema = () => {
  const { t } = useI18n()

  const schema: DeliveryFormSchema = {
    itemIds: {
      required: true,
      validate: (value: unknown) => {
        if (!Array.isArray(value) || value.length === 0) {
          return t('errors.deliveryForm.items')
        }

        return ''
      },
    },

    weightKg: {
      validate: (value: unknown, form: DeliveryForm) => {
        if (form.pricingMode !== 'auto') return ''

        if (typeof value !== 'number' || Number.isNaN(value)) {
          return t('errors.deliveryForm.weight')
        }

        if (value <= 0) {
          return t('errors.deliveryForm.weight')
        }

        return ''
      },
    },

    priceEur: {
      validate: (value: unknown, form: DeliveryForm) => {
        if (form.pricingMode !== 'manual') return ''

        if (value === null || value === '' || value === undefined) {
          return t('errors.deliveryForm.price')
        }

        if (typeof value !== 'number' || Number.isNaN(value) || value < 0) {
          return t('errors.deliveryForm.price')
        }

        return ''
      },
    },

    arrivedAt: {
      validate: (value: unknown, form: DeliveryForm) => {
        if (form.status === 'arrived') {
          return t('errors.deliveryForm.arrived')
        }

        if (!value || !form.sentAt) return ''

        if (typeof value !== 'string' || typeof form.sentAt !== 'string') return ''

        const sentDate = new Date(form.sentAt)
        const arrivedDate = new Date(value)

        if (Number.isNaN(sentDate.getTime()) || Number.isNaN(arrivedDate.getTime())) {
          return ''
        }

        if (arrivedDate < sentDate) {
          return t('errors.deliveryForm.date')
        }

        return ''
      },
    },
  }

  return { schema }
}
