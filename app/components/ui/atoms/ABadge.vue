<template>
  <div class="a-badge">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.a-badge {
  border-radius: var(--badge-border-radius);
  padding: var(--badge-padding);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: var(--color-badge-background);
}
</style>
