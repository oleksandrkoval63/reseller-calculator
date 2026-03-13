<script setup lang="ts">
import { useItemsStore } from '~/stores/items'

const itemsStore = useItemsStore()
</script>

<template>
  <ABadge class="items-display">
    <AButton
      :class="['items-display__icon', 'list', { active: itemsStore.itemsDisplay === 'list' }]"
      @click="itemsStore.setItemsDisplay('list')"
    >
      <AIcon class="icon" name="list" :size="20" />
    </AButton>
    <AButton
      :class="['items-display__icon', 'grid', { active: itemsStore.itemsDisplay === 'grid' }]"
      @click="itemsStore.setItemsDisplay('grid')"
    >
      <AIcon class="icon" name="grid" :size="20" />
    </AButton>
  </ABadge>
</template>

<style scoped lang="scss">
.items-display {
  margin-left: auto;
  width: fit-content;
  padding: 0;
  background: unset;
  border: 1px solid var(--color-button-border);
}

.items-display__icon {
  padding: 5px;
  border: 0;
  background: unset;

  &.list {
    border-radius: 8px 0 0 8px;
  }

  &.grid {
    border-radius: 0 8px 8px 0;
  }

  &.active {
    background: var(--color-primary);

    .icon {
      background-color: var(--color-text);
    }
  }
}
</style>
