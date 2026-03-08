<script setup lang="ts">

</script>

<template>
  <div class="app-shell">
    <AppHeader />
    <div class="app-shell__body">
      <AppSidebar />
      <main class="app-shell__content">
        <slot />
      </main>
    </div>
    <AppFooter />
  </div>
</template>