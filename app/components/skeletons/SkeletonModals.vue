<script setup lang="ts">
withDefaults(
  defineProps<{
    width?: string
    height?: string
    radius?: string
  }>(),
  {
    width: '100%',
    height: '16px',
    radius: '8px',
  },
)
</script>

<template>
  <div class="skeleton-modals">
    <div class="skeleton-heading">
      <ASkeleton width="40%" height="38px" />
      <ASkeleton width="60%" height="20px" />
    </div>

    <div class="modals-block full">
      <ASkeleton width="20%" height="32px" class="title" />

      <ASkeleton height="120px" />
    </div>

    <div class="modals-block">
      <ASkeleton width="20%" height="32px" class="title" />

      <div class="modals-block__list full">
        <ASkeleton height="48px" />
        <ASkeleton height="48px" />
        <ASkeleton height="48px" />
      </div>
    </div>

    <div class="modals-block">
      <ASkeleton width="20%" height="32px" class="title" />

      <div class="modals-block__list">
        <ASkeleton height="48px" />
        <ASkeleton height="48px" />
        <ASkeleton height="48px" class="title" />
      </div>
    </div>

    <div class="modals-actions">
      <ASkeleton width="120px" height="48px" />
      <ASkeleton width="120px" height="48px" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.modals-actions {
  display: flex;
  gap: 8px;
  justify-content: end;
}

.skeleton-modals {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.skeleton-heading {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.modals-block {
  .title {
    grid-column: 1 / span 2;
    margin-bottom: 8px;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 8px;

    &.full {
      grid-template-columns: 1fr;
    }
  }
}
</style>
