<template>
    <div class="flex justify-center items-center h-screen">
      <form @submit.prevent="handleRegister" class="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 class="text-2xl font-bold mb-4">Register</h2>
        <div class="mb-4">
          <label class="block text-gray-700">Full Name</label>
          <input v-model="fullName" type="text" class="w-full px-3 py-2 border rounded-lg" required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Email</label>
          <input v-model="email" type="email" class="w-full px-3 py-2 border rounded-lg" required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Password</label>
          <input v-model="password" type="password" class="w-full px-3 py-2 border rounded-lg" required />
        </div>
        <button type="submit" class="w-full bg-green-500 text-white py-2 rounded-lg">
          Register
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
      const fullName = ref('');
      const email = ref('');
      const password = ref('');
      const authStore = useAuthStore();
      const router = useRouter();
  
      const handleRegister = async () => {
        try {
          await authStore.register(fullName.value, email.value, password.value);
          alert('Registration successful! Please login.');
          router.push('/login');
        } catch (error: any) {
          alert(error.message);
        }
      };
  
      return { fullName, email, password, handleRegister };
    },
  });
  </script>
  