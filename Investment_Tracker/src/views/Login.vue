<template>
    <div class="flex justify-center items-center h-screen">
      <form @submit.prevent="handleLogin" class="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 class="text-2xl font-bold mb-4">Login</h2>
        <div class="mb-4">
          <label class="block text-gray-700">Email</label>
          <input v-model="email" type="email" class="w-full px-3 py-2 border rounded-lg" required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Password</label>
          <input v-model="password" type="password" class="w-full px-3 py-2 border rounded-lg" required />
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg">
          Login
        </button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useAuthStore } from '../stores/auth';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    setup() {
      const email = ref('');
      const password = ref('');
      const authStore = useAuthStore();
      const router = useRouter();
  
      const handleLogin = async () => {
        try {
          await authStore.login(email.value, password.value);
          localStorage.setItem('auth', JSON.stringify(authStore.user));
          router.push('/dashboard');
        } catch (error: any) {
          alert(error.message);
        }
      };
  
      return { email, password, handleLogin };
    },
  });
  </script>
  