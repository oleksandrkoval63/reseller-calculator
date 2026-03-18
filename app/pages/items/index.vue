<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useItemsStore } from '~/stores/items'

const itemsStore = useItemsStore()
const authStore = useAuthStore()

onMounted(() => itemsStore.setItems())
</script>

<template>
  <div class="items-wrapper">
    <div class="items-content">
      <Filters />

      <div class="items-wrapper">
        <AScroll v-if="itemsStore.itemsDisplay === 'list'">
          <List :data="itemsStore.items" />
        </AScroll>
        <AScroll v-else height="770px">
          <Grid :data="itemsStore.items" />
        </AScroll>
      </div>

      <LazySummary />
    </div>

    <MAuthorize v-if="!authStore.isAuthenticated" />
  </div>
</template>

<style lang="scss">
.item-title {
  margin: 0 0 6px;
  color: var(--color-white);
  font-size: 18px;
  font-weight: 600;
  line-height: 1.25;

  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 45px;

  &.list-title {
    min-height: unset;
  }
}

.item-meta {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 14px;
}

.a-badge {
  &.item-status {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    min-height: 32px;
    width: fit-content;
    min-width: 60px;
    padding: 5px 12px;
    border-radius: 50px;
    color: var(--color-white);
    font-size: 13px;
    font-weight: 600;
    text-transform: capitalize;
    white-space: nowrap;
  }
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 10px;

  &--top {
    position: absolute;
    top: 14px;
    right: 14px;
  }

  &--bottom {
    justify-content: space-between;
  }
}

.item-image__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.action-btn,
.icon-btn,
.card-btn {
  transition:
    transform 0.5s linear,
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
}

.profit-arrow {
  &.up {
    background: var(--color-success);
  }

  &.down {
    background: var(--color-danger);
    transform: rotate(180deg);
  }
}

.arrow-link {
  transform: rotate(90deg);
}
</style>

<style scoped lang="scss">
.items-wrapper {
  position: relative;
  height: 100%;
}
</style>
