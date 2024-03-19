<script setup lang="ts">
import FormItemA from "@/views/component/complex-form/FormItemA.vue";
import FormItemB from "@/views/component/complex-form/FormItemB.vue";
import { reactive, provide, ref, onMounted, readonly } from "vue";

defineOptions({
  name: "ComplexForm"
});
export interface FormData {
  name: string;
  region: string;
  count: number | string;
  date1: string;
  date2: string;
  delivery: boolean;
  type: string[];
  resource: string;
  desc: string;
}

const formData = ref<FormData>({
  name: "",
  region: "",
  count: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: ""
});
// 向子组件注入表单的初始化的值或者回填的值，一般是编辑表单的时候需要传递
provide("defaultFormData", readonly(formData));

const getFormData = () => {
  formData.value = {
    name: "Hello",
    region: "shanghai",
    count: "5",
    date1: "",
    date2: "",
    delivery: false,
    type: [],
    resource: "",
    desc: "hello world"
  };
};
onMounted(() => {});
// 将子组件表单的参数添加到formData中汇总
const addParamsToFormData = (params: any) => {
  Object.assign(formData.value, params);
};
const formEventList = reactive([]);
// 存储子组件的表单验证方法，在提交时统一调用
const addEventToFormEventList = (event: Function) => {
  formEventList.push(event);
};
const submitHandler = () => {
  let successFlag = true;
  console.log("formEventList=", formEventList);
  formEventList.forEach((func, index, list) => {
    // 执行子组件的方法（表单验证+触发add-params添加参数）
    func()
      .then(res => {
        if (!res) {
          // 如果表单存在一个不满足，则设置标识为false，后续根据这个标识来确定是否可以提交表单
          successFlag = false;
        } else {
          // 表单验证通过后，添加参数到formData
          addParamsToFormData(res);
        }
        // 执行最后一个表单验证并且通过后，提交表单处理
        if (index === list.length - 1 && successFlag) {
          console.log("表单验证通过，提交表单");
        }
      })
      .catch(err => {
        console.log("返回错误", err);
      });
  });
};

const formResetEvent = reactive([]);
//  存储子组件的表单重置方法，在重置时统一调用
const addFormResetEvent = func => {
  formResetEvent.push(func);
};
const resetForm = () => {
  formResetEvent.forEach(func => {
    func();
  });
};
</script>

<template>
  <div>
    <div>{{ formData }}</div>
    <FormItemA
      @add-submit-event="addEventToFormEventList"
      @add-reset-event="addFormResetEvent"
    />
    <FormItemB
      @add-submit-event="addEventToFormEventList"
      @add-reset-event="addFormResetEvent"
    />
    <el-button type="primary" @click="submitHandler">表单提交</el-button>
    <el-button @click="resetForm">重置表单</el-button>
    <el-button @click="getFormData">模拟接口请求表单回填数据</el-button>
  </div>
</template>

<style scoped lang="scss"></style>
