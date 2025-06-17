<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router';
import Header from '@/components/Header.vue';
import { onMounted, ref, watch } from 'vue';
import SideMenu from "@/components/SideMenu.vue";
import {toggleSideMenu} from "@/utils/common.ts";

const router = useRouter();
const showHeader = ref(false);

const updateHeaderVisibility = () => {
  const currentPath = router.currentRoute.value.path;
  showHeader.value = !['/login', '/register', '/'].includes(currentPath);
};

onMounted(() => {
  updateHeaderVisibility();
  // toggleSideMenu()
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
  <SideMenu v-if="showHeader" />
  <RouterView />
  <div id="shadow-screen"></div>
</template>

<style scoped>
</style>
