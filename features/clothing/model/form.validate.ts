import type { ClothingItemForm, FormSchema } from '~~/entities/item/types'

export const clothingFormSchema = () => {
  const { t } = useI18n()

  const schema: FormSchema = {
    title: {
      required: true,
      validate: (value: string) => {
        if (value.trim().length < 2) return t('errors.form.title')
      },
    },
    purchasedPrice: {
      required: true,
    },
    soldPrice: {
      validate: (value: string, form: ClothingItemForm) => {
        if (!value && form.status === 'sold') return t('errors.form.soldPrice')
      },
    },
  }

  return { schema }
}
