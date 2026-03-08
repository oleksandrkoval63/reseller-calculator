<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const handleClearError = () => clearError({ redirect: '/' })

const title = computed(() => {
  if (props.error?.statusCode === 404) {
     return 'Страница не найдена'
  }

  if (props.error?.statusCode === 403){
     return 'Нет доступа'
  }
  
  return 'Что-то пошло не так'
})

const description = computed(() => {
  return props.error?.statusMessage || props.error?.message || 'Неизвестная ошибка'
})
</script>

<template>
  <div class="error-page">
    <div class="error-page__content">
      <p class="error-page__code">{{ error?.statusCode || 500 }}</p>
      <h1 class="error-page__title">{{ title }}</h1>
      <p class="error-page__text">{{ description }}</p>

      <button type="button" @click="handleClearError">
        На главную
      </button>
    </div>
  </div>
</template>