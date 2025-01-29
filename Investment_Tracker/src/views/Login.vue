<template>
  <div class="container">
      <Toast />
      <div class="login-container">
      <Form v-slot="$form" @submit="handleLogin" class="align-center flex flex-col gap-4 w-full sm:w-60 space-between">
        <div class="flex flex-col gap-1">  
          <h1> Login </h1>
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
        <div><a href="/register"><Message severity="info" size="medium" variant="simple" class="align-center">New User ? Don't Worry We got you covered. </Message></a></div>
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

      const initialValues = ref({
        email : '',
        password : ''
      });

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

.login-container {
  max-width: 50%;
  min-width: fit-content;
  background-color: white;
}


</style>

  