<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="handleRegister">
      <h1>Cadastrar</h1>

      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>

      <div class="field">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="seu@email.com"
          required
          autocomplete="email"
        />
      </div>

      <div class="field">
        <label for="password">Senha</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="••••••••"
          required
          autocomplete="new-password"
        />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Cadastrando...' : 'Cadastrar' }}
      </button>

      <router-link to="/login">Já tenho uma conta</router-link>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import authApi from '@/api/authApi'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

async function handleRegister() {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  try {
    await authApi.register(email.value, password.value)
    successMessage.value = 'Cadastro realizado. Você já pode entrar.'
    setTimeout(() => router.push('/login'), 1000)
  } catch (err) {
    errorMessage.value =
      err.response?.data?.detail ??
      'Erro ao cadastrar. Verifique os dados e tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>
