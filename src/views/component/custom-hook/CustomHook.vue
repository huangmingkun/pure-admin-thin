<script setup lang="ts">
import { useImgToBase64 } from "./imgToBase64";

useImgToBase64("img").then(res => {
  console.log(res);
});
</script>

<template>
  <div class="img-to-base64">
    <img id="img" src="@/assets/img/default.png" alt="图片" />
  </div>
</template>

<style scoped lang="scss">
.img-to-base64 {
}
</style>
