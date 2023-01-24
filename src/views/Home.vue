/* eslint-disable */
<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <el-button @click="changeTitle">DDDI am ElButton</el-button>
    <!-- {{ title }} -->
    {{ baseValue }}
    <Son :titles="title" :baseValue="baseValue"></Son>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { reactive, ref, isRef } from "vue";
import Son from "./Son.vue";

export default {
  name: "Home",
  components: {
    // HelloWorld,
    Son,
  },
  setup() {
    // let title = ref("你好");

    let title = reactive({
      name: "不好玩",
    });

    let baseValue = ref("你好");

    console.log("baseValue is Ref??: =>", isRef(baseValue));

    const changeTitle = () => {
      title.name = "好玩";
      // console.log("title", title.value);
      baseValue.value = "你不好";
    };

    return {
      title,
      changeTitle,
      baseValue,
    };
  },
};
</script>
