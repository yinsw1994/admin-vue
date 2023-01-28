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

      <el-form
        ref="formRef"
        :model="form"
        label-width="80px"
        :rules="form_rules"
      >
        <el-form-item prop="username">
          <label class="form-label">用户名</label>
          <el-input v-model="username" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <label class="form-label">密码</label>
          <el-input type="password" v-model="password"></el-input>
        </el-form-item>
        <el-form-item v-if="current_menu == 'register'" prop="passwords">
          <label class="form-label">确认密码</label>
          <el-input type="password" v-model="passwords"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <label class="form-label">验证码</label>
          <el-row :gutter="10">
            <el-col :span="14">
              <el-input v-model="code"></el-input>
            </el-col>
            <el-col :span="10">
              <el-button
                type="success"
                class="el-button-block"
                :disabled="code_button_disabled || count_sixty != 0"
                @click="getCode"
              >
                {{ code_button_txt }}</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            :disabled="submit_button_disabled"
            @click="submit(formRef)"
            class="el-button-block"
          >
            {{ current_menu == "login" ? "登录" : "注册" }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  ref,
  onMounted,
  // watch,
  onBeforeUnmount,
  getCurrentInstance,
} from "vue";

import { GetCode /*ErrorHttp*/ } from "@/api/common";
import { Register } from "@/api/account";

import {
  validate_email,
  validate_password,
  validate_code,
} from "../../utils/validate";

export default {
  setup() {
    let { proxy } = getCurrentInstance();

    const data = reactive({
      tab_menu: [
        { type: "login", label: "登录" },
        { type: "register", label: "注册" },
      ],
      form_rules: {
        username: [
          { required: true, message: "用户名必填", trigger: "change" },
          {
            trigger: "blur",
            validator: (rlue, value, cb) => {
              if (validate_email(value)) {
                cb();
              } else {
                cb(new Error("用户名格式错误"));
              }
            },
            message: "用户名格式错误",
          },
        ],
        password: [
          { required: true, trigger: "change", message: "密码必填" },
          {
            trigger: "change",
            validator: (rlue, value, cb) => {
              if (validate_password(value)) {
                cb();
              } else {
                cb(new Error("密码格式错误"));
              }
            },
            message: "密码格式错误",
          },
        ],
        passwords: [
          { required: true, message: "确认密码必填", trigger: "change" },
          {
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (value !== form.password) {
                callback(new Error("两次密码不一致～"));
              } else {
                callback();
              }
            },
          },
        ],
        code: [
          { required: true, trigger: "change", message: "验证码必填" },
          {
            trigger: "change",
            validator: (rlue, value, cb) => {
              let reg_bool_code = validate_code(value);
              data.submit_button_disabled = !reg_bool_code;
              if (reg_bool_code) {
                cb();
              } else {
                cb(new Error("验证码格式错误"));
              }
            },
            message: "验证码格式错误",
          },
        ],
      },
      submit_button_disabled: true,
      code_button_timer: null,
    });

    onMounted(() => {
      setTimeout(() => {
        data.code_button_timer = 111;
      }, 1000);
    });

    // let code_button_time = ref(null);

    const form = reactive({
      username: "",
      password: "",
      passwords: "",
      code: "",
    });

    let current_menu = ref(data.tab_menu[0].type);

    const submit = async (form) => {
      await form.validate((valid, fileds) => {
        if (valid) {
          console.log("submit!");
          current_menu.value == "login" ? login() : register();
        } else {
          console.log("error submit!", fileds);
        }
      });
    };

    const login = () => {
      // const requestData = {
      //   username: form.username,
      //   password: form.password,
      //   code: form.code
      // }
    };
    const register = () => {
      console.log(`output->执行register`, "执行register");
      const requestData = {
        username: form.username,
        password: form.password,
        code: form.code,
      };

      // 调用注册接口
      Register(requestData).then((res) => {
        proxy.$message({
          type: "success",
          message: res.message,
        });
        reset();
      });
    };

    const reset = () => {
      Object.keys(form).forEach((it) => {
        form[it] = "";
      });
      data.submit_button_disabled = true;
      code_button_disabled.value = false;
      count_sixty.value = 0;
      code_button_txt.value = "获取验证码";
      first_click_code_button.value = true;
      current_menu.value = "login";
      data.code_button_timer = null;
    };

    const toggleMenu = (type) => {
      console.log(`output->type`, type);
      current_menu.value = type;
    };

    // 获取验证码
    const getCode = () => {
      const username = form.username;
      const password = form.password;
      const passwords = form.passwords;

      if (!validate_email(username)) {
        proxy.$message({
          message: "用户名不能为空 或 格式不正确",
          type: "error",
        });

        return false;
      }

      if (!validate_password(password)) {
        proxy.$message({
          message: "密码不能为空 或 格式不正确",
          type: "error",
        });
        return false;
      }

      if (current_menu.value == "register" && password !== passwords) {
        proxy.$message({
          message: "两次密码不一致",
          type: "error",
        });
        return false;
      }

      code_button_disabled.value = true;
      first_click_code_button.value = false;
      code_button_txt.value = "发送中";

      GetCode({
        // ErrorHttp({
        username: form.username,
        module: "register",
      })
        .then((response) => {
          const data1 = response.data;
          if (data1.resCode == 1024) {
            proxy.$message.error(data1.message);
            return;
          }
          proxy.$message({
            message: data1.message,
            type: "success",
          });

          count_sixty.value = 60;
          code_button_txt.value = `倒计时${count_sixty.value}秒`;
          function countDown() {
            count_sixty.value--;
            if (count_sixty.value <= 0) {
              count_sixty.value = 0;
              data.code_button_timer && clearTimeout(data.code_button_timer);
              code_button_txt.value = "再次获取";
            } else {
              code_button_txt.value = `倒计时${count_sixty.value}秒`;
              data.code_button_timer = setTimeout(countDown, 1000);
            }
          }
          countDown();
        })
        .catch(() => {})
        .finally(() => {
          code_button_disabled.value = false;
        });
    };

    const formRef = ref(null);

    let code_button_disabled = ref(false);

    let first_click_code_button = ref(true);

    let count_sixty = ref(0);

    let code_button_txt = ref("获取验证码");

    onBeforeUnmount(() => {
      data.code_button_timer = null;
    });

    return {
      formRef,
      current_menu,
      form,
      code_button_disabled,
      first_click_code_button,
      count_sixty,
      code_button_txt,
      ...toRefs(data),
      ...toRefs(form),
      toggleMenu,
      submit,
      getCode,
      register,
      login,
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
