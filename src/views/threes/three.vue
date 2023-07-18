<script setup>
// 引入three.js
import { onMounted, ref } from "vue";
import * as three from "three";
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
function three() {
  // console.log(webgl.value, "webgl.value");
  // 创建3D场景对象Scene
  const scene = new THREE.Scene();
  scene.background = new Color("white");
  const stats = new Stats();
  webgl.value.appendChild(stats.dom);
  //创建一个长方体几何对象Geometry
  const geometry = new THREE.BoxGeometry(200, 100, 100);
  //创建一个材质对象Material
  const material = new THREE.MeshBasicMaterial({
    // color: 0xff0000, //0xff0000设置材质颜色为红色
    color: 0x0000ff, //设置材质颜色
    transparent: true, //开启透明
    // opacity: 0.6, //设置透明度
  });
  // 两个参数分别为几何体geometry、材质material
  const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh

  //设置网格模型在三维空间中的位置坐标，默认是坐标原点
  mesh.position.set(0, 0, 0);
  scene.add(mesh);
  // 定义相机输出画布的尺寸(单位:像素px)
  const width = 800; //宽度
  const height = 500; //高度
  // 实例化一个透视投影相机对象
  const camera = new THREE.PerspectiveCamera(60, width / height, 1, 3000);
  // const camera = new THREE.PerspectiveCamera();

  //相机在Three.js三维坐标系中的位置
  // 根据需要设置相机位置具体值
  camera.position.set(0, 200, 200);
  camera.lookAt(mesh.position); //指向mesh对应的位置

  //   camera.position.set(-1000, 0, 0);
  //   camera.lookAt(0, 0, 0);

  // // 长方体尺寸100, 100, 100
  // const geometry = new THREE.BoxGeometry( 100, 100, 100 );
  // const mesh = new THREE.Mesh(geometry,material);
  // 相机位置xyz坐标：0,10,0
  mesh.position.set(0, 10, 0);
  // 相机位置xyz坐标：200, 200, 200
  //   camera.position.set(200, 200, 200);

  // 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
  // const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
  // 创建渲染器对象
  const renderer = new THREE.WebGLRenderer();
  // 定义threejs输出画布的尺寸(单位:像素px)
  renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)
  renderer.render(scene, camera); //执行渲染操作
  menu_item.value.appendChild(renderer.domElement);
  webgl.value.appendChild(renderer.domElement);

  //   光照对材质的影响
  //   const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
  //   scene.add(pointLightHelper);
  //   pointLight.position.set(100, 60, 50);

  // 设置相机控件轨道控制器OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
  controls.addEventListener("change", function () {
    renderer.render(scene, camera); //执行渲染操作
  }); //监听鼠标、键盘事件
}

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
