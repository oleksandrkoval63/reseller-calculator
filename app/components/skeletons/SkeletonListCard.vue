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
  <div class="skeleton-card">
    <div class="card-heading">
      <ASkeleton width="82px" height="100%" radius="12px" />

      <div class="card-info">
        <ASkeleton height="45px" />
        <ASkeleton height="20px" />
      </div>
    </div>

    <div class="card-block">
      <ASkeleton width="60px" height="32px" radius="50px" />
    </div>

    <div class="card-block">
      <ASkeleton />
    </div>

    <div class="card-block">
      <ASkeleton />
    </div>

    <div class="card-block">
      <ASkeleton />
    </div>

    <div class="card-block">
      <ASkeleton width="40px" />
    </div>

    <div class="card-block">
      <ASkeleton />
    </div>

    <div class="card-block card-actions">
      <ASkeleton width="48px" height="48px" radius="12px" />
      <ASkeleton width="48px" height="48px" radius="12px" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.skeleton-card {
  padding: 15px 0;
  display: grid;
  grid-template-columns: minmax(290px, 1fr) repeat(7, 1fr);
  gap: 16px;
  align-items: center;
}

.card-heading {
  display: grid;
  grid-template-columns: 82px 1fr;
  align-items: center;
  gap: 16px;
}

.card-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-block {
  display: flex;
  justify-content: center;
  gap: 12px;
  width: 100%;

  &.card-actions {
    justify-content: flex-end;
  }
}
</style>
