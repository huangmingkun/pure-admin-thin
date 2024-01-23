<script setup lang="ts">
import { ref, watch } from "vue";
import MyInput from "@/views/component/input/MyInput.vue";
import { debounce } from "@/utils/myUtils";
import { message } from "@/utils/message";

const inputVal = ref("test");

watch(
  () => inputVal.value, // 可支持ref reactive getter的值
  (newVal, oldVal) => {
    console.log({ newVal, oldVal });
    getValueByFetchDebounce();
  }
);

function getValueByFetch() {
  setTimeout(() => {
    message("模拟接口数据", {
      type: "success"
    });
  }, 1000);
}
const getValueByFetchDebounce = debounce(getValueByFetch, 500);
</script>

<template>
  <MyInput v-model="inputVal" />
</template>

<style scoped lang="scss"></style>
