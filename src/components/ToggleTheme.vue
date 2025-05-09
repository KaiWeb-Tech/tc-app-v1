<script setup lang="ts">
import {ref} from 'vue'
import {Sunny, Moon} from '@element-plus/icons-vue'

const value = ref(true)

function toggleTheme() {
  const html = document.getElementsByTagName('html')[0]
  if (!value.value) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
}

</script>

<template>
  <div>
    <el-switch
        v-model="value"
        @change="toggleTheme"
        inline-prompt
        :active-icon="Sunny"
        :inactive-icon="Moon"
    />
  </div>
</template>

<style scoped>

</style>