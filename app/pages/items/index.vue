<script setup lang="ts">
import { useItemsStore } from '~/stores/items'
import type { ClothingItem } from '~~/entities/item/types'

const clothes: ClothingItem[] = [
  {
    id: 1,
    title: 'Nike Tech Fleece Set',
    brand: 'Nike',
    category: 'Set',
    size: 'M',
    status: 'sold',
    stats: {
      purchasedPrice: 130,
      plannedPrice: 220,
      soldPrice: 110,
      quantity: 1,
    },
    purchasedAt: '2024-04-08',
    soldAt: '2024-04-18',
    image: '/images/clothes/nike-tech-fleece-set.avif',
  },
  {
    id: 2,
    title: 'Adidas Campus 00s',
    brand: 'Adidas',
    category: 'Sneakers',
    size: '10',
    status: 'listed',
    stats: {
      purchasedPrice: 110,
      plannedPrice: 220,
      soldPrice: null,
      quantity: 1,
    },
    purchasedAt: '2024-04-03',
    soldAt: null,
    image: '',
  },
  {
    id: 3,
    title: 'The North Face 1996 Retro Nuptse',
    brand: 'The North Face',
    category: 'Jacket',
    size: 'L',
    status: 'sold',
    stats: {
      purchasedPrice: 280,
      plannedPrice: 450,
      soldPrice: 450,
      quantity: 1,
    },
    purchasedAt: '2024-04-01',
    soldAt: '2024-04-12',
    image: '',
  },
  {
    id: 4,
    title: 'Jordan 4 Retro Thunder',
    brand: 'Jordan',
    category: 'Sneakers',
    size: '9.5',
    status: 'sold',
    stats: {
      purchasedPrice: 150,
      plannedPrice: 220,
      soldPrice: 220,
      quantity: 1,
    },
    purchasedAt: '2024-03-26',
    soldAt: '2024-04-06',
    image: '',
  },
  {
    id: 5,
    title: 'Supreme Box Logo Hoodie',
    brand: 'Supreme',
    category: 'Hoodie',
    size: 'L',
    status: 'draft',
    stats: {
      purchasedPrice: 115,
      plannedPrice: null,
      soldPrice: null,
      quantity: 1,
    },
    purchasedAt: '2024-03-20',
    soldAt: null,
    image: '',
  },
  {
    id: 6,
    title: 'New Balance 2002R Black',
    brand: 'New Balance',
    category: 'Sneakers',
    size: '10',
    status: 'listed',
    stats: {
      purchasedPrice: 115,
      plannedPrice: 220,
      soldPrice: null,
      quantity: 1,
    },
    purchasedAt: '2024-03-20',
    soldAt: null,
    image: '',
  },
  {
    id: 7,
    title: 'Carhartt WIP Detroit Jacket',
    brand: 'Carhartt WIP',
    category: 'Jacket',
    size: 'M',
    status: 'sold',
    stats: {
      purchasedPrice: 140,
      plannedPrice: 240,
      soldPrice: 225,
      quantity: 1,
    },
    purchasedAt: '2024-03-14',
    soldAt: '2024-03-28',
    image: '',
  },
  {
    id: 8,
    title: 'Stone Island Crewneck',
    brand: 'Stone Island',
    category: 'Sweatshirt',
    size: 'L',
    status: 'listed',
    stats: {
      purchasedPrice: 160,
      plannedPrice: 260,
      soldPrice: null,
      quantity: 1,
    },
    purchasedAt: '2024-03-10',
    soldAt: null,
    image: '',
  },
]

const itemsStore = useItemsStore()
</script>

<template>
  <div class="items-content">
    <Filters />

    <div v-if="clothes?.length" class="items-wrapper">
      <AScroll v-if="itemsStore.itemsDisplay === 'list'">
        <List :data="clothes" />
      </AScroll>
      <AScroll v-else height="770px">
        <Grid :data="clothes" />
      </AScroll>
    </div>

    <div v-else class="items-error">
      <AText>No one item was founded !</AText>
    </div>
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
</style>
