<script setup lang="ts">
import { useMouse } from "@/hooks/useMouse";

defineOptions({
  name: "Welcome"
});
const { x, y } = useMouse();
console.log(111, x.value, y.value);
</script>

<template>
  <div>我的位置是{{ x }} {{ y }}</div>
  <h1>Pure-Admin-Thin（非国际化版本）</h1>
</template>
