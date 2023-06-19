<script setup lang="ts">
import { getCurrentInstance, inject, ref } from "vue";
const instance = getCurrentInstance();
//利用props传参，props可以使任何变量名
const props = defineProps({
  list: {
    type: Array,
    default: "",
  },
});

// emit传参
const emit = defineEmits(["add"]);
const handleSubmit = () => {
  emit("add", "香蕉");
};

// refs传参
const lists = ref(["zoujiam", "67j", "李四"]);
defineExpose({ lists });

// inject 注入父组件的依赖
const arr = inject("arr");

// 订阅者接受发布者数据
instance?.proxy?.$Bus.on("on-num", (num) => {
  console.log("接受发布者数据:", num);
});
</script>

<template>
  <div class="mail_view">
    <div @click="handleSubmit()">我是memberid的子组件</div>
    <!-- <div v-for="item in list" :key:Number="item">
      {{ item }}
    </div> -->
    <hr />
    <div v-for="item in arr" :key="item">
      {{ item }}
    </div>
  </div>
</template>

<style scoped lang='scss'>
</style>
