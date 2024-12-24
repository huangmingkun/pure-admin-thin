<script setup lang="ts">
function People(name: string): void {
  this.name = name;
}
People.prototype.getName = function (): string {
  return `${this.name}，您好`;
};
// 1、创建一个空对象
// 2、将这个空对象的原型指向构造函数的原型
// 3、改变this指向
// 4、如果是引用类型，返回这个对象，否则返回创建的对象
function _new(fn: Function, ...args: any[]) {
  const obj = Object.create(fn.prototype);
  const result = fn.apply(obj, args);
  return typeof result === "object" ? result : obj;
}
// const person = new People("张三");
const person = _new(People, "张三");
console.log(person);
console.log(person.name);
console.log(person.getName());
</script>

<template>
  <div class="custom-new">实现new函数</div>
</template>

<style scoped lang="scss"></style>
