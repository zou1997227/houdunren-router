import { defineStore } from "pinia";
import { ElMessage } from "element-plus";
export const useStore = defineStore("app", {
  state: () => {
    return {
      counter: 0,
      name: "邹佳铭",
      age: 26,
    };
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ["age"] }],
  },
  actions: {
    getAge() {
      this.age++;
      ElMessage({
        message: "修改成功", //提示的信息
        type: "success", //类型是成功
        //offset:225,　　//距离窗口顶部的偏移量，建议不设置
        duration: 3000, //显示时间, 毫秒。设为 0 则不会自动关闭，建议1200
      });
    },
  },
});
