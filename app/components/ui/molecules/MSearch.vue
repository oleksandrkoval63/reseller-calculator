<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'

const { t } = useI18n()

const model = defineModel<string>()

const handleDebouncedInput = useDebounceFn((value: InputModel | undefined) => {
  const normalizedValue = value == null ? '' : String(value)

  model.value = normalizedValue
}, 500)

const localValue = ref(model.value ?? '')

const handleClearSearch = () => {
  model.value = ''
}

watch(
  () => model.value,
  (newValue) => {
    if (newValue !== localValue.value) {
      localValue.value = newValue ?? ''
    }
  },
)
</script>

<template>
  <div class="search">
    <AInput
      v-model="localValue"
      class="search-input"
      :placeholder="t('search.placeholder')"
      @update:model-value="handleDebouncedInput"
    />
    <AIcon v-if="!localValue" class="search-icon" name="search" size="24px" />
    <AIcon
      v-else
      class="search-icon"
      style="cursor: pointer"
      name="delete"
      size="24px"
      hover-color="var(--color-primary)"
      @click.stop="handleClearSearch"
    />
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
