<script setup lang="ts">
import { useMouse } from "@/hooks/useMouse";
// 组合式函数练习
const { x, y } = useMouse();
</script>

<template>
  <div>鼠标位置：{{ x }}, {{ y }}</div>
</template>

<style scoped lang="scss"></style>
