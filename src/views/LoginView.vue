<script setup lang="ts">

import Login from "@/components/Login.vue";
</script>

<template>
  <main class="login-view">
    <Login />
  </main>
</template>

<style scoped>
.login-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>