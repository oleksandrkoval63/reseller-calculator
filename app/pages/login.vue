<script setup lang="ts">
const { signIn } = useAuth()

const email = ref<string>('')
const password = ref<string>('')
const pending = ref(false)
const errorText = ref<string>('')

const localePath = useLocalePath()

const onSubmit = async () => {
  try {
    pending.value = true
    errorText.value = ''

    await signIn(email.value, password.value)
    await navigateTo(localePath('/'))
  } catch (error: any) {
    errorText.value = error.message || 'Login failed'
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <section class="auth-page">
    <form class="auth-form" @submit.prevent="onSubmit">
      <h1>Login</h1>

      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />

      <button :disabled="pending" type="submit">
        {{ pending ? 'Loading...' : 'Login' }}
      </button>

      <p v-if="errorText">{{ errorText }}</p>
    </form>
  </section>
</template>
