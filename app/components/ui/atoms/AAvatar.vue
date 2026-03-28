<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const props = defineProps<{
  avatar?: string
}>()

const authStore = useAuthStore()

const isAvatar = computed(() => props?.avatar || 'images/avatar.webp')
</script>

<template>
  <div class="avatar-wrapper">
    <div class="avatar">
      <NuxtImg
        v-if="isAvatar"
        class="avatar-img"
        :src="isAvatar"
        alt="avatar"
        width="40"
        height="40"
      />
      <AText>{{ authStore.user?.email }}</AText>
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
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;

  &-img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    object-fit: cover;
  }
}
</style>
