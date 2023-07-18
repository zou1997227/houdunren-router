<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from "vue";
import { useStore } from "@/store/index";

const { proxy } = getCurrentInstance();
const moment = proxy.$moment;
const dayjs = proxy.$dayjs;
console.log(dayjs, "dayjs");

// import { ElMessage } from "element-plus";
const user = useStore();
const size = ref<"default" | "large" | "small">("default");
const selectTime = ref(new Date());
// const disabledDate = (time: Date) => {
//   return time.getTime() > Date.now();
// };

/** 可选的最后日期，之后的日期、时间、分钟禁选 */
const disabledDateTime = new Date().getTime() - 24 * 3600000;
console.log(disabledDateTime, "disabledDateTime");

/** 禁选日期 */
const disabledDate = (time: Date) => {
  return time.getTime() < disabledDateTime;
};
/** 禁选小时：如果当前选择的日期和被禁选的日期为同一天，则进行小时的禁用 */
const disabledHour = () => {
  if (
    disabledDateTime &&
    dayjs(selectTime.value).format("YYYY-MM-DD") ==
      dayjs(Date.now()).format("YYYY-MM-DD")
  ) {
    return Array.from({ length: dayjs().hour() }, (v, i) => i).reverse();
  } else {
    return [];
  }
};

/** 禁选分钟：如果当前选择的日期和时间，和被禁选的日期和时间为同一天同一小时，则进行分钟的禁用 */
const disabledMinute = () => {
  if (
    disabledDateTime &&
    dayjs(selectTime.value).format("YYYY-MM-DD HH") ==
      dayjs(Date.now()).format("YYYY-MM-DD HH")
  ) {
    return Array.from({ length: dayjs().minute() }, (v, i) => i).reverse();
  } else {
    return [];
  }
};


// 拍照功能
const playVideo: any = ref(null);
const mediaPromise: any = ref(null);
const mediaStream: any = ref(null);
const img = ref("");

//利用解构，必须使用storeToRefs包裹，要不然失去响应性
let { name } = storeToRefs(user);
// name.value = "哈哈哈哈";
// name.value = "李四";
// 或者使用变量接受
// user.name = "王二小";
// name = user.name
// console.log(user.name, "user");

let data = ref([]);
const item = {
  date: "2016-05-02",
  name: "Tom",
  address: "No. 189, Grove St, Los Angeles",
};
const tableData = ref(Array.from({ length: 20 }).fill(item));
// onMounted(async () => {
//   data.value = await fetch("http://127.0.0.1:3002/data", {}).then(
//     (Response) => {
//       return Response.json();
//     }
//   );
//   // data = toRefs(arr)
// });
const stort = () => {
  name.value = "哈哈哈哈";
};
// console.log(ax);
const flag = ref(false);

// 调用actions属性
const action = () => {
  user.getAge();
};

function goThree() {
  proxy.$router.push("/tanke");
}

function getPhone() {
  const canvas = document.createElement("canvas");
  canvas.width = 300;
  canvas.height = 300;
  const ctx: any = canvas.getContext("2d");
  ctx.drawImage(playVideo.value, 0, 0, 300, 300);
  if (canvas.toDataURL()) {
    img.value = canvas.toDataURL();
  }
  // console.log(canvas.toDataURL(), "img");
}

function openMedia() {
  const constraints = {
    audio: false, // 音频轨道
    video: { width: 300, height: 300 }, // 视频轨道
  };
  try {
    mediaPromise.value =
      window.navigator.mediaDevices.getUserMedia(constraints);
    mediaPromise.value
      .then((stream: any) => {
        /* 使用这个stream stream */
        mediaStream.value = stream;
        playVideo.value.srcObject = stream;
        playVideo.value.play();
      })
      .catch((err: any) => {
        // MsgError('请确认摄像设备是否连接')
        // MsgError(err)
        console.log(err);
      });
  } catch (e) {
    // MsgError('请确认摄像设备是否连接')
    console.log(e);
  }
}
onMounted(() => {
  openMedia();
});
</script>

<template>
  <!-- 注意，按需导入之后，icon图标必须加上前缀i-ep-iconname或者IEpiconname -->
  <div class="app">
    <!-- transition动画组件 -->
    <div @click="stort">{{ name }}</div>
    <div>{{ user.age }}</div>
    <div @click="action">actions调用</div>
    <button @click="flag = !flag">切换</button>
    <transition name="why"><div v-if="flag" class="box"></div></transition>

    <el-date-picker
      width=""
      v-model="selectTime"
      type="datetime"
      placeholder="Pick a day"
      :disabled-date="disabledDate"
      :disabled-hours="disabledHour"
      :disabled-minutes="disabledMinute"
      :size="size"
    />
    <!-- <el-date-picker
        v-model="value3"
        type="datetime"
        placeholder="Select date and time"
        :default-time="defaultTime"
      /> -->

    <p class="fonts">10</p>
    <el-button type="success" @click="goThree">3D页面</el-button>


     <!-- 视屏截取图片区域 -->
    <video v-if="!img" ref="playVideo"></video>
    <img v-else :src="img" alt="" style="width: 300px; height: 300px" />

    <el-button type="success" @click="getPhone">拍照</el-button>
    <!-- <el-icon color="#409EFC" class="no-inherit">
      <i-ep-setting />
    </el-icon>
    <el-icon :size="20">
      <i-ep-edit />
    </el-icon>
    <el-icon><IEpChatDotRound /></el-icon>

    <el-container class="layout-container-demo" style="height: 500px">
      <el-aside width="200px">
        <el-scrollbar>
          <el-menu :default-openeds="['1', '3']">
            <el-sub-menu index="1">
              <template #title>
                <el-icon><i-ep-message /></el-icon>Navigator One
              </template>
              <el-menu-item-group>
                <template #title>Group 1</template>
                <el-menu-item index="1-1">Option 1</el-menu-item>
                <el-menu-item index="1-2">Option 2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Group 2">
                <el-menu-item index="1-3">Option 3</el-menu-item>
              </el-menu-item-group>
              <el-sub-menu index="1-4">
                <template #title>Option4</template>
                <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon><i-ep-menu /></el-icon>Navigator Two
              </template>
              <el-menu-item-group>
                <template #title>Group 1</template>
                <el-menu-item index="2-1">Option 1</el-menu-item>
                <el-menu-item index="2-2">Option 2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Group 2">
                <el-menu-item index="2-3">Option 3</el-menu-item>
              </el-menu-item-group>
              <el-sub-menu index="2-4">
                <template #title>Option 4</template>
                <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon><i-ep-setting /></el-icon>Navigator Three
              </template>
              <el-menu-item-group>
                <template #title>Group 1</template>
                <el-menu-item index="3-1">Option 1</el-menu-item>
                <el-menu-item index="3-2">Option 2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Group 2">
                <el-menu-item index="3-3">Option 3</el-menu-item>
              </el-menu-item-group>
              <el-sub-menu index="3-4">
                <template #title>Option 4</template>
                <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <div class="toolbar">
            <el-dropdown>
              <el-icon style="margin-right: 8px; margin-top: 1px"
                ><i-ep-setting
              /></el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>View</el-dropdown-item>
                  <el-dropdown-item>Add</el-dropdown-item>
                  <el-dropdown-item>Delete</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <span>Tom</span>
          </div>
        </el-header>

        <el-main>
          <el-scrollbar>
            <el-table :data="tableData">
              <el-table-column prop="date" label="Date" width="140" />
              <el-table-column prop="name" label="Name" width="120" />
              <el-table-column prop="address" label="Address" />
            </el-table>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container> -->
    <router-view />
  </div>
</template>

<style scoped lang="scss">
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
// 给过度组件绑定name，以name开头，name--enter-from,没有绑定name属性，就以v开头v-enter-from
// .fade-enter-from：用来定义被fade组件包裹的元素进入开始时的样式
// .fade-enter-to：用来定义被fade组件包裹的元素进入结束时的样式
// .fade-leave-from：用来定义被fade组件包裹的元素离开开始时的样式
// .fade-leave-to：用来定义被fade组件包裹的元素离开结束时的样式
// .fade-enter-active：用来定义被fade组件包裹的元素进入过渡时的样式
// .fade-leave-active：用来定义被fade组件包裹的元素离开过渡时的样式
.box {
  width: 100px;
  height: 100px;
  background: pink;
}
.why-enter-from,
.why-leave-to {
  opacity: 0;
}

.why-enter-active,
.why-leave-active {
  transition: opacity 1s ease;
}

.why-enter-active {
  animation: bounce 1s ease;
}

// .why-leave-active {
//   animation: bounce 1s ease reverse;
// }

@keyframes bounce {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}
.fonts {
  font-family: "digital-7regular";
}
</style>
