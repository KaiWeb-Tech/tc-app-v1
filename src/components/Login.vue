<script setup lang="ts">
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import {type User, UserRepository} from "@/models/User.ts";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";

const { t } = useI18n();
const router = useRouter()
const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<{
  password: string
  email: string
}>({
  password: '',
  email: '',
})

const ruleForm = reactive({
  password: '',
  email: '',
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const formValidated = {
        email: dynamicValidateForm.email,
        password: dynamicValidateForm.password
      } as User
      await UserRepository.login(formValidated)
      await router.push('categories')
    } else {
      console.log('error submit!')
    }
  })
}

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
  password: [
    {
      required: true,
      message: 'Please input password',
      trigger: 'submit',
      validator: validatePass
    }
  ]
})

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <div class="login-container">
    <h1>{{ $t('page-titles.login') }}</h1>
    <el-form
        ref="formRef"
        :model="dynamicValidateForm"
        label-width="auto"
        class="demo-dynamic"
    >
      <el-form-item
          prop="email"
          :rules="formRules.email"
      >
        <el-input size="large" v-model="dynamicValidateForm.email" :placeholder="t('placeholders.email')"/>
      </el-form-item>
      <el-form-item
          prop="password"
          :rules="formRules.password"
      >
        <el-input size="large" type="password" v-model="dynamicValidateForm.password" :placeholder="t('placeholders.password')"/>
      </el-form-item>
      <div class="login-action">
        <el-form-item>
          <el-button size="large" type="primary" @click="submitForm(formRef)">{{$t('labels.login')}}</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<style scoped>

</style>