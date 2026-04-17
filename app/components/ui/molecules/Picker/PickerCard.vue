<script setup lang="ts">
import type { ClothingItem } from '~~/entities/item/types'

const props = withDefaults(
  defineProps<{
    item: ClothingItem
    card?: 'default' | 'selected'
  }>(),
  {
    card: 'default',
  },
)

const emit = defineEmits<{
  (e: 'picked', item: ClothingItem): void
  (e: 'delete', id: number): void
}>()

const { t } = useI18n()

const imageSrc = computed(() => {
  const firstKey = props.item.image?.[0]
  return firstKey ? getImageUrl(firstKey) : '/images/shared/clothes-holder.avif'
})

const statusColor = computed(() => {
  if (props?.item?.status === 'listed') {
    return 'var(--color-warning)'
  }

  if (props?.item?.status === 'sold') {
    return 'var(--color-success)'
  }

  return 'var(--color-badge-background'
})
</script>

<template>
  <ABadge v-if="card === 'default'" class="picker-item" @click.stop="emit('picked', item)">
    <div class="picker-header">
      <img v-if="imageSrc" class="picker-item__img" :src="imageSrc" />
      <AText v-if="item?.title" as="span" size="14px" class="picker-item__title">{{
        item.title
      }}</AText>
    </div>

    <div v-if="item?.status" class="picker-block">
      <AText size="14px" weight="500">{{ t('clothes.status') }}</AText>
      <AText size="12px" class="picker-status" weight="500">{{ item.status }}</AText>
    </div>

    <div v-if="item?.size" class="picker-block">
      <AText size="14px" weight="500">{{ t('clothes.size') }}</AText>
      <AText size="12px">{{ item.size }}</AText>
    </div>

    <div v-if="item?.stats?.purchasedPrice" class="picker-block">
      <AText size="14px" weight="500">{{ t('clothes.stats.purchasedPrice') }}</AText>
      <AText size="12px">{{ item.stats.purchasedPrice }}</AText>
    </div>

    <div v-if="item?.stats?.soldPrice" class="picker-block">
      <AText size="14px" weight="500">{{ t('clothes.stats.soldPrice') }}</AText>
      <AText size="12px">{{ item.stats.soldPrice }}</AText>
    </div>
  </ABadge>

  <div v-else class="card-selected">
    <img v-if="imageSrc" class="card-selected__img" :src="imageSrc" alt="card-photo" />
    <div class="card-selected__footer">
      <AText v-if="item?.title" as="p" size="12px">{{ item.title }}</AText>
    </div>

    <AButton styled="danger" class="card-selected__btn" @click.stop="emit('delete', item.id)">
      <AText as="span" size="14px">🗑</AText>
    </AButton>
  </div>
</template>

<style scoped lang="scss">
.card-selected {
  position: relative;
  max-width: 114px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border: 1px solid var(--color-primary);
  border-radius: 12px;
  cursor: default;

  .text {
    line-height: 1.1;
  }
}

.card-selected__btn {
  border-radius: 50px;
  position: absolute;
  top: 2px;
  right: 2px;
  width: 24px;
  height: 24px;
  padding: 2px 2px 2px 4px;
}

.card-selected__footer {
  padding: 4px 8px 8px 8px;
}

.card-selected__img {
  height: 100px;
  border-radius: 12px 12px 0 0;
  border-bottom: 1px solid var(--color-primary);
}

.picker-item {
  display: grid;
  grid-template-columns: 200px repeat(auto-fit, 90px);
  align-items: center;
  justify-content: start;
  gap: 8px;
  background: var(--color-surface);
  padding: 14px;
  cursor: pointer;

  &:hover {
    background: var(--color-surface-alt);
  }
}

.picker-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.picker-status {
  background: v-bind(statusColor);
  border-radius: 12px;
  padding: 2px;
  text-transform: capitalize;
  max-width: 75px;
  margin: 0 auto;
  width: 100%;
}

.picker-item__title {
  line-clamp: 2;
  -webkit-line-clamp: 2;
  text-align: left;
  word-break: keep-all;
}

.picker-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.picker-item__img {
  width: 40px;
  min-width: 40px;
  height: 40px;
  border-radius: 12px;
}
</style>
