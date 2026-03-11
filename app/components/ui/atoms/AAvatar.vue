<script setup lang="ts">
const props = defineProps<{
  avatar?: string
}>()

const isAvatar = computed(() => props?.avatar || 'images/avatar.webp')
</script>

<template>
  <div class="avatar-wrapper">
    <div class="avatar">
      <NuxtImg v-if="isAvatar" :src="isAvatar" alt="avatar" />
    </div>
    <AIcon name="chevron-down" :size="20" class="arrow-down" src="images/shared/chevron-down.svg" />
  </div>
</template>

<style scoped lang="scss">
.avatar-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  &:hover {
    .arrow-down {
      transform: rotate(180deg);
    }
  }

  .arrow-down {
    transition: all 0.3s ease;
  }
}

.avatar {
  width: 40px;
  height: 40px;

  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
