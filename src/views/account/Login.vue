<template>
  <div id="login">
    <div class="form-wrap">
      <ul class="menu-tab">
        <li
          :class="{ current: current_menu === item.type }"
          v-for="item in tab_menu"
          @click="toggleMenu(item.type)"
          :key="item.type"
        >
          {{ item.label }}
        </li>
      </ul>

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item>
          <label class="form-label">用户名</label>
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <label class="form-label">密码</label>
          <el-input type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <label class="form-label">验证码</label>
          <el-row :gutter="10">
            <el-col :span="14">
              <el-input type="password"></el-input>
            </el-col>
            <el-col :span="10">
              <el-button type="success" class="el-button-block"
                >获取验证码</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submit" class="el-button-block"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref, onMounted } from "vue";

export default {
  setup() {
    const data = reactive({
      tab_menu: [
        { type: "login", label: "登录" },
        { type: "register", label: "注册" },
      ],
    });

    let current_menu = ref(data.tab_menu[0].type);

    const submit = () => {
      console.log(`output->进行提交了`, "进行提交了");
    };

    const toggleMenu = (type) => {
      console.log(`output->type`, type);
      current_menu.value = type;
    };

    const form = ref(null);

    onMounted(() => {
      console.log(`output->"form的值"`, "form的值", form.value);
    });

    return {
      ...toRefs(data),
      form,
      submit,
      current_menu,
      toggleMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background: #344a5f;
}

.form-wrap {
  width: 320px;
  padding-top: 100px;
  margin: auto;
}

.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    padding: 10px 24px;
    margin: 0 10px;
    color: #fff;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;
    &.current {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}

.form-label {
  display: block; // 转为块元素
  color: #fff; // 设置字体颜色
  font-size: 14px; // 设置字体大小
}
</style>
