<script setup lang="ts">
import {useEventPageTitleStore} from "@/stores/pageTitle";
import {onMounted} from "vue";
import {useI18n} from "vue-i18n";

const { t } = useI18n();
const eventPageTitleStore = useEventPageTitleStore();
const pageTitle = t('page-titles.translator')

onMounted(() => {
  eventPageTitleStore.triggerEvent(pageTitle)
})
</script>

<template>
  <main>
    TranslatorView
  </main>
</template>

<style scoped>

</style>