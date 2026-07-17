<script setup lang="ts">
const model = defineModel<CurrencyCode>({ required: true })

const handleToggleCurrency = () => {
  model.value = model.value === 'UAH' ? 'EUR' : 'UAH'
}
</script>

<template>
  <AButton :class="['currency-switcher']" @click="handleToggleCurrency">
    <span
      :class="['currency-switcher__track', { 'currency-switcher__track--eur': model === 'EUR' }]"
    >
      <AText class="currency-switcher__item" size="16px" weight="600">₴</AText>
      <AText class="currency-switcher__item" size="16px" weight="600">€</AText>
    </span>
  </AButton>
</template>

<style scoped lang="scss">
.currency-switcher {
  width: 48px;
  height: 42px;
  min-width: 48px;
  padding: 0;
  overflow: hidden;
  position: relative;
  display: block;
}

.currency-switcher__track {
  display: flex;
  flex-direction: column;
  height: 84px;
  transition: transform 0.28s ease;
  transform: translateY(0);
}

.currency-switcher__track--eur {
  transform: translateY(-42px);
}

.currency-switcher__item {
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
