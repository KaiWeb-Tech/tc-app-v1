<script setup lang="ts">
import {useEventPageTitleStore} from "@/stores/pageTitle";
import {onMounted} from "vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const eventPageTitleStore = useEventPageTitleStore();
const pageTitle = t('page-titles.categories')

onMounted(() => {
  eventPageTitleStore.triggerEvent(pageTitle)
})
</script>

<template>
  <main>
    CategoriesView
  </main>
</template>

<style scoped>

</style>