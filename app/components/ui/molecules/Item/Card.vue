<script setup lang="ts">
import type { ClothingItem } from '~~/entities/item/types'

const props = defineProps<{
  item: ClothingItem
}>()

const lang = useLang()

const isClothesImg = computed(() => props?.item?.image || 'images/shared/clothes-holder.avif')
</script>

<template>
  <article v-if="item" class="clothes-list__row clothes-list__row--item">
    <div class="clothes-list__cell clothes-list__cell--product">
      <div class="clothes-item">
        <ABadge class="clothes-item__image-wrap">
          <img class="clothes-item__image" :src="isClothesImg" :alt="item?.title" />
        </ABadge>

        <div class="clothes-item__content">
          <h3 class="clothes-item__title">{{ item?.title }}</h3>
          <p class="clothes-item__meta">{{ item?.size }} · {{ item?.purchasedAt }}</p>
        </div>
      </div>
    </div>

    <div class="clothes-list__cell">
      {{ useFormatterCurrency(lang, item?.purchasedPrice) }}
    </div>

    <div class="clothes-list__cell">
      {{ useFormatterCurrency(lang, item?.plannedPrice) }}
    </div>

    <div class="clothes-list__cell">
      {{ useFormatterCurrency(lang, item?.soldPrice) }}
    </div>

    <div class="clothes-list__cell">
      {{ item?.quantity }}
    </div>

    <div class="clothes-list__cell clothes-list__cell--actions">
      <AButton class="clothes-action-btn" styled="primary" aria-label="Редактировать">✎</AButton>

      <AButton class="clothes-action-btn" aria-label="Удалить">🗑</AButton>
    </div>
  </article>
</template>

<style scoped lang="scss">
.clothes-list__row--item {
  min-height: 94px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.clothes-list__cell--actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
}

.clothes-item {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
}

.a-badge.clothes-item__image-wrap {
  padding: 0;
  width: 82px;
  height: 62px;
  flex-shrink: 0;
  overflow: hidden;
}

.clothes-item__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.clothes-item__content {
  min-width: 0;
}

.clothes-item__title {
  margin: 0 0 6px;
  color: var(--color-white);
  font-size: 18px;
  font-weight: 600;
  line-height: 1.25;
}

.clothes-item__meta {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 14px;
}

.clothes-action-btn {
  width: 48px;
  height: 48px;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.clothes-summary {
  margin-top: 26px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(19, 28, 47, 0.96) 0%, rgba(17, 24, 40, 0.96) 100%);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

.clothes-summary__top {
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 68px;
  padding: 0 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.clothes-list__cell {
  text-align: center;

  &.clothes-list__cell--product {
    text-align: left;
  }
}

.clothes-summary__star {
  color: #f6c25b;
  font-size: 22px;
}

.clothes-summary__count {
  color: var(--color-white);
  font-size: 18px;
  font-weight: 600;
}

.clothes-summary__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr) 88px;
  align-items: center;
  min-height: 118px;
}

.clothes-summary__stat {
  padding: 0 28px;
}

.clothes-summary__stat:not(:first-child) {
  border-left: 1px solid rgba(255, 255, 255, 0.08);
}

.clothes-summary__value {
  margin-bottom: 8px;
  color: var(--color-white);
  font-size: 28px;
  font-weight: 600;
  line-height: 1;
}

.clothes-summary__label {
  color: var(--color-text-muted);
  font-size: 16px;
}

.clothes-summary__stat--profit .clothes-summary__value {
  color: #46c2a0;
}

.clothes-summary__arrow {
  width: 56px;
  height: 56px;
  justify-self: center;
  border: 1px solid rgba(120, 144, 196, 0.12);
  border-radius: 12px;
  background: rgba(84, 102, 146, 0.2);
  color: #b4c3ea;
  font-size: 28px;
}

@media (max-width: 1200px) {
  .clothes-list__row {
    grid-template-columns: minmax(260px, 1.8fr) 110px 110px 110px 80px 110px;
    column-gap: 16px;
  }

  .clothes-list__cell {
    font-size: 16px;
  }
}

@media (max-width: 900px) {
  .clothes-list__table {
    overflow-x: auto;
  }

  .clothes-list__row {
    min-width: 900px;
  }

  .clothes-summary__stats {
    grid-template-columns: 1fr;
  }

  .clothes-summary__stat,
  .clothes-summary__stat:not(:first-child) {
    border-left: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding: 20px 18px;
  }

  .clothes-summary__stat:first-child {
    border-top: 0;
  }

  .clothes-summary__arrow {
    margin: 18px 0 20px;
  }
}
</style>
