<script setup lang="ts">
import {type Category, CategoryRepository} from "@/models/Category.ts";
import {Delete} from "@element-plus/icons-vue";
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import {useRouter} from "vue-router";

const {t, locale} = useI18n();
const isLoading = ref(false)
const dialogDeleteVisible = ref(false)
const router = useRouter()


defineProps<{
  category: Category;
}>()

const emit = defineEmits<{
  update: [value: any]
}>()

async function deleteCategory(category: Category) {
  dialogDeleteVisible.value = false
  isLoading.value = true
  setTimeout(() => {
    CategoryRepository.deleteCategory(category)
    emit('update', category)
    isLoading.value = false
  }, 500)
}

function goToDetails(event: Event, category: Category): void {
  const target = event.target as HTMLElement
  if (target.classList.contains('bt-delete')) {
    dialogDeleteVisible.value = true
  } else {
    router.push({
      name: 'cards',
      params: {id: category.id}
    })
  }
}
</script>

<template>
  <div v-loading="isLoading" class="category-card-content" @click="goToDetails($event, category)">
    <div class="category-card-left">
      <h4>{{ category.name }}</h4>
      <p v-if="category.description" class="help">{{ category.description }}</p>
    </div>
    <div class="category-card-right">
      <!--      <div>{{ t('categories-page.cards') }} 32</div>-->
    </div>
    <div class="category-card-actions">
      <button class="bt-delete">
        <el-icon color="var(--el-color-danger)">
          <Delete/>
        </el-icon>
      </button>
    </div>
  </div>

  <el-dialog v-model="dialogDeleteVisible" title="Delete category?" style="margin-top: 35vh; width: 250px">
    <!--    TODO: Indiquer le nombre de cards dans la cat-->
    <template #footer>
      <div class="dialog-footer">
        <el-button size="large" @click="dialogDeleteVisible = false">Cancel</el-button>
        <el-button size="large" type="danger" @click="deleteCategory(category)">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>