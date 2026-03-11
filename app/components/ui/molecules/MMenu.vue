<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <nav>
    <ul>
      <li>
        <NuxtLink to="/">
          <AText>{{ t('sidebar.home') }}</AText>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/items">
          <AText>{{ t('sidebar.items') }}</AText>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
