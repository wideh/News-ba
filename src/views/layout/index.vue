<template>
  <el-container class='layout-container'>
    <el-aside 
      class='aside'
      width="auto"
    >
      <app-aside class='aside-menu' :is-collapse='isCollapse' />
    </el-aside>
    <el-container>
      <el-header
        class='header'
      >
        <div style="font-size:20px">
          <i
            :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"
            @click="isCollapse = !isCollapse"
          ></i>
          <span>头条新闻后台管理平台</span>
        </div>
        <el-dropdown>
          <div class="avator-wrap">
            <img class='avator' :src='user.photo' />
            <span>{{user.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item 
                @click="$router.push({name: 'settings'})"
              >
                个人设置
              </el-dropdown-item>
              <!-- 
                组件默认是不识别原生事件的，除非内部做了处理 
              -->
              <el-dropdown-item @click="onLoginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main
        class='main'
      >
        <!-- 子路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang='ts'>
import AppAside from './components/aside.vue'
import { getUserProfile } from '@/api/user'
// import globalBus from '@/utils/global-bus.ts'
import { mapState, mapMutations } from 'vuex'
import { store } from "@/store/index"

export default {
  name: 'layoutIndex',
  components: { AppAside },
  props: {},
  data() {
    return {
      // user: {
      //   name: '',
      //   photo: ''
      // },
      isCollapse: false, // 侧边栏是否展开
    }
  },
  computed: {
     ...mapState(['user']),
    //  ...mapMutations(['updateUserInfo'])
  },
  watch: {},
  created() {
    // 请求获取用户资料
    this.loadUserProfile()
    // globalBus.$on('userPhoto', (data:any) => {
    //   this.user.photo = data
    // })
    // globalBus.$on('userName', (data:any) => {
    //   this.user.name = data
    // })
  },
  methods: {
    // 除了登录接口，其他接口都需要授权(提供身份令牌token)才能获取
    loadUserProfile () {
      getUserProfile().then((res:any)=> {
        // this.user=res.data.data
        store.commit('updateUserInfo', res.data.data)
        // this.$store('updateUserInfo', res.data.data)
      })
    },
    onLoginout () {
      this.$confirm('确认退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user')
        this.$router.push({
          name: 'login'
        })
        this.$message({
          type: 'success',
          message: '退出成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.layout-container{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.aside{
  background: #d3dce6;
  .aside-menu{
    height: 100%;
  }
}
.header{
  // background: #b3c0d1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .avator-wrap{
    display: flex;
    align-items: center;
    font-size: 16px;
    .avator{
      width: 30px;
      height: 30px;
      margin-right: 5px;
      border-radius: 50%;
    }
  }
}
.main{
  background: rgb(235, 229, 229);
  position: relative;
}
</style>

function updateUserInfo(data: any) {
  throw new Error('Function not implemented.');
}
