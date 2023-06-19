<script setup>
// 引入three.js
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
// 引入扩展库OrbitControls.js
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// 引入扩展库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Color } from "three";

const menu_item = ref(null);
const webgl = ref(null);
function three() {}

onMounted(() => {
  three();
});
</script>

<template>
  <div id="three" ref="menu_item">
    <div ref="webgl" id="webgl"></div>
  </div>
</template>

<style scoped lang='scss'>
</style>
