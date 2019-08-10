<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <img class="title-logo" src="src/assets/login/logo.png" alt="">
      <el-row>
        <el-col :span="12">
          <el-form-item prop="username">
          <span class="svg-container svg-container_login">
            <svg-icon icon-class="user" />
          </span>
          <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名：admin" />
        </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="password" style="float: right;">
            <span class="svg-container">
              <svg-icon icon-class="password"></svg-icon>
            </span>
            <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
              placeholder="密  码：admin"></el-input>
              <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
          </el-form-item>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
          <el-form-item class="el-submit">
            <el-button type="primary" style="" :loading="loading" @click.native.prevent="handleLogin">
              登录
            </el-button>
          </el-form-item>
        </el-col>
    </el-row>
    
      <!-- <div class="tips">
        <span style="margin-right:20px;">用户名: admin</span>
        <span> 密码: admin</span>
      </div> -->
    </el-form>

  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#fff;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-form-item__error {
    font-size: 14px;
    font-weight: bold;
  }
  .el-input {
    display: inline-block;
    height: 52px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 52px;
      font-size: 16px;
      color: #000000;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #000 !important;
      }
      &::-webkit-input-placeholder { /* WebKit browsers */
        color: #999;
        font-size: 16px;
      }
    }
  }
  
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#fff;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  background-image: url(/src/assets/login/login-bg.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;

  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;

  
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    // width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 220px auto;
    background: rgba(0, 153, 204, 0.7);
    border-radius: 20px;
    width: 700px;
    .el-form-item {
      // border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 5px;
      width: 260px;
      height: 52px;
      background: rgba(255, 255, 255, 0.7);
      &.el-submit {
        width: 100%;
        background-color: transparent;
        margin-top: 20px;
        button {
          width:164px;
          height:42px;
          display: block;
          margin: 0 auto;
          border-radius: 99em;
        }
      }
    }
    .title-logo {
      display: block;
      width: 556px;
      height: 108px;
      margin: 0 auto 25px;
    }
    .el-row {
      width: 556px;
      margin: 0 auto;
    }
  }
  .el-button--primary {
    color: #000;
    font-size: 16px;
    background: rgba(255, 255, 255, 0.7);
    border-color: transparent;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .svg-icon {
    vertical-align: -0.05em;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
