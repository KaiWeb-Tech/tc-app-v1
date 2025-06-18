<script setup lang="ts">
import {useEventPageTitleStore} from "@/stores/pageTitle";
import {onMounted} from "vue";
import {useI18n} from "vue-i18n";
import Translator from "@/components/Translator.vue";

const { t } = useI18n();
const eventPageTitleStore = useEventPageTitleStore();
const pageTitle = t('page-titles.translator')

onMounted(() => {
  eventPageTitleStore.triggerEvent(pageTitle)
})
</script>

<template>
  <main>
    <Translator />
  </main>
</template>

<style scoped>

</style>