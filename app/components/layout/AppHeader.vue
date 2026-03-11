<script setup lang="ts">
const { t, tm } = useI18n()
const route = useRoute()

const currentLink = computed(() => {
  const purePath = route?.path.replace('/', '')

  if (Object.keys(tm('sidebar')).includes(purePath)) {
    return purePath
  }

  return 'home'
})
</script>

<template>
  <header class="header">
    <NuxtLink to="/">
      <AText as="h1">{{ t(`sidebar.${currentLink}`) }}</AText>
    </NuxtLink>
    <div class="header-actions d-flex">
      <AAvatar />

      <div class="header-actions__lang d-flex">
        <AButton class="btn-lang">
          <AIcon name="world" src="images/shared/world.svg" :size="20" />
        </AButton>
      </div>
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
  padding: 10px;
}
</style>
