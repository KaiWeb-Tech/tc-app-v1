<script setup lang="ts">
import {Collection, Document, House, Setting, SwitchButton} from '@element-plus/icons-vue'
import LanguageOutline from "@/components/icons/LanguageOutline.vue";
import {type RouteLocationNormalizedLoaded, useRoute, useRouter} from "vue-router";
import {logout} from "@/utils/common.ts";
import {type Category, CategoryRepository} from "@/models/Category.ts";
import {computed, onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useCategoryStore} from "@/stores/categoryStore.ts"

const {t, locale} = useI18n();
const router = useRouter();
const categories = ref<Category[] | null>(null);
const route: RouteLocationNormalizedLoaded = useRoute()
const categoryStore = useCategoryStore()

const activeMenuIndex = computed(() => {
  if (route.path.startsWith('/categories/') && route.path.includes('/cards')) {
    return 'category-cards'
  }
  return route.name?.toString() || ''
})

function changeCategory(category: Category) {
  categoryStore.setCategory(category)
}

onMounted(async () => {
  categories.value = await CategoryRepository.getAll()
})
</script>


<template>
  <div ref="sideMenu" class="side-menu" id="side-menu">
    <el-menu
        :default-active="activeMenuIndex"
        style="height: 100%; background-color: var(--el-color-primary-light-9); position: relative"
        router

    >
      <el-menu-item index="categories" route="/categories">
        <el-icon>
          <House/>
        </el-icon>
        <span>{{ t('side-menu.dashboard') }}</span>
      </el-menu-item>
      <el-menu-item index="profile" route="/profile">
        <el-icon>
          <Document/>
        </el-icon>
        <span>{{ t('side-menu.profile') }}</span>
      </el-menu-item>
      <el-menu-item index="training" route="/training">
        <el-icon>
          <Setting/>
        </el-icon>
        <span>{{ t('side-menu.training') }}</span>
      </el-menu-item>
      <el-menu-item index="translator" route="/translator">
        <el-icon>
          <LanguageOutline/>
        </el-icon>
        <span>{{ t('side-menu.translator') }}</span>
      </el-menu-item>
      <el-divider/>
      <el-sub-menu index="categories-subitems">
        <template #title>
          <el-icon>
            <Collection/>
          </el-icon>
          <span>{{ t('side-menu.categories') }}</span>
        </template>
        <el-menu-item
            v-for="category in categories"
            :key="category.id"
            :index="`category-${category.id}`"
            :route="`/categories/${category.id}/cards`"
            :class="{ 'is-active': route.params.id === category.id.toString() }"
            @click="changeCategory(category)"
        >
          <span>{{ category.name }}</span>
        </el-menu-item>
      </el-sub-menu>

      <el-button @click="logout" :icon="SwitchButton" style="position: absolute; bottom: 8px; left: 8px" size="large"
                 type="default">
        Logout
      </el-button>
    </el-menu>
  </div>
</template>


<style scoped>
</style>

