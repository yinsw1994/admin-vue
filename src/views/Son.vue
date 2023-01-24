/* eslint-disable */
<template>
  <div class="son">
    <span>xxxxx</span>
    {{ xxx.name }}
    <div>1111{{ yyy }}</div>
    <div>222{{ zzz }}</div>

    <div>333 {{ baseValue }}</div>

    <div>444 {{ sonBaseValue }}</div>

    <div>555 {{ uuu }}</div>
  </div>
</template>
<script>
import { toRef, toRefs } from "vue";
// import { ref } from "vue";

import { isReactive, isRef } from "vue";

// import { toRefs } from "vue";

export default {
  name: "Son",
  components: {},
  props: ["titles", "baseValue"],

  setup(props) {
    console.log(
      "触发器",
      props.titles,
      props.baseValue,
      isReactive(props.titles),
      "props.baseValue",
      isRef(props.baseValue),
      isReactive(props.baseValue)
    );

    let { baseValue: sonBaseValue } = toRefs(props);

    let zzz = toRef(props, "baseValue");
    // console.log("zzz", zzz.value);
    // let { titles: ttt } = toRefs(props);

    // let tit = "xxx";

    // let sonTitle = ref("yyy");

    return {
      //   titles,
      xxx: props.titles,
      yyy: toRef(props, "baseValue"),
      zzz,
      sonBaseValue,
      uuu: props.baseValue,
    };
  },
};
</script>
