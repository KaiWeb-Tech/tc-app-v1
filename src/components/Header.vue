<script setup lang="ts">
import {useEventPageTitleStore} from "@/stores/pageTitle";
import {ref, watch} from "vue";
import ToggleTheme from "@/components/ToggleTheme.vue";
import {Menu, Avatar} from '@element-plus/icons-vue'
import {toggleSideMenu} from "@/components/utils/utils.ts";


const eventPageTitleStore = useEventPageTitleStore();
const pageTitle = ref<string>("")


function changePageTitle() {
  pageTitle.value = eventPageTitleStore.eventPayload;
}


function openSideMenu() {
  toggleSideMenu()
}

// const sideMenu = ref<HTMLElement | null>(null);
//
// function openSideMenu() {
//   if (sideMenu.value) {
//     sideMenu.value.classList.toggle('open');
//   }
// }


watch(
    () => eventPageTitleStore.eventPayload,
    () => {
      changePageTitle();
    }
);
</script>


<template>
  <div class="header">
    <div class="header-left">
      <button class="toggle-side-menu" @click="openSideMenu">
        <el-icon>
          <Menu/>
        </el-icon>
      </button>
      <h1>{{ pageTitle }}</h1>
    </div>
    <div class="header-right">
      <ToggleTheme/>
      <RouterLink to="/profile" class="avatar">
        <el-icon>
          <!--          <Avatar/>-->
          <el-avatar :size="50"><Avatar/></el-avatar>
        </el-icon>
      </RouterLink>
    </div>
  </div>
</template>


<style scoped>
</style>



