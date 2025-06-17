<script setup lang="ts">
import {Document, Setting, House} from '@element-plus/icons-vue'
import LanguageOutline from "@/components/icons/LanguageOutline.vue";
</script>


<template>
  <div ref="sideMenu" class="side-menu" id="side-menu">
    <el-menu
        class="el-menu-vertical-demo"
        default-active="2"
        style="height: 100%; background-color: var(--el-color-primary-light-9)"
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
    </el-menu>
  </div>
</template>


<style scoped>
</style>

