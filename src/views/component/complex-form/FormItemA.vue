<script lang="ts" setup>
import {
  reactive,
  ref,
  defineEmits,
  onMounted,
  inject,
  watch,
  nextTick
} from "vue";
import type { Ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { FormData } from "./ComplexForm.vue";
interface RuleForm {
  name: string;
  region: string;
  count: string;
}

interface Emits {
  (e: "add-submit-event", event: Function): void;
  (e: "add-reset-event", event: Function): void;
}
const emits = defineEmits<Emits>();

// 接受注入的默认表单数据（表单回填）
const defaultFormData = inject<Ref<FormData>>("defaultFormData");

onMounted(() => {
  // 将当前表单验证方法传递给父组件维护的数组，父组件点击提交时，统一遍历数组进行表单验证
  emits("add-submit-event", submitForm);
  emits("add-reset-event", resetForm);
});

const setDefaultFormData = (ruleForm, sourceForm) => {
  console.log("666666--sourceForm", sourceForm);
  for (const key in ruleForm) {
    if (Object.prototype.hasOwnProperty.call(sourceForm, key)) {
      ruleForm[key] = JSON.parse(JSON.stringify(sourceForm[key]));
    }
  }
};

watch(
  () => defaultFormData.value,
  () => {
    console.log("watch监听");
    // 回填表单数据时，需要加nextTick，否则ruleFormRef.value.resetFields()初始化表单时，会初始化为赋值后的表单数据（无法达到真正初始化表单为空值）
    nextTick(() => {
      setDefaultFormData(ruleForm, defaultFormData.value);
    });
  },
  {
    immediate: true
  }
);

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  name: "Hello",
  region: "",
  count: ""
});

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" }
  ],
  region: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change"
    }
  ],
  count: [
    {
      required: true,
      message: "Please select Activity count",
      trigger: "change"
    }
  ]
});

// 单个表单提交，校验通过则返回表单的字段，校验失败则返回null
const submitForm = () => {
  return new Promise((resolve, reject) => {
    if (!ruleFormRef.value) return resolve(null);
    ruleFormRef.value.validate((valid, fields) => {
      if (valid) {
        console.log("formItemA---submit!");
        resolve(ruleForm);
      } else {
        resolve(null);
      }
    });
  });
};

const resetForm = () => {
  if (!ruleFormRef.value) return;
  ruleFormRef.value.resetFields();
};

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`
}));
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="Activity name" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="Activity zone" prop="region">
      <el-select v-model="ruleForm.region" placeholder="Activity zone">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="Activity count" prop="count">
      <el-select-v2
        v-model="ruleForm.count"
        placeholder="Activity count"
        :options="options"
      />
    </el-form-item>
  </el-form>
</template>
