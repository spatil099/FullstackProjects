<template>
  <div class="container">
      <Toast />
      <div class="register-container">
      <Form v-slot="$form" @submit="handleRegister" class="align-center flex flex-col gap-4 w-full sm:w-60 space-between">
        <div class="flex flex-col gap-1">  
        <h1> Register </h1>
        </div>
        <div class="flex flex-col gap-1">  
        <InputGroup >
            <InputGroupAddon>
              <i class="pi pi-user"/>
            </InputGroupAddon> 
              <InputText name="name" v-model="name" type="text" placeholder="Full Name" fluid />
              <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">{{ $form.name.error.message }}</Message>
          </InputGroup>
        </div>
        <div class="flex flex-col gap-1">  
        <InputGroup >
            <InputGroupAddon>
              <i class="pi pi-at"/>
            </InputGroupAddon> 
              <InputText name="email" v-model="email" type="text" placeholder="E-Mail" fluid />
              <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error.message }}</Message>
          </InputGroup>
        </div>
        <div class="flex flex-col gap-1">  
          <InputGroup class="flex flex-col gap-1">
            <InputGroupAddon>
              <i class="pi pi-key"/>
            </InputGroupAddon> 
              <Password name="password" v-model="password" placeholder="Password" :feedback="false" toggleMask fluid />
              <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
                  <ul class="my-0 px-4 flex flex-col gap-1">
                      <li v-for="(error, index) of $form.password.errors" :key="index">{{ error.message }}</li>
                  </ul>
              </Message>
          </InputGroup>
        </div>
        <div><Button type="submit" severity="secondary" label="Submit" fluid /></div>
        <div><a href="/login"><Message severity="info" size="medium" variant="simple">Already Registered ? Login instead.</Message></a></div>
      </Form>
  </div>
  </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useAuthStore } from '../stores/auth';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    setup() {
      const name = ref('');
      const email = ref('');
      const password = ref('');
      const authStore = useAuthStore();
      const router = useRouter();
  
      const handleRegister = async () => {
        try {
          await authStore.register(name.value, email.value, password.value);
          alert('Registration successful! Please login.');
          router.push('/login');
        } catch (error: any) {
          alert(error.message);
        }
      };
  
      return { name, email, password, handleRegister };
    },
  });
  </script>
  
<style scoped>
  .container {
    display:flex;
    align-items:center;
    justify-content:center;
  }
  div {
    padding: 0.3rem;
  }
  
  .align-center {
    text-align:center;
  }
  
  .register-container {
    max-width: 50%;
    min-width: fit-content;
    background-color: white;
  }
  
  
  </style>
  