<script setup lang="ts">
import ChildA from "@/views/component/event-bus/ChildA.vue";
import ChildB from "@/views/component/event-bus/ChildB.vue";
</script>

<template>
  <div class="event-bus">
    <ChildA />
    <ChildB class="margin-top30" />
  </div>
</template>

<style scoped lang="scss">
.margin-top30 {
  margin-top: 30px;
}
</style>
