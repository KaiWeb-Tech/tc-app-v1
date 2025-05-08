<script setup lang="ts">
import Profile from "@/components/Profile.vue";
import {useEventPageTitleStore} from "@/stores/pageTitle";
import {onMounted} from "vue";
import {useI18n} from "vue-i18n";

const { t } = useI18n();
const eventPageTitleStore = useEventPageTitleStore();

function localeChanged() {
  const pageTitle = t('page-titles.profile')
  eventPageTitleStore.triggerEvent(pageTitle)
}

onMounted(() => {
  localeChanged()
})

</script>

<template>
  <main>
    <Profile @change="localeChanged" />
  </main>
</template>

<style scoped>

</style>