<script setup lang="ts">
import { useItemsStore } from '~/stores/items'
import { useModalsStore } from '~/stores/modals'
import { modalRegistry } from '~~/shared/config/modal-registry'

defineProps<{
  count: number
}>()

const { t } = useI18n()
const { open } = useModalsStore()
const itemsStore = useItemsStore()

const sortStatus = computed(() => [
  {
    label: t('status.all'),
    value: 'all',
  },
  {
    label: t('status.draft'),
    value: 'draft',
  },
  {
    label: t('status.listed'),
    value: 'listed',
  },
  {
    label: t('status.sold'),
    value: 'sold',
  },
])

const sortType = computed(() => [
  {
    label: t('sorting.type.all'),
    value: 'all',
  },
  {
    label: t('sorting.type.expensive'),
    value: 'expensive',
  },
  {
    label: t('sorting.type.cheap'),
    value: 'cheap',
  },
  {
    label: t('sorting.type.new'),
    value: 'new',
  },
  {
    label: t('sorting.type.old'),
    value: 'old',
  },
  {
    label: t('sorting.type.az'),
    value: 'az',
  },
  {
    label: t('sorting.type.za'),
    value: 'za',
  },
])

const handleOpenModal = () => {
  open(modalRegistry.LazyCreateItem)
}

const handleDispatchSorting = (sorting: Sorting) => {
  itemsStore.setSorting(sorting)
}
</script>

<template>
  <div class="item-filters">
    <MSearch v-model="itemsStore.searchedText" />

    <MSort :sort-status="sortStatus" :sort-type="sortType" @sort-update="handleDispatchSorting" />

    <Display />
    <AButton v-if="count" class="create" styled="success" @click="handleOpenModal">
      <AText size="18px">+ {{ t('actionBtns.addItem') }}</AText>
    </AButton>
  </div>
</template>

<style scoped lang="scss">
.item-filters {
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.create {
  font-weight: 600;
  margin-left: auto;
}
</style>
