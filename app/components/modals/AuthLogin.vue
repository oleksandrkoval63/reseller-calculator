<script setup lang="ts">
const emit = defineEmits<{
  close: []
}>()

const { t } = useI18n()

const { signIn, signUp } = useAuth()

const formType = ref<'login' | 'register'>('login')

const email = ref<string>('')
const password = ref<string>('')
const pending = ref(false)
const errorText = ref<string>('')
const successText = ref('')

const localePath = useLocalePath()

const onSubmit = async () => {
  try {
    pending.value = true
    errorText.value = ''
    successText.value = ''

    if (formType.value === 'login') {
      await signIn(email.value, password.value)
      successText.value = 'Authorize successed'
      emit('close')

      return
    }

    await signUp(email.value, password.value)
    successText.value = 'Account created'
    emit('close')
  } catch (error: any) {
    errorText.value = error.message || 'Login failed'
  } finally {
    pending.value = false
    await navigateTo(localePath('/items'))
  }
}

const switchFormType = (type: 'login' | 'register') => {
  formType.value = type
}

const title = computed(() =>
  formType.value === 'login' ? t('auth.titleLogin') : t('auth.titleRegister'),
)

const btnTitle = computed(() =>
  formType.value === 'login' ? t('auth.buttons.auth') : t('auth.buttons.register'),
)
</script>

<template>
  <div class="auth-card">
    <div class="auth-card__head">
      <AText as="h2" class="auth-card__title">{{ btnTitle }}</AText>
      <AText as="span" class="auth-card__text">
        {{ title }}
      </AText>
    </div>

    <div class="auth-switcher">
      <AButton
        :class="['auth-switcher__button', { active: formType === 'login' }]"
        @click="switchFormType('login')"
      >
        {{ t('auth.buttons.auth') }}
      </AButton>
      <AButton
        :class="['auth-switcher__button', { active: formType === 'register' }]"
        @click="switchFormType('register')"
        >{{ t('auth.buttons.register') }}</AButton
      >
    </div>

    <form v-if="formType === 'login'" class="auth-form" @submit.prevent="onSubmit">
      <label class="auth-field">
        <AText as="span" class="auth-field__label">Email</AText>
        <AInput
          v-model="email"
          class="auth-field__control"
          type="email"
          placeholder="me@example.com"
        />
      </label>

      <label class="auth-field">
        <AText as="span" class="auth-field__label">Пароль</AText>
        <AInput
          v-model="password"
          class="auth-field__control"
          type="password"
          placeholder="••••••••••••"
        />
      </label>

      <AButton class="auth-form__submit" :disabled="pending" type="submit">
        {{ pending ? 'Loading...' : t('auth.buttons.signIn') }}
      </AButton>

      <p v-if="errorText">{{ errorText }}</p>
      <p v-if="successText">{{ successText }}</p>
    </form>

    <form v-else class="auth-form" @submit.prevent="onSubmit">
      <label class="auth-field">
        <AText as="span" class="auth-field__label">Email</AText>
        <AInput
          v-model="email"
          class="auth-field__control"
          type="email"
          placeholder="me@example.com"
        />
      </label>

      <label class="auth-field">
        <AText as="span" class="auth-field__label">Пароль</AText>
        <AInput
          v-model="password"
          class="auth-field__control"
          type="password"
          placeholder="••••••••••••"
        />
      </label>

      <AButton class="auth-form__submit" :disabled="pending" type="submit">
        {{ pending ? 'Loading...' : t('auth.buttons.signUp') }}
      </AButton>

      <p v-if="errorText">{{ errorText }}</p>
      <p v-if="successText">{{ successText }}</p>
    </form>
  </div>
</template>

<style scoped lang="scss">
:root {
  --app-bg: #0b1220;
  --app-bg-soft: #111a2c;
  --app-surface: #162137;
  --app-surface-2: #1a2740;
  --app-border: rgba(255, 255, 255, 0.08);
  --app-border-strong: rgba(110, 145, 255, 0.22);
  --app-text: #f5f7ff;
  --app-text-muted: #98a6c3;
  --app-primary: #5b8cff;
  --app-primary-hover: #74a0ff;
  --app-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
}

.auth-card__head {
  margin-bottom: 22px;
}

.auth-card__title {
  margin: 0 0 10px;
  color: var(--app-text);
  font-size: clamp(34px, 5vw, 52px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
}

.auth-card__text {
  margin: 0;
  color: var(--app-text-muted);
  font-size: 15px;
  line-height: 1.6;
}

.auth-switcher {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 22px;
  padding: 6px;
  border: 1px solid var(--app-border);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
}

.auth-switcher__button {
  min-height: 44px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: var(--app-text-muted);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    color: var(--app-text);
    background: rgba(255, 255, 255, 0.04);
  }

  &.active {
    color: var(--app-text);
    background: linear-gradient(180deg, rgba(91, 140, 255, 0.22) 0%, rgba(91, 140, 255, 0.12) 100%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.auth-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.auth-field__label {
  color: var(--app-text-muted);
  font-size: 14px;
  font-weight: 500;
}

.auth-field__control {
  width: 100%;
  min-height: 54px;
  padding: 0 16px;
  border: 1px solid var(--app-border);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.045);
  color: var(--app-text);
  font-size: 15px;
  outline: none;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease;
}

.auth-field__control::placeholder {
  color: rgba(255, 255, 255, 0.28);
}

.auth-field__control:focus {
  border-color: rgba(91, 140, 255, 0.5);
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 0 0 4px rgba(91, 140, 255, 0.14);
}

.auth-form__submit {
  min-height: 54px;
  margin-top: 6px;
  border: 0;
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(91, 140, 255, 0.22) 0%, rgba(91, 140, 255, 0.12) 100%);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.auth-form__submit:hover {
  transform: translateY(-1px);
}

.auth-form__submit:active {
  transform: translateY(0);
}
</style>
