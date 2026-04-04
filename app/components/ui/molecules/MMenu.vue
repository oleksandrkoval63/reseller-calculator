<script setup lang="ts">
const { tm } = useI18n()

const links = computed(() => Object.keys(tm('sidebar')))
</script>

<template>
  <nav class="sidebar-nav">
    <ul class="sidebar-list">
      <MMenuLink v-for="link in links" :key="link" :link />
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.sidebar-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
