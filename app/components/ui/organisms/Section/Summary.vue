<script setup lang="ts">
import { useItemsStore } from '~/stores/items'

const itemsStore = useItemsStore()

const { t, locale } = useI18n()
</script>

<template>
  <section class="items-summary">
    <div class="items-summary__body">
      <div class="items-summary__stat">
        <AText class="items-summary__value" size="28px">
          {{ useFormatterCurrency(locale, itemsStore.summaryPurchase) }}
        </AText>
        <AText class="items-summary__label">{{ t('summary.titles.purchasedPrice') }}</AText>
      </div>

      <div class="items-summary__stat">
        <AText class="items-summary__value" size="28px">
          <span> {{ useFormatterCurrency(locale, itemsStore.summarySold) }} </span>
        </AText>
        <AText class="items-summary__label">{{ t('summary.titles.soldPrice') }}</AText>
      </div>

      <div class="items-summary__stat">
        <div class="items-summary__value items-summary__value--profit">
          <AText size="28px">{{ useFormatterCurrency(locale, itemsStore.summaryProfit) }}</AText>
          <AIcon
            v-if="itemsStore.summaryProfit"
            :class="[
              'profit-arrow',
              { up: itemsStore.summaryProfit > 0 },
              { down: itemsStore.summaryProfit < 0 },
            ]"
            :size="28"
            name="profit-arrow"
          />
        </div>
        <AText class="items-summary__label">{{ t('summary.titles.profit') }}</AText>
      </div>

      <AButton class="items-summary__next" type="button" aria-label="Открыть детали">
        <AIcon class="arrow-link" :size="20" name="arrow-right" />
      </AButton>
    </div>
  </section>
</template>

<style scoped lang="scss">
.items-summary {
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(19, 28, 47, 0.96) 0%, rgba(17, 24, 40, 0.96) 100%);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

.items-summary__body {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)) 96px;
  align-items: center;
  min-height: 124px;
}

.items-summary__stat {
  padding: 0 28px;
}

.items-summary__stat:not(:first-child) {
  border-left: 1px solid rgba(255, 255, 255, 0.08);
}

.items-summary__value {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  color: var(--color-white);
  line-height: 1;
  font-weight: 600;
}

.items-summary__value--profit {
  color: var(--color-success);
}

.items-summary__label {
  color: var(--color-text-muted);
}

.items-summary__next {
  width: 56px;
  height: 56px;
  justify-self: center;
  border: 1px solid rgba(120, 144, 196, 0.12);
  border-radius: 12px;
  background: rgba(84, 102, 146, 0.2);
  color: #b4c3ea;
  font-size: 28px;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.items-summary__next:hover {
  transform: translateY(-1px);
  background: rgba(84, 102, 146, 0.28);
  border-color: rgba(120, 144, 196, 0.22);
}

@media (max-width: 900px) {
  .items-summary__body {
    grid-template-columns: 1fr;
  }

  .items-summary__stat {
    padding: 20px 22px;
  }

  .items-summary__stat:not(:first-child) {
    border-left: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .items-summary__next {
    margin: 0 0 22px;
  }
}
</style>
