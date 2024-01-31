<script setup lang="ts">
import FormItemA from "@/views/component/complex-form/formItemA.vue";
import FormItemB from "@/views/component/complex-form/formItemB.vue";
import { reactive } from "vue";

const formData = reactive({});
// 将子组件表单的参数添加到formData中
const addParamsToFormData = (params: any) => {
  Object.assign(formData, params);
};
const formEventList = reactive([]);
// 存储子组件的表单验证方法，在提交时统一调用
const addEventToFormEventList = (event: Function) => {
  formEventList.push(event);
};
const submitHandler = () => {
  let successFlag = true;
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
</script>

<template>
  <div>{{ formData }}</div>
  <FormItemA @add-event="addEventToFormEventList" />
  <FormItemB />
  <el-button type="primary" @click="submitHandler">提交</el-button>
</template>

<style scoped lang="scss"></style>
