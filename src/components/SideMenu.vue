<script setup lang="ts">
import {Document, House, Setting, SwitchButton} from '@element-plus/icons-vue'
import LanguageOutline from "@/components/icons/LanguageOutline.vue";
import {useRouter} from "vue-router";
import logout from "@/utils/common.ts";

const router = useRouter();
</script>


<template>
  <div ref="sideMenu" class="side-menu" id="side-menu">
    <el-menu
        :default-active="router.currentRoute.value.name"
        style="height: 100%; background-color: var(--el-color-primary-light-9); position: relative"
        router
    >
      <el-menu-item index="categories">
        <el-icon>
          <House />
        </el-icon>
        <span>Dashboard</span>
      </el-menu-item>
      <el-menu-item index="profile">
        <el-icon>
          <Document/>
        </el-icon>
        <span>Profile</span>
      </el-menu-item>
      <el-menu-item index="training">
        <el-icon>
          <Setting/>
        </el-icon>
        <span>Training</span>
      </el-menu-item>
      <el-menu-item index="translator">
        <el-icon>
          <LanguageOutline />
        </el-icon>
        <span>Translator</span>
      </el-menu-item>

      <el-button @click="logout" :icon="SwitchButton" style="position: absolute; bottom: 8px; left: 8px" size="large" type="default">
        Logout
      </el-button>
    </el-menu>
  </div>
</template>


<style scoped>
</style>

