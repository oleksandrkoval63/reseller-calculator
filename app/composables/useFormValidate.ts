import { clothingFormSchema } from './../../features/clothing/model/form.validate'
import type { ClothingItemForm } from '~~/entities/item/types'

export const useFormValidate = () => {
  const { t } = useI18n()

  const { schema } = clothingFormSchema()
  const errors = reactive<Partial<Record<keyof ClothingItemForm, string>>>({})

  const isEmptyValue = (value: unknown) => {
    if (Array.isArray(value)) return value.length === 0

    return value === '' || value === null || value === undefined || value === 0
  }

  const validateField = <K extends keyof ClothingItemForm>(
    field: K,
    form: ClothingItemForm,
  ): string => {
    const rule = schema[field]
    const value = form[field]

    if (!rule) {
      errors[field] = ''
      return ''
    }

    const empty = isEmptyValue(value)

    if (rule.required && empty) {
      errors[field] = t('errors.required')
      return errors[field]!
    }

    if (!rule.required && !rule.validate && empty) {
      errors[field] = ''
      return ''
    }

    if (rule.validate) {
      const customError = rule.validate?.(value, form) ?? ''
      errors[field] = customError

      return customError
    }

    errors[field] = ''
    return ''
  }

  const validateForm = (form: ClothingItemForm) => {
    let isValide = true

    for (const key of Object.keys(form) as (keyof ClothingItemForm)[]) {
      const error = validateField(key, form)

      if (error) {
        isValide = false
      }
    }

    return isValide
  }

  return { validateField, validateForm, errors }
}
