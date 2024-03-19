<script setup lang="ts">
import { getCurrentInstance, ref } from "vue";

const getParamsFromChildA = ref();
const { proxy = {} } = getCurrentInstance();
proxy.$Bus.on("hmk-test", param => {
  console.log("ChildB收到消息", param);
  getParamsFromChildA.value = param;
});
</script>

<template>
  <div class="child-b">
    <div>我是ChildB页面</div>
    <div>来自ChildA的值：{{ getParamsFromChildA }}</div>
  </div>
</template>

<style scoped lang="scss">
.child-b {
  background-color: skyblue;
  padding: 10px;
}
</style>
