<script setup lang="ts">
import {useEventPageTitleStore} from "@/stores/pageTitle";
import {onMounted} from "vue";
import {useI18n} from "vue-i18n";
import Cards from "@/components/Cards.vue";

const { t } = useI18n();
const eventPageTitleStore = useEventPageTitleStore();
const pageTitle = t('page-titles.cards')

onMounted(() => {
  eventPageTitleStore.triggerEvent(pageTitle)
})
</script>

<template>
  <main>
    <Cards />
  </main>
</template>

<style scoped>

</style>