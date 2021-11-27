<template>
  <el-menu
    :uniqueOpened="true"
    :default-active="$route.path"
    class="nav-menu"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router="true"
    :collapse="isCollapse"
  >
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <template #title>首页</template>
    </el-menu-item>
    <el-menu-item index="/article">
      <i class="el-icon-document"></i>
      <template #title>内容管理</template>
    </el-menu-item>
    <el-menu-item index="/image">
      <i class="iconfont icon-image"></i>
      <template #title>材料管理</template>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="iconfont icon-publish"></i>
      <template #title>发布文章</template>
    </el-menu-item>
    <el-menu-item index="/comment">
      <i class="iconfont icon-pinglun"></i>
      <template #title>评论管理</template>
    </el-menu-item>
    <el-menu-item index="/fans">
      <i class="iconfont icon-ziyuan191"></i>
      <template #title>粉丝管理</template>
    </el-menu-item>
    <el-menu-item index="/settings">
      <i class="el-icon-setting"></i>
      <template #title>个人设置</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang='ts'>
export default {
  name: 'AppAside',
  props: ['isCollapse'],
  data() {
    return {
      defaultActive: '/'
    }
  },
  components: {},
  computed: {},
  watch: {
    // '$route.path':function(newVal:any,oldVal){
    //   this.defaultActive = newVal
    // }
  },
  created() {
    // this.defaultActive = this.$route.path
  },
  methods: {
    handleOpen(key: any, keyPath: any) {
      console.log(key, keyPath);
    },
    handleClose(key: any, keyPath: any) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less" scoped>
.nav-menu{
  // :not(.el-menu--collapse){
  //   width: 180px;
  // }
  .iconfont{
    margin-right: 10px;
    padding-left: 5px;
  }
}
.nav-menu:not(.el-menu--collapse) {
  width: 180px;
}
</style>
