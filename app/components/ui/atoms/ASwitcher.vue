<script setup lang="ts">
type Mode = {
  label: string
  value: string
}

const model = defineModel<string>()

const props = defineProps<{
  modes: Mode[]
}>()

const activeMode = ref<Mode['value']>('')

const isActive = computed(
  () => (value: Mode['value']) => (activeMode.value === value ? 'primary' : 'default'),
)

const defaultMode = () => {
  if (!props?.modes?.length || !props?.modes[0]?.value) return

  activeMode.value = props.modes[0].value
  model.value = props.modes[0].value
}

const handleChangeMode = (value: Mode['value']) => {
  activeMode.value = value
  model.value = value
}

onMounted(defaultMode)
</script>

<template>
  <ABadge v-if="modes?.length" class="mode-wrapper">
    <AButton
      v-for="mode in modes"
      :key="mode.value"
      class="mode"
      :styled="isActive(mode.value)"
      @click="handleChangeMode(mode.value)"
    >
      <AText weight="500">
        {{ mode.label }}
      </AText>
    </AButton>
  </ABadge>
</template>

<style scoped lang="scss">
.mode-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  background: transparent;
  padding: 0;
  margin-bottom: 4px;
}
</style>
