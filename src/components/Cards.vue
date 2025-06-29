<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {computed, onMounted, reactive, ref, watch} from "vue";
import {type Category, CategoryRepository} from "@/models/Category.ts";
import CategoryCard from "@/components/CategoryCard.vue";
import {Plus, Search} from "@element-plus/icons-vue";
import type {FormInstance, FormRules} from "element-plus";
import {useRoute} from "vue-router";
import {type Card, CardRepository} from "@/models/Card.ts";
import {useCategoryStore} from "@/stores/categoryStore.ts"
import {storeToRefs} from "pinia";

const {t, locale} = useI18n();
const route = useRoute()
const categoryStore = useCategoryStore();
const { category: storeCategory } = storeToRefs(categoryStore);
const query = ref('')
const cards = ref<Card[] | null>(null);
const isLoading = ref(false)
const dialogFormVisible = ref(false);

const categoryId = route.params.id
const category = ref<Category | null>(null);

const searchQuery = computed(() =>
    cards.value?.filter((data) =>
        !query.value ||
        data.front_side.toLowerCase().includes(query.value.toLowerCase())
    )
)

const loadCards = async () => {
  try {
    isLoading.value = true;
    cards.value = await CardRepository.getAll(String(categoryStore.category.id??categoryId));
  } catch (error) {
    console.error("Failed to load cards:", error);
  } finally {
    isLoading.value = false;
  }
};

watch(
    () => storeCategory.value,
    async (newCategory) => {
      if (newCategory && newCategory.id !== categoryId) {
        category.value = newCategory;
        await loadCards();
      }
    },
    { immediate: true }
);

onMounted(async () => {
  if (!storeCategory.value || storeCategory.value.id !== categoryId) {
    category.value = await CategoryRepository.getById(String(categoryId));
    await loadCards();
  }
});
</script>

<template>
  <section class="page">
    <div class="page-header">
      <h2>{{ category?.name }}</h2>
    </div>
    <div class="page-content col">
      <div class="search-header">
        <el-input :suffix-icon="Search" size="large" v-model="query" v-on:input="searchQuery"
                  :placeholder="t('placeholders.search')"/>
        <el-button v-loading="isLoading" size="large" type="primary" :icon="Plus" @click="dialogFormVisible = true">
          {{ t('cards-page.btn.add') }}
        </el-button>
      </div>
      <el-table :empty-text="t('common.emptyState')" fit lazy v-loading="!cards" :data="searchQuery" style="width: 100%"
                stripe border>
        <el-table-column type="selection" width="36"/>
        <el-table-column property="front_side" label="Front side"/>
        <el-table-column property="back_side" label="Back side"/>
        <el-table-column property="description" label="Description"/>
        />
      </el-table>
    </div>
  </section>
</template>

<style scoped>

</style>