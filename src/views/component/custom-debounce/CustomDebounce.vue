<script setup lang="ts">
import { ref } from "vue";
import { customDebounce } from "@/utils/utils";
const inputVal = ref();
const inputChange = customDebounce(
  args => {
    console.log("函数执行了", args);
  },
  1000,
  false
);
</script>

<template>
  <div class="custom-debounce">
    <el-input v-model="inputVal" @input="inputChange" />
  </div>
</template>

<style scoped lang="scss"></style>
