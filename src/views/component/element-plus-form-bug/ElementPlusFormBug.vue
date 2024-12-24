<script setup lang="ts">
import {
  reactive,
  ref,
  defineEmits,
  onMounted,
  inject,
  watch,
  nextTick
} from "vue";
import type { FormInstance, FormRules } from "element-plus";
interface RuleForm {
  name: string;
  region: string;
  count: string;
}

const formSize = ref<"large" | "default" | "small">("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  name: "",
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
const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`
}));
const add = () => {
  ruleFormRef.value.resetFields();
};
const edit = () => {
  ruleForm.count = "6666";
};
onMounted(() => {
  ruleForm.name = "8888";
});
</script>

<template>
  <div>
    <el-button @click="add">添加</el-button>
    <el-button @click="edit">修改</el-button>
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
  </div>
</template>

<style scoped lang="scss"></style>
