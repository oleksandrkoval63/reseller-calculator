<script setup lang="ts">
const props = defineProps<{
  link: string
}>()

const { t } = useI18n()

const localePath = useLocalePath()
const route = useRoute()

const purePath = computed(() => {
  if (props?.link === 'home') {
    return '/'
  }

  return props?.link
})

const activePath = computed(() => route?.path.endsWith(purePath.value))
</script>

<template>
  <li>
    <NuxtLink class="sidebar-link" :to="localePath(purePath)">
      <AText size="24px" :type="activePath ? 'primary' : 'default'">{{
        t(`sidebar.${link}`)
      }}</AText>

      <AIcon :name="link" size="24px" :color="activePath ? 'var(--color-primary)' : undefined" />
    </NuxtLink>
  </li>
</template>

<style scoped lang="scss">
.sidebar-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
</style>
