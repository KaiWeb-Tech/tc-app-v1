<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {onMounted, reactive, ref} from "vue";
import {type Category, CategoryRepository} from "@/models/Category.ts";
import CategoryCard from "@/components/CategoryCard.vue";
import {Plus, Search} from "@element-plus/icons-vue";
import type {FormInstance, FormRules} from "element-plus";

const {t, locale} = useI18n();

const categories = ref<Category[] | null>(null);
const query = ref('')
const isLoading = ref(false)
const dialogFormVisible = ref(false)
const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<{
  name: string
  description: string
  color: string
}>({
  name: '',
  description: '',
  color: '',
})

async function getCategories() {
  categories.value = await CategoryRepository.getAll()
}

const searchQuery = () => {
  return categories.value?.filter(category =>
      category.name.toLowerCase().includes(query.value.toLowerCase())
  ) ?? []
}

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
      max: 32,
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
        name: dynamicValidateForm.name,
        description: dynamicValidateForm.description,
        color: dynamicValidateForm.color,
      } as Category
      const categoryAdded = await CategoryRepository.addCategory(newCategory)
      setTimeout(() => {
        categories.value?.push(categoryAdded)
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

function categoryDeleted(value: any) {
  categories.value?.splice(categories.value?.indexOf(value), 1)
}

onMounted(() => {
  getCategories()
})
</script>

<template>
  <section class="page">
    <div class="page-header">
      <h2>{{ t('page-subtitles.dashboard') }}</h2>
    </div>
    <div class="page-content col">
      <div class="search-header">
        <el-input :suffix-icon="Search" size="large" v-model="query" v-on:input="searchQuery"
                  :placeholder="t('placeholders.search')"/>
        <el-button v-loading="isLoading" size="large" type="primary" :icon="Plus" @click="dialogFormVisible = true">
          {{ t('categories-page.btn.add') }}
        </el-button>
      </div>
      <div v-loading="!categories" class="cards-collection">
        <div class="empty-area" v-show="searchQuery()?.length === 0 && categories">{{ t('common.emptyState') }}</div>
        <el-card v-for="category in searchQuery()" shadow="hover" class="h-[96px]">
          <CategoryCard :category="category" @update="categoryDeleted"/>
        </el-card>
      </div>
    </div>
  </section>

  <el-dialog v-model="dialogFormVisible" title="New category"
             style="min-width: 300px; max-width: 400px; margin-top: 30vh">
    <el-form
        :model="dynamicValidateForm"
        ref="formRef"
    >
      <el-form-item prop="name" :rules="formRules.name">
        <el-input required="true" v-model="dynamicValidateForm.name" autocomplete="off" placeholder="Name" size="large"/>
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