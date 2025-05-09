<script setup lang="ts">
import {ref, onMounted, reactive} from 'vue';
import {type User, UserRepository} from "@/models/User.ts";
import {useProfileStore} from "@/stores/profileStore.ts";
import {useI18n} from "vue-i18n";
import type {FormInstance, FormRules} from "element-plus";
import {useRouter} from "vue-router";

const router = useRouter()
const {t, locale} = useI18n();
const profile = ref<any>(null);
const profileStore = useProfileStore();

const emit = defineEmits<{
  (e: 'change', value: boolean): void
}>()

const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<{
  password: string
  email: string
  nickname: string
  confirm: string
  locale: string
}>({
  password: t('placeholders.fake'),
  email: '',
  nickname: '',
  confirm: '',
  locale: locale.value,
})

const ruleForm = reactive({
  password: '',
  email: '',
  nickname: '',
  confirm: '',
  locale: '',
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const formValidated = {
        email: dynamicValidateForm.email,
        nickname: dynamicValidateForm.nickname,
        lang: dynamicValidateForm.locale,
        password: dynamicValidateForm.password
      } as User
      await UserRepository.updateProfile(formValidated)
      await router.push('profile')
    } else {
      console.log('error submit!')
    }
  })
}
//TODO: Séparer la mécanique de changement de mot de passe.
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.password !== '') {
      if (!formRef.value) return
      formRef.value.validateField('password')
    }
    callback()
  }
}

const validateConfirm = (rule: any, value: any, callback: any) => {
  console.log(ruleForm)
  if (value === '') {
    callback(new Error('Please confirm the password'))
  } else {
    if (ruleForm.confirm !== '' && ruleForm.confirm === ruleForm.password) {
      if (!formRef.value) return
      formRef.value.validateField('confirm')
    }
    callback()
  }
}

function changeLocale() {
  locale.value = dynamicValidateForm.locale
  localStorage.setItem('tc_language', dynamicValidateForm.locale)
  emit('change', true)
}

const options = [
  {
    value: 'fr',
    label: t('locales.fr'),
  },
  {
    value: 'en',
    label: t('locales.en'),
  },
]

const formRules = reactive<FormRules<typeof ruleForm>>({
  email: [
    {
      required: true,
      message: 'Please input email address',
      trigger: 'submit',
    },
    {
      type: 'email',
      message: 'Please input correct email address',
      trigger: ['submit'],
    },
  ],
  nickname: [
    {
      required: true,
      message: 'Please input nickname',
      trigger: 'submit',
    }
  ],
  password: [
    {
      required: true,
      message: 'Please input password',
      trigger: 'submit',
      validator: validatePass
    }
  ],
  confirm: [
    {
      required: true,
      message: 'Please confirm password',
      trigger: 'submit',
      validator: validateConfirm
    }
  ]
})

onMounted(async () => {
  profile.value = await UserRepository.getProfile() as User;
  dynamicValidateForm.email = profile.value.email
  dynamicValidateForm.nickname = profile.value.nickname
  profileStore.addProfile(profile.value);
  console.log(locale.value)
});
</script>

<template>
  <section class="page">
    <div class="page-header">
      <h2>{{ t('page-subtitles.profile') }}</h2>
    </div>
    <div class="page-content">
      <el-form
          ref="formRef"
          :model="dynamicValidateForm"
          label-width="auto"
          label-position="top"
          class="demo-dynamic">
        <el-form-item
            :label="t('labels.nickname')"
            prop="nickname"
            :rules="formRules.nickname">
          <el-input size="large" v-model="dynamicValidateForm.nickname"/>
        </el-form-item>
        <el-form-item
            :label="t('labels.email')"
            prop="email"
            :rules="formRules.email">
          <el-input size="large" v-model="dynamicValidateForm.email"/>
        </el-form-item>
        <el-form-item :label="t('labels.locale')" prop="locale">
          <el-select
              v-model="dynamicValidateForm.locale"
              placeholder="Select"
              size="large"
              style="width: 80px"
              @change="changeLocale"
          >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </section>
  <div class="page-action">
    <el-button size="large" type="default" @click="router.back()">{{ $t('labels.back') }}</el-button>
    <el-button size="large" type="primary" @click="submitForm(formRef)">{{ $t('labels.save') }}</el-button>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: calc(100vh - 120px);
  position: relative;

  & .page-header {
    padding: 16px 10px
  }

  & .page-content {
    padding: 16px 16px;
  }
}

.page-action {
  position: sticky;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 60px;
  padding: 0 10px;

}
</style>