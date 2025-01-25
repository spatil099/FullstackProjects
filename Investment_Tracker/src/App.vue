<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>Investment Tracker</header>
  <navbar>
 <RouterLink to="/">Login</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
      </navbar>
  <RouterView />
</template>

<style scoped>


</style>
