<script setup lang="ts">
const { t } = useI18n()

const localePath = useLocalePath()
</script>

<template>
  <nav>
    <ul>
      <li>
        <NuxtLink :to="localePath('/')">
          <AText>{{ t('sidebar.home') }}</AText>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath('/items')">
          <AText>{{ t('sidebar.items') }}</AText>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
