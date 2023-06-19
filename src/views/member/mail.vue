<script setup lang="ts">
import { getCurrentInstance, onMounted, provide, ref } from "vue";
import mail_view from "../../components/mail-view.vue";
// vue3中使用eventbus，订阅发布者
const instance = getCurrentInstance();
// 父组件使用发布者发送数据
const emits = () => {
  console.log("我发布了数据");

  instance?.proxy?.$Bus.emit("on-num", "我是父组件发布者");
};
instance?.proxy?.$Bus.emit("on-num", "我是父组件发布者");

let list = ref(["香蕉", "菠萝", "芒果"]);
let names = ref(["张", "赵", "王", "孙"]);
type values = { value: string | number };
const handleAdd = function (value: values) {
  list.value.push(value as any);
};

// ref传值
const childRefs = ref(null);
let refsData = ref(null);
// refsData.value = childRefs.value.lists;
// 通过ref拿到子组件的值或者方法赋值给父组件的某个变量时，
//一定要放在创建完成之后的生命周期函数中
// onMounted(() => {
//   refsData.value = childRefs.value.lists as [];
//   console.log(refsData.value, "refsdata");
// });

// 利用provide 依赖注入父组件传递数据给子组件，无论层级有多深
provide("arr", names.value);
</script>

<template>
  member/mail.vue
  <div @click="emits">我是父组件发布者</div>
  <mail_view ref="childRefs" :list="list" @add="handleAdd"></mail_view>
  <div class="mail" v-for="item in refsData" :key="item">
    {{ item }}
  </div>
</template>

<style scoped lang='scss'>
</style>
