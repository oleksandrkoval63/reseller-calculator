<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useItemsStore } from '~/stores/items'
import { useSettingsStore } from '~/stores/settings'
import { pluralizeItems } from '~~/shared/utils/plural-items'

const itemsStore = useItemsStore()
const settingsStore = useSettingsStore()
const authStore = useAuthStore()

const route = useRoute()

const { t, tm, locale, setLocale } = useI18n()

const purePath = computed(() => {
  const path = route.path.replace(/^\/(uk|en)(?=\/|$)/, '')
  const normalized = path.replace(/^\/+|\/+$/g, '')

  return normalized || 'home'
})

const currentLink = computed(() => {
  const sidebar = tm('sidebar') as Record<string, unknown>

  return purePath.value in sidebar ? purePath.value : 'home'
})

const itemsCountText = computed(() => {
  return pluralizeItems(itemsStore.items.length, locale.value)
})

const handleChangeLocale = async () => {
  const lang = locale.value === 'uk' ? 'en' : 'uk'

  await setLocale(lang)
  settingsStore.setCurrentLocale(lang)
}
</script>

<template>
  <header class="header">
    <NuxtLink to="/">
      <AText as="h1">{{ t(`sidebar.${currentLink}`) }}</AText>
    </NuxtLink>

    <div v-if="purePath === 'items' && authStore.isAuthenticated" class="items-summary__head">
      <AText class="items-summary__star" size="24px">★</AText>
      <AText size="24px">{{ itemsCountText }}</AText>
    </div>

    <div class="header-actions d-flex">
      <ClientOnly>
        <MUser />
      </ClientOnly>

      <AButton class="btn-lang" @click="handleChangeLocale">
        <AIcon name="world" src="images/shared/world.svg" :size="20" />
      </AButton>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  border-bottom: 2px solid var(--color-border);
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-actions {
  gap: 16px;
}

.btn-lang {
  padding: 13px;
}

.items-summary__head {
  display: flex;
  align-items: center;
  gap: 8px;
}

.items-summary__star {
  color: var(--color-warning);
  display: inline-flex;
  align-items: center;
}

.items-summary__count {
  color: var(--color-white);
  font-weight: 600;
}
</style>
