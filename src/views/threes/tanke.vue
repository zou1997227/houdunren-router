<script setup>
// 引入three.js
import { onMounted, ref } from "vue";
import * as Three from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
// 引入扩展库OrbitControls.js
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// 引入扩展库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Color } from "three";

let menu_item = ref(null);
let webgl = ref(null);
let camera= null
 let     scene= null
   let   renderer=null
     let mesh =null
  let controls =null
// function three() {}

function init() {
      let container = document.getElementById('container')
      camera = new Three.PerspectiveCamera(90, container.clientWidth / container.clientHeight, 0.1, 10000)
      renderer = new Three.WebGLRenderer({ antialias: true })
      camera.position.set(2, 2, 2) //会控制3d图初始展示的大小，0 0 0会很大很大
      scene = new Three.Scene()
    renderer.setClearColor(new Three.Color('#545454'))
      renderer.setSize(container.clientWidth, container.clientHeight)
      renderer.shadowMap.enabled = true

      container.appendChild(renderer.domElement)

      controls = new OrbitControls(camera, renderer.domElement)
      controls.target = new Three.Vector3(0, 0, 0)

      loadLight()
    load3D()
    }
function  load3D() {
      const loader = new GLTFLoader()
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('/draco/')
      dracoLoader.preload()
      loader.setDRACOLoader(dracoLoader)
 
      loader.load('/3D/challenger_ii.glb', (gltf) => {
        scene.add(gltf.scene)
        renderer.render(scene,camera)
      }, (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      }, (error) => {
        console.error(error)
      })
    }

 function    loadLight() {
      // 点光源
      // const point = new Three.PointLight(0xffffff)
      // point.position.set(4000, 4000, 4000) // 点光源位置
      // this.scene.add(point) // 点光源添加到场景中
      // 环境光
      const ambient = new Three.AmbientLight(0xFFFFFF)
      scene.add(ambient)
    }
  function  animate() {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
onMounted(() => {
 init()
    animate()
});
</script>

<template>
  <section>
    <section id="container"></section>
  </section>
</template>

<style scoped lang="scss">
 #container {
    width: 100%;
    height: calc(100vh - 84px);
  }
  </style>
