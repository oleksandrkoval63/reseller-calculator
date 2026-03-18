<script setup lang="ts">
const { signUp } = useAuth()

const email = ref('')
const password = ref('')
const pending = ref(false)
const errorText = ref('')
const successText = ref('')

const onSubmit = async () => {
  try {
    pending.value = true
    errorText.value = ''
    successText.value = ''

    await signUp(email.value, password.value)
    successText.value = 'Account created'
  } catch (error: any) {
    errorText.value = error.message || 'Register failed'
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <section class="auth-page">
    <form class="auth-form" @submit.prevent="onSubmit">
      <h1>Register</h1>

      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />

      <button :disabled="pending" type="submit">
        {{ pending ? 'Loading...' : 'Register' }}
      </button>

      <p v-if="errorText">{{ errorText }}</p>
      <p v-if="successText">{{ successText }}</p>
    </form>
  </section>
</template>
