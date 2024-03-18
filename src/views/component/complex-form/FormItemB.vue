<script lang="ts" setup>
import {
  reactive,
  ref,
  defineEmits,
  onMounted,
  watch,
  nextTick,
  inject
} from "vue";
import type { Ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import type { FormData } from "./ComplexForm.vue";

interface RuleForm {
  date1: string;
  date2: string;
  delivery: boolean;
  type: string[];
  resource: string;
  desc: string;
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
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: ""
});

const rules = reactive<FormRules<RuleForm>>({
  date1: [
    {
      type: "date",
      required: true,
      message: "Please pick a date",
      trigger: "change"
    }
  ],
  date2: [
    {
      type: "date",
      required: true,
      message: "Please pick a time",
      trigger: "change"
    }
  ],
  type: [
    {
      type: "array",
      required: true,
      message: "Please select at least one activity type",
      trigger: "change"
    }
  ],
  resource: [
    {
      required: true,
      message: "Please select activity resource",
      trigger: "change"
    }
  ],
  desc: [
    { required: true, message: "Please input activity form", trigger: "blur" }
  ]
});

const submitForm = () => {
  return new Promise((resolve, reject) => {
    if (!ruleFormRef.value) return resolve(null);
    ruleFormRef.value.validate((valid, fields) => {
      if (valid) {
        console.log("formItemB---submit!");
        resolve(ruleForm);
      } else {
        // console.log("error submit!", fields);
        resolve(null);
      }
    });
  });
};

const resetForm = () => {
  if (!ruleFormRef.value) return;
  ruleFormRef.value.resetFields();
};
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
    <el-form-item label="Activity time" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker
            v-model="ruleForm.date1"
            type="date"
            label="Pick a date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
      <el-col class="text-center" :span="2">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker
            v-model="ruleForm.date2"
            label="Pick a time"
            placeholder="Pick a time"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="Instant delivery" prop="delivery">
      <el-switch v-model="ruleForm.delivery" />
    </el-form-item>
    <el-form-item label="Activity type" prop="type">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox label="Online activities" name="type" />
        <el-checkbox label="Promotion activities" name="type" />
        <el-checkbox label="Offline activities" name="type" />
        <el-checkbox label="Simple brand exposure" name="type" />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="Resources" prop="resource">
      <el-radio-group v-model="ruleForm.resource">
        <el-radio label="Sponsorship" />
        <el-radio label="Venue" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Activity form" prop="desc">
      <el-input v-model="ruleForm.desc" type="textarea" />
    </el-form-item>
  </el-form>
</template>
