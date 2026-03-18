<script setup lang="ts">
import { useItemsStore } from '~/stores/items'
import type { ClothesStats, ClothingItem } from '~~/entities/item/types'

const props = defineProps<{
  item: ClothingItem
}>()

const itemsStore = useItemsStore()

const { locale } = useI18n()

const imageSrc = computed(() => props?.item?.image || '/images/shared/clothes-holder.avif')
const statusColor = computed(() => {
  if (props?.item?.status === 'listed') {
    return 'var(--color-warning)'
  }

  if (props?.item?.status === 'sold') {
    return 'var(--color-success)'
  }

  return 'var(--color-badge-background)'
})

const statsKeys = Object.keys(props?.item?.stats)

const profit = useProfit(props?.item?.stats?.purchasedPrice, props?.item?.stats?.soldPrice ?? 0)
</script>

<template>
  <article v-if="item" class="list-row">
    <div class="list-row__product">
      <div class="item-info">
        <ABadge class="item-image item-image--list">
          <LazyNuxtImg :src="imageSrc" :alt="item?.title" class="item-image__img" />
        </ABadge>

        <div class="item-info__content">
          <AText as="h3" class="item-title list-title">{{ item?.title }}</AText>
          <AText class="item-meta" size="14px">
            {{ item?.size }} · {{ item?.purchasedAt }}
            {{ item?.soldAt ? `· ${item?.soldAt}` : '' }}
          </AText>
        </div>
      </div>
    </div>

    <div class="list-row__cell">
      <ABadge class="item-status" :style="{ background: statusColor }">
        {{ item?.status }}
      </ABadge>
    </div>

    <div v-for="(statsKey, index) in statsKeys" :key="index" class="list-row__cell">
      <AText>
        {{ useFormatterCurrency(locale, item?.stats?.[statsKey as keyof ClothesStats], statsKey) }}
      </AText>
    </div>

    <div class="list-row__cell profit-cell">
      <AText :class="[{ profit: profit > 0 }, { down: profit < 0 }]">
        {{ useFormatterCurrency(locale, profit) }}
      </AText>
      <AIcon
        v-if="profit"
        :class="['profit-arrow', { up: profit > 0 }, { down: profit < 0 }]"
        :size="20"
        name="profit-arrow"
      />
    </div>

    <div class="list-row__actions">
      <AButton class="action-btn" styled="primary" aria-label="Редактировать">✎</AButton>
      <AButton
        class="action-btn"
        styled="danger"
        aria-label="Удалить"
        @click="itemsStore.delItem(item.id)"
        >🗑</AButton
      >
    </div>
  </article>
</template>

<style scoped lang="scss">
.list-row {
  display: grid;
  grid-template-columns: minmax(290px, 1fr) repeat(7, 1fr);
  align-items: center;
  gap: 16px;
  min-height: 94px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 15px 0;
}

.list-row__cell {
  text-align: center;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &.profit-cell {
    gap: 4px;
  }

  .profit {
    color: var(--color-success);
  }

  .down {
    color: var(--color-danger);
  }
}

.list-row__product {
  text-align: left;
}

.list-row__actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.item-info {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
}

.item-info__content {
  min-width: 0;
}

.item-image--list {
  width: 82px;
  height: 62px;
  padding: 0;
  flex-shrink: 0;
  overflow: hidden;
}

.action-btn {
  width: 48px;
  height: 48px;
}
</style>
