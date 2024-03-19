<script setup lang="ts">
import type { Directive, DirectiveBinding } from "vue";
// globEager：静态直接加  glob：载懒加载
const imgObj: Record<string, { default: string }> = import.meta.globEager(
  "@/assets/img/lazy-img/*.*"
);
// console.log("imgObj", imgObj);
const imgSrcList = Object.values(imgObj).map(item => item.default);
// console.log("imgSrcList", imgSrcList);
const vLazy: Directive = (el: HTMLImageElement, binding: DirectiveBinding) => {
  el.src = "../../src/assets/img/default.png";
  // 监听当前元素的可视区域
  const interInstance = new IntersectionObserver(entries => {
    console.log("entries", entries);
    // 判断当前元素是否在可视区域内， 如果不在，则不进行任何操作
    // intersectionRatio：当前元素在可视区域的比例，如果小于等于0，则表示当前元素完全不可见
    if (entries[0].intersectionRatio <= 0) return;
    // 进行图片懒加载操作
    setTimeout(() => {
      el.src = binding.value;
      // 设置src后，停止监听当前元素，防止重复加载
      interInstance.unobserve(el);
    }, 1000);
  });
  // 开始监听当前元素
  interInstance.observe(el);
};
</script>

<template>
  <div class="img-wrap">
    <!-- v-lazy：懒加载指令 -->
    <img
      class="img-class"
      width="360"
      height="500"
      v-for="(item, idx) in imgSrcList"
      src="#"
      v-lazy="item"
      :key="idx"
      alt="图片"
    />
  </div>
</template>

<style scoped lang="scss">
.img-wrap {
  .img-class {
    margin-bottom: 3px;
    transition: opacity 10s linear;
  }
}
</style>
