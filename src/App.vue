<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router';
import Header from '@/components/Header.vue';
import { onMounted, ref, watch } from 'vue';

const router = useRouter();
const showHeader = ref(false);

const updateHeaderVisibility = () => {
  const currentPath = router.currentRoute.value.path;
  showHeader.value = !['/login', '/register', '/'].includes(currentPath);
};

onMounted(() => {
  updateHeaderVisibility();
});

watch(
    () => router.currentRoute.value.path,
    () => {
      updateHeaderVisibility();
    }
);

</script>

<template>
  <Header v-if="showHeader" />
  <RouterView />
</template>

<style scoped>
</style>
