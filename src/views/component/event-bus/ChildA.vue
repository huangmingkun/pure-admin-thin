<script setup lang="ts">
import { getCurrentInstance } from "vue";

const { proxy = {} } = getCurrentInstance();
let flag = true;
const onClick = () => {
  flag = !flag;
  proxy?.$Bus.emit("hmk-test", flag);
};
</script>

<template>
  <div class="child-a">
    <div>我是ChildA页面</div>
    <el-button @click="onClick">与ChildB通信</el-button>
  </div>
</template>

<style scoped lang="scss">
.child-a {
  background-color: yellowgreen;
  padding: 10px;
}
</style>
