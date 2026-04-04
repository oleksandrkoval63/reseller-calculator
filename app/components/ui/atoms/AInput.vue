<script setup lang="ts">
import type { InputModel } from '~~/shared/types'

const model = defineModel<InputModel>()

const props = withDefaults(
  defineProps<{
    type?: 'text' | 'number' | 'email' | 'password'
    modifiers?: 'qty' | 'default'
  }>(),
  {
    type: 'text',
    modifiers: 'default',
  },
)

const handleInc = () => {
  model.value = Number(model.value) + 1
}

const handleDec = () => {
  model.value = Math.max(1, Number(model.value) - 1)
}

const onInputChange = (event: Event) => {
  const target = event.target as HTMLInputElement

  if (props.type === 'number') {
    model.value = isNaN(Number(target.value)) ? 1 : Math.max(1, Number(target.value))
    return
  }

  model.value = target.value
}
</script>

<template>
  <div v-if="type === 'number' && modifiers === 'qty'" class="input-wrapper">
    <input v-model="model" class="a-input" :min="1" :type @input="onInputChange" />

    <div class="input-actions">
      <AButton styled="primary" @click="handleInc">+</AButton>
      <AButton @click="handleDec">-</AButton>
    </div>
  </div>

  <input v-else v-model="model" class="a-input" :type @input="onInputChange" />
</template>

<style scoped lang="scss">
.a-input {
  background: var(--color-button-background);
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.input-actions {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 4px;
  top: 50%;
  right: 8px;
  transform: translate(0, -50%);

  .a-button {
    padding: 4px 8px;
    min-width: 40px;
  }
}
</style>
