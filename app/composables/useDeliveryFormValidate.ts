import { deliveryFormSchema } from '~~/features/delivery/model/form.validate'
import type { DeliveryForm } from '~~/entities/delivery/types'

export const useDeliveryFormValidate = () => {
  const { t } = useI18n()
  const { schema } = deliveryFormSchema()

  const errors = reactive<Partial<Record<keyof DeliveryForm, string>>>({})

  const isEmptyValue = (value: unknown) => {
    if (Array.isArray(value)) return value.length === 0

    return value === '' || value === null || value === undefined
  }

  const validateField = <K extends keyof DeliveryForm>(field: K, form: DeliveryForm): string => {
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
      const customError = rule.validate(value, form) ?? ''
      errors[field] = customError

      return customError
    }

    errors[field] = ''
    return ''
  }

  const validateForm = (form: DeliveryForm) => {
    let isValid = true

    for (const key of Object.keys(form) as (keyof DeliveryForm)[]) {
      const error = validateField(key, form)

      if (error) {
        isValid = false
      }
    }

    return isValid
  }

  const resetErrors = () => {
    for (const key of Object.keys(errors) as (keyof DeliveryForm)[]) {
      errors[key] = ''
    }
  }

  return {
    errors,
    validateField,
    validateForm,
    resetErrors,
  }
}
