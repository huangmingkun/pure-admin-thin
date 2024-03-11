<script setup lang="ts">
import { Directive } from "vue";
// 模拟接口获取当前用户权限
const userPermissions = ["add", "edit"];
const vHasPermission: Directive = (el, binding) => {
  // console.log(el, binding);
  const { value } = binding;
  if (!userPermissions.includes(value)) {
    console.log(el.parentNode);
    el.parentNode && el.parentNode.removeChild(el);
  }
};
</script>

<template>
  <div>
    <div v-has-permission="'add'">具有add权限会显示</div>
    <div v-has-permission="'edit'">具有edit权限会显示</div>
    <div v-has-permission="'delete'">具有delete权限会显示</div>
  </div>
</template>

<style scoped lang="scss"></style>
