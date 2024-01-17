<script setup lang="ts">
import { defineEmits, defineProps } from "vue";
interface Props {
  modelValue: any;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: ""
});
interface Emits {
  (e: "update:modelValue", value: any): void;
}
const emits = defineEmits<Emits>();
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emits('update:modelValue', $event.target.value)"
  />
</template>

<style scoped lang="scss"></style>
