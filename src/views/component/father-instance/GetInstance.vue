<script setup lang="ts">
import ChildInstance from "@/views/component/father-instance/ChildInstance.vue";
import { ref } from "vue";
import { ElMessage } from "element-plus";

defineOptions({
  name: "GetInstance"
});

const instanceRef = ref(null);
const getChildInstance = () => {
  const childInstance = instanceRef.value; // 通过ref获取子组件实例
  console.log(childInstance.childValue);
  console.log(childInstance.childFunc());
  ElMessage.success(
    `${childInstance.childValue} + ${childInstance.childFunc()}`
  );
};
</script>

<template>
  <div>
    <ChildInstance ref="instanceRef" />
    <el-button @click="getChildInstance">获取子组件属性和方法</el-button>
  </div>
</template>

<style scoped lang="scss"></style>
