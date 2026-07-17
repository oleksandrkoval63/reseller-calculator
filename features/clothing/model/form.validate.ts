import type { ClothingItemForm, FormSchema } from '~~/entities/item/types'

export const clothingFormSchema = () => {
  const { t } = useI18n()

  const schema: FormSchema = {
    title: {
      required: true,
      validate: (value: string) => {
        if (value.trim().length < 2) {
          return t('errors.form.title')
        }

        return ''
      },
    },
    purchasedPrice: {
      required: true,
    },
    status: {
      required: true,
      validate: (value: ClothingItemForm['status'], form: ClothingItemForm) => {
        if (value !== 'sold' && form.soldPrice) {
          return t('errors.form.status')
        }

        if (value === 'listed' && form.soldPrice) {
          return t('errors.form.status')
        }

        if (value === 'draft' && form.soldPrice) {
          return t('errors.form.status')
        }

        return ''
      },
    },
    soldPrice: {
      validate: (value: string, form: ClothingItemForm) => {
        if (!value && form.status === 'sold') {
          return t('errors.form.soldPrice')
        }

        return ''
      },
    },
    soldAt: {
      validate: (value: string, form: ClothingItemForm) => {
        if (!value && form.status === 'sold') {
          return t('errors.form.soldAt')
        }

        if (value && (form.status === 'listed' || form.status === 'draft')) {
          return t('errors.form.soldAt')
        }

        const purchasedAt = new Date(form.purchasedAt)
        const soldDate = new Date(value)

        if (Number.isNaN(purchasedAt.getTime()) || Number.isNaN(soldDate.getTime())) {
          return ''
        }

        if (soldDate < purchasedAt) {
          return t('errors.form.correctDate')
        }

        return ''
      },
    },
  }

  return { schema }
}
