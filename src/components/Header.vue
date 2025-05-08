<script setup lang="ts">
import {useEventPageTitleStore} from "@/stores/pageTitle";
import {ref, watch} from "vue";
import ToggleTheme from "@/components/utils/ToggleTheme.vue";
import {Menu, Avatar} from '@element-plus/icons-vue'

const eventPageTitleStore = useEventPageTitleStore();
const pageTitle = ref<string>("")

function changePageTitle() {
  pageTitle.value = eventPageTitleStore.eventPayload;
}

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
      <button>
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
          <Avatar/>
        </el-icon>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
</style>