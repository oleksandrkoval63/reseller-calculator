<script setup lang="ts">
import { useItemsStore } from '~/stores/items'
import type { ClothesStats, ClothingItem } from '~~/entities/item/types'

const props = defineProps<{
  item: ClothingItem
}>()

const itemsStore = useItemsStore()

const { t, locale } = useI18n()

const imageSrc = computed(() => props.item?.image || '/images/shared/clothes-holder.avif')

const statusColor = computed(() => {
  if (props.item?.status === 'listed') {
    return 'var(--color-warning)'
  }

  if (props.item?.status === 'sold') {
    return 'var(--color-success)'
  }

  return 'var(--color-badge-background)'
})

const statsKeys = Object.keys(props?.item?.stats)

const largeBadge = computed(() => (statsKeys?.length % 2 === 0 ? 'large' : ''))

const profit = useProfit(props?.item?.stats?.purchasedPrice, props?.item?.stats?.soldPrice ?? 0)

onMounted(() => itemsStore.setSummaryProfit(profit))
</script>

<template>
  <article v-if="item" class="grid-card">
    <div class="grid-card__media">
      <LazyNuxtImg :src="imageSrc" :alt="item.title" class="item-image__img" />

      <div class="item-actions item-actions--top">
        <AButton class="icon-btn" styled="primary" aria-label="Редактировать">✎</AButton>
        <AButton class="icon-btn" styled="danger" aria-label="Удалить">🗑</AButton>
      </div>
    </div>

    <div class="grid-card__body">
      <div class="grid-card__head">
        <div>
          <AText as="h3" class="item-title">{{ item?.title }}</AText>
          <AText as="p" class="item-meta">Size: {{ item?.size }}</AText>
        </div>

        <ABadge class="item-status" :style="{ background: statusColor }">
          {{ item?.status }}
        </ABadge>
      </div>

      <div class="grid-card__stats">
        <ABadge v-for="(statsKey, index) in statsKeys" :key="index" class="stat-box">
          <AText class="stat-box__label">{{ t(`clothes.stats.${statsKey}`) }}</AText>
          <AText :class="['stat-box__value', { profit: statsKey === 'profit' }]">
            {{
              useFormatterCurrency(locale, item?.stats?.[statsKey as keyof ClothesStats], statsKey)
            }}
          </AText>
        </ABadge>
        <ABadge :class="['stat-box', largeBadge]">
          <AText class="stat-box__label">{{ t(`clothes.stats.profit`) }}</AText>
          <AText :class="['stat-box__value', { profit: profit > 0 }, { down: profit < 0 }]">
            {{ useFormatterCurrency(locale, profit) }}
            <AIcon
              v-if="profit"
              :class="['profit-arrow', { up: profit > 0 }, { down: profit < 0 }]"
              :size="20"
              name="profit-arrow"
            />
          </AText>
        </ABadge>
      </div>

      <div class="grid-card__dates">
        <div class="grid-card__date">
          <AText class="date-title">Куплено</AText>
          <AText size="12px">{{ item?.purchasedAt || 'Не указано' }}</AText>
        </div>
        <div class="grid-card__date">
          <AText class="date-title">Продано</AText>
          <AText size="12px">{{ item?.soldAt || 'Не указано' }}</AText>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.grid-card {
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(23, 31, 52, 0.96) 0%, rgba(17, 24, 40, 0.96) 100%);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.18);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: rgba(118, 145, 209, 0.2);
    box-shadow: 0 18px 44px rgba(0, 0, 0, 0.22);
  }
}

.grid-card__dates {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.grid-card__date {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;

  .date-title {
    color: var(--color-text-muted);
  }
}

.grid-card__media {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.grid-card__body {
  padding: 18px;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  gap: 16px;
}

.grid-card__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.grid-card__stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.stat-box {
  flex-direction: column;
  gap: 6px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  align-items: start;

  &.large {
    grid-column: 1 / span 2;
  }
}

.stat-box__label {
  color: var(--color-text-muted);
  font-size: 13px;
}

.stat-box__value {
  color: var(--color-white);
  font-size: 18px;
  font-weight: 600;
  line-height: 1.2;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &.profit {
    color: var(--color-success);
  }

  &.down {
    color: var(--color-danger);
  }
}

.icon-btn {
  width: 42px;
  height: 42px;
  backdrop-filter: blur(8px);
}

.card-btn {
  min-width: calc(50% - 5px);
  min-height: 46px;
  padding: 0 16px;
  border: 1px solid rgba(120, 144, 196, 0.16);
  border-radius: 12px;
  background: rgba(68, 91, 145, 0.18);
  font-size: 15px;
  font-weight: 600;
}

@media (max-width: 1200px) {
  .list-row {
    font-size: 16px;
  }
}

@media (max-width: 900px) {
  .list-row {
    min-width: 900px;
  }
}

@media (max-width: 480px) {
  .grid-card__body {
    padding: 14px;
  }

  .grid-card__stats {
    grid-template-columns: 1fr;
  }

  .item-actions--bottom {
    flex-direction: column;
  }

  .card-btn {
    width: 100%;
  }
}
</style>
