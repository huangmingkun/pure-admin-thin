<script setup lang="ts">
import { ref, watch } from "vue";
import MyInput from "@/views/component/input/MyInput.vue";
import { debounce } from "@/utils/myUtils";

const inputVal = ref("test");

watch(
  () => inputVal.value,
  (newVal, oldVal) => {
    console.log({ newVal, oldVal });
    getValueByFetchDebounce();
  }
);

function getValueByFetch() {
  setTimeout(() => {
    console.log("接口数据");
  }, 1000);
}
const getValueByFetchDebounce = debounce(getValueByFetch, 500);
</script>

<template>
  <MyInput v-model="inputVal" />
</template>

<style scoped lang="scss"></style>
