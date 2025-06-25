<script setup lang="ts">
import {type Category, CategoryRepository} from "@/models/Category.ts";
import {Delete} from "@element-plus/icons-vue";
import {useI18n} from "vue-i18n";

const {t, locale} = useI18n();

defineProps<{
  category: Category;
}>()

const emit = defineEmits<{
  update: [value: any]
}>()

async function deleteCategory(category: Category) {
  await CategoryRepository.deleteCategory(category)
  emit('update', category)
}
</script>

<template>
  <div class="category-card-content">
    <div class="category-card-left">
      <h4>{{ category.name }}</h4>
      <div>{{ t('categories-page.cards') }} 32</div>
    </div>
    <div class="category-card-right">
    </div>
    <div class="category-card-actions">
      <button class="bt-delete" @click="deleteCategory(category)">
        <el-icon color="var(--el-color-danger)">
          <Delete/>
        </el-icon>
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>