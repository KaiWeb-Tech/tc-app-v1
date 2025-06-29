<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {computed, onMounted, reactive, ref, watch} from "vue";
import {type Category, CategoryRepository} from "@/models/Category.ts";
import CategoryCard from "@/components/CategoryCard.vue";
import {Edit, EditPen, Plus, Search} from "@element-plus/icons-vue";
import type {FormInstance, FormRules} from "element-plus";
import {useRoute} from "vue-router";
import {type Card, CardRepository} from "@/models/Card.ts";
import {useCategoryStore} from "@/stores/categoryStore.ts"
import {storeToRefs} from "pinia";
import {CategoryManager} from "@/api/CategoryManager.ts";

const {t, locale} = useI18n();
const route = useRoute()
const categoryStore = useCategoryStore();
const { category: storeCategory } = storeToRefs(categoryStore);
const query = ref('')
const cards = ref<Card[] | null>(null);
const isLoading = ref(false)
const dialogFormNewCardVisible = ref(false);
const dialogFormVisible = ref(false);

let categoryId = route.params.id
const category = ref<Category | null>(null);
const currentCategory = categoryStore.category as Category

const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<{
  name: string
  description: string
  color: string
}>({
  name: currentCategory.name||'',
  description: '',
  color: '',
})

const form = reactive({
  name: '',
  description: '',
  color: '',
})

const formRules = reactive<FormRules<typeof form>>({
  name: [
    {
      required: true,
      min: 2,
      max: 24,
      message: 'Please input name',
      trigger: 'submit',
    }
  ],
  description: [
    {
      required: false,
      min: 2,
      max: 255,
      trigger: 'submit',
    }
  ],
  color: [
    {
      required: false,
    }
  ],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      isLoading.value = true;
      const newCategory = {
        name: dynamicValidateForm.name.trim(),
        description: dynamicValidateForm.description.trim(),
        color: dynamicValidateForm.color.trim(),
      } as Category
      CategoryRepository.update(String(category.value!.id), newCategory).then((result) => {
        categoryStore.setCategory(result)
      })
      setTimeout(() => {
        isLoading.value = false;
      }, 500)
      dialogFormVisible.value = false
      formEl.resetFields()
    } else {
      console.log('error submit!')
      isLoading.value = false;
    }
  })
}

function fillForm(category: Category) {
  dynamicValidateForm.name = category.name||''
  dynamicValidateForm.description = category.description||''
  dynamicValidateForm.color = category.color||''
}

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

watch(() => storeCategory.value,async (newCategory) => {
      if (newCategory && newCategory.id !== categoryId) {
        category.value = newCategory;
        fillForm(category.value)
        await loadCards();
      }
    },
    { immediate: true }
);

onMounted(async () => {
  if (!storeCategory.value || storeCategory.value.id !== categoryId) {
    category.value = await CategoryRepository.getById(String(categoryId));
    fillForm(category.value!)
    await loadCards();
  }
});
</script>

<template>
  <section class="page">
    <div class="page-header">
      <h2>{{ category?.name }}</h2>
      <button @click="dialogFormVisible = true">
        <el-icon>
          <EditPen />
        </el-icon>
      </button>
    </div>
    <div class="page-content col">
      <div class="search-header">
        <el-input :suffix-icon="Search" size="large" v-model="query" v-on:input="searchQuery"
                  :placeholder="t('placeholders.search')"/>
        <el-button v-loading="isLoading" size="large" type="primary" :icon="Plus" @click="dialogFormNewCardVisible = true">
          {{ t('cards-page.btn.add') }}
        </el-button>
      </div>
      <el-table :empty-text="t('common.emptyState')" fit lazy v-loading="!cards" :data="searchQuery" style="width: 100%"
                stripe border>
        <el-table-column type="selection" width="36"/>
        <el-table-column property="front_side" label="Front side" min-width="150"/>
        <el-table-column property="back_side" label="Back side" min-width="150"/>
        <el-table-column property="description" label="Description" min-width="150"/>
        <el-table-column property="rating" label="Rating" width="100"/>
        <el-table-column label="Edit" width="60">
          <template #default>
            <el-button link type="primary" size="small">
              <el-icon>
                <EditPen />
              </el-icon>
            </el-button>
          </template>
        </el-table-column>
        />
      </el-table>
    </div>
  </section>

  <el-dialog v-model="dialogFormVisible" title="Edit category"
             style="min-width: 300px; max-width: 400px; margin-top: 30vh">
    <el-form
        :model="dynamicValidateForm"
        ref="formRef"
    >
      <el-form-item prop="name" :rules="formRules.name">
        <el-input :value="dynamicValidateForm.name" v-model="dynamicValidateForm.name" autocomplete="off" placeholder="Name" size="large"/>
      </el-form-item>
      <el-form-item prop="description" :rules="formRules.description">
        <el-input v-model="dynamicValidateForm.description" autocomplete="off" placeholder="Description" size="large"/>
      </el-form-item>
      <el-form-item label="Color" prop="color" :rules="formRules.color">
        <div class="demo-color-block">
          <el-color-picker v-model="dynamicValidateForm.color"/>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button size="large" @click="dialogFormVisible = false">Cancel</el-button>
        <el-button size="large" type="primary" @click="submitForm(formRef)">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>