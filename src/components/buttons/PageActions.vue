<script setup lang="ts">
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";

const router = useRouter()
const {t} = useI18n();

const props = defineProps({
  submitForm: {
    type: Function,
    required: true
  },
  formRef: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="page-action">
    <el-button size="large" type="default" @click="router.back()">{{ $t('labels.back') }}</el-button>
    <el-button size="large" type="primary" @click="submitForm(formRef)">{{ $t('labels.save') }}</el-button>
  </div>
</template>

<style scoped>

</style>