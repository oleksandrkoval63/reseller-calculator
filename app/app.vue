<script setup lang="ts">
import { useSettingsStore } from './stores/settings'

const settingsStore = useSettingsStore()

const { locale } = useI18n()

watchEffect(() => settingsStore.initLocale(locale.value))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
