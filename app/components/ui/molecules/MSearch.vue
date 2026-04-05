<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { useFiltersStore } from '~/stores/filters'

const filtersStore = useFiltersStore()

const searchText = ref<string>('')

const handleDebouncedInput = useDebounceFn((value: InputModel | undefined) => {
  const normalizedValue = value == null ? '' : String(value)

  filtersStore.setSearchedText(normalizedValue)
}, 500)
</script>

<template>
  <div class="search">
    <AInput
      v-model="searchText"
      class="search-input"
      placeholder="Search"
      @update:model-value="handleDebouncedInput"
    />
    <AIcon class="search-icon" name="search" size="24px" />
  </div>
</template>

<style scoped lang="scss">
.search {
  position: relative;
  max-width: 325px;
}

.search-input {
  padding: 6px 40px 6px 12px;
}

.search-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
}
</style>
