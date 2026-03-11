<template>
  <div class="app-shell">
    <AppSidebar />
    <div class="container">
      <AppHeader />

      <main class="app-shell__content">
        <slot />
      </main>

      <AppFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-shell {
  display: flex;
}
</style>
