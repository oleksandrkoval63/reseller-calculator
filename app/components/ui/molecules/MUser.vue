<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const { signOut } = useAuth()
const { t } = useI18n()

const authStore = useAuthStore()
const localePath = useLocalePath()

const settingsState = ref(false)

const handleOpenSettings = () => {
  settingsState.value = !settingsState.value
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement

  if (!target.closest('.user-logout')) {
    settingsState.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.addEventListener('click', handleClickOutside))
</script>

<template>
  <div class="user-auth">
    <ABadge
      v-if="authStore.isAuthenticated"
      :class="['user-logout', { active: settingsState }]"
      @click="handleOpenSettings"
    >
      <AAvatar class="user-avatar" />

      <ABadge class="user-settings">
        <AButton styled="danger" @click="signOut">
          <AText size="18px">{{ t('auth.buttons.signOut') }}</AText>
        </AButton>
      </ABadge>
    </ABadge>

    <div v-else class="user-auth__actions">
      <AButton styled="primary" :to="localePath('/login')">
        <AText size="18px">{{ t('auth.buttons.signIn') }}</AText>
      </AButton>

      <AButton :to="localePath('/register')">
        <AText size="18px">{{ t('auth.buttons.signUp') }}</AText>
      </AButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-auth {
  .a-button {
    padding: 8px 12px;
    font-weight: 600;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

.user-logout {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--color-button-background);
  padding: 4px 8px;
  cursor: pointer;

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    border: 1px solid var(--color-button-border);
    border-radius: var(--badge-border-radius);
  }

  &:hover {
    background: var(--color-badge-background);

    &::before {
      border: 1px solid var(--color-button-border-hov);
    }
  }

  &.active {
    background: var(--color-badge-background);
    border-radius: 8px 8px 0 0;
    border-bottom: 0;

    &::before {
      border-radius: 8px 8px 0 0;
      border-bottom: 0;
    }

    .user-settings {
      opacity: 1;
      visibility: visible;
    }
  }
}

.user-settings {
  position: absolute;
  top: 100%;
  width: 100%;
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s ease;
  border: 1px solid var(--color-button-border);
  border-top: 0;
  border-radius: 0 0 8px 8px;
  cursor: default;
}
</style>
