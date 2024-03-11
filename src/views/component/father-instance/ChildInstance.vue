<script setup lang="ts">
import { ref, defineExpose } from "vue";
defineOptions({
  name: "ChildComponent",
  inheritAttrs: false
});

const childValue = ref("来自子组件的属性");
const childFunc = () => {
  return "来自子组件的方法";
};
// 指定需要暴露给父组件的数据或方法
defineExpose({
  childValue,
  childFunc
});
</script>

<template>
  <div>来自子组件</div>
</template>

<style scoped lang="scss"></style>
