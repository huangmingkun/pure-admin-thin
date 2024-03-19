<script setup lang="ts">
import { ref, watch } from "vue";
import { useFullscreen } from "@vueuse/core";
const imgRef = ref();
const { isFullscreen, enter, exit, toggle } = useFullscreen(imgRef);
console.log(isFullscreen, enter, exit, toggle);
watch(isFullscreen, (newVal, oldVal) => {
  console.log(newVal, oldVal);
});
</script>

<template>
  <div class="vue-use-demo">
    <img ref="imgRef" src="@/assets/img/default.png" alt="图片" />
    <el-button @click="toggle">全屏</el-button>
    <hr />
    <div>{{ isFullscreen }}</div>
  </div>
</template>

<style scoped lang="scss"></style>
