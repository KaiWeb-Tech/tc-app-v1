<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {useEventPageTitleStore} from "@/stores/pageTitle.ts";
import {onMounted} from "vue";
import Training from "@/components/Training.vue";

const { t } = useI18n();
const eventPageTitleStore = useEventPageTitleStore();
const pageTitle = t('page-titles.training')

onMounted(() => {
  eventPageTitleStore.triggerEvent(pageTitle)
})
</script>

<template>
  <main>
    <Training />
  </main>
</template>

<style scoped>

</style>