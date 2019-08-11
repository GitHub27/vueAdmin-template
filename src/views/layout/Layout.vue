<template>
  <div class="app-wrapper" :class="classObj">
    <div class="header-wrap">
      <img class="title-logo" src="~@/assets/login/logo2.png" alt="">
      <ul>
        <li class="user">
          <img src="~@/assets/login/user.png" alt=""><span>系统管理员</span>
        </li>
        <li style="background-color: #fa8564;">
          <el-tooltip class="item" effect="dark" content="密码管理" placement="bottom">
            <img src="~@/assets/login/password.svg" alt="">
          </el-tooltip>
        </li>
        <li style="background-color: #aec785;" @click="logout">
          <el-tooltip class="item" effect="dark" content="退出系统" placement="bottom">
            <img src="~@/assets/login/power.svg" alt="">
          </el-tooltip>
        </li>
        <li style="background-color: #22beef;">
          <el-tooltip class="item" effect="dark" content="下载" placement="bottom">
            <img src="~@/assets/login/download.svg" alt="">
          </el-tooltip>
        </li>
        <li style="background-color: #ffc100;">
          <el-tooltip class="item" effect="dark" content="系统说明" placement="bottom">
            <img src="~@/assets/login/what.svg" alt="">
          </el-tooltip>
        </li>
      </ul>
    </div>
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    .header-wrap {
      position: fixed;
      right: 0;
      left: 0;
      z-index: 1002;
      height: 77px;
      line-height: 77px;
      background-color: #4f5f6f;
      .title-logo {
        width: 237px;
        height: 37px;
        vertical-align: middle;
        margin-left: 10px;
      }
      
      ul {
        height: 77px;
        display: block;
        float: right;
        margin: 0;
        padding: 0;
        list-style-type:none;
        li {
          list-style-type:none;
          text-align: center;
          color: #fff;
          font-size: 18px;
          width: 70px;
          padding: 0;
          margin: 0;
          display: inline-balock;
          float: left;
          list-style: none;
          border-right: 1px solid #fff;
          &:hover {
            opacity: 0.9;
            cursor:pointer;
          }
          img {
            vertical-align: middle;
            width: 28px;
          }
          &.user {
            width: 177px;
            height: 77px;
            background-color: #2b3a40;
            img {
              width: 40px;
            }
          }
          
          span {
            margin-left: 8px;
            line-height: 1;
          }
        }
      }
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
