<script setup lang="ts">
import {useI18n} from "vue-i18n";
const {t, locale} = useI18n();
</script>

<template>
  <section class="page">
    <div class="page-header">
      <h2>{{ t('page-subtitles.training') }}</h2>
    </div>
  </section>
</template>

<style scoped>

</style>