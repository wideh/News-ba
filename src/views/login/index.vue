<template>
  <div class="login-container">
    <el-form
      :model="user"
      :rules="formRules"
      ref="login-form"
      class="login-form"
    >
      <div class="login-head"></div>
      <el-form-item prop="mobile">
        <el-input 
          v-model="user.mobile"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input 
          v-model="user.code"
          placeholder="请输入验证码"
        ></el-input>
      </el-form-item>
      <el-form-item prop='agree'>
        <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="!user.agree" :loading="loginLoading" class="login-btn" type="primary" @click="onLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts'>
import { login } from '@/api/user'

export default {
  // 指定 name 选项的好处是便于调试。
  // 有名字的组件有更有好的警告信息。
  // 另外，当有vue-devtools,未命名的组件会显示<anonymous>,不好辨认
  // 结论：给组件起名字是非常有意义的，尽量不要让组件重名。
  name: 'Login',
  data() {
    return {
      user: {
        mobile: "13911111111",
        code: "246810",
        agree: false, // 是否同意协议
      },
      loginLoading: false, // 登录的loading状态
      formRules: { // 表单验证规则配置
        mobile: [ // 要验证的数据名称：规则列表[] "blur"失去焦点时验证
          { required: true, message: "请输入手机号", trigger: "blur" },
          { pattern: /^1\d{10}$/, message: "请输入正确的号码格式", trigger: "change" },
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式' }
        ],
        // required: true验证的是是否有值，勾选用户协议本来就有选中状态的值，此处不能用这种验证
        // 需要自定义验证规则，validator: (rule, value, callback)
        agree: [
          { validator: (rule: any, value: any, callback: (arg0: Error|undefined) => void) => {
            if (value) {
              callback(undefined);
            } else {
              callback(new Error('请勾选同意用户协议'));
            } 
          },
            trigger: "change"
          },
        ],
      }
    };
  },
  methods: {
    onLogin () {
      // 获取表单数据（根据接口要求绑定数据）
      // const user = this.user
      // 表单验证
      // validate 方法是异步的
      this.$refs['login-form'].validate((valid: any) => {
        // 如果表单验证失败，停止请求提交
        if (!valid) {
          return
        }
        // 验证通过，请求登录
        this.login()
      })
    },

    async login () {
      // 开启登陆中 loading...
      this.loginLoading = true
      try{
        const res = await login(this.user)
        if (res) {
          console.log(res)
          // 登录成功
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          // 关闭 loading
          this.loginLoading = false

          // 将获得的用户token等信息存储在本地存储，方便应用
          window.localStorage.setItem('user', JSON.stringify(res.data.data))

          // 跳转到首页
          // this.$router.push('/')
          this.$router.push({
            name: 'home'
          })
        }
      } catch (err) { // 登录失败
        console.log('登录失败', err)
        this.$message.error('登录失败，手机号或验证码错误')
        // 关闭 loading
        this.loginLoading = false
      }
    },
    resetForm(user: any) {
      this.$refs['login-form'].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.login-container{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('./login_bg.jpg') no-repeat;
  background-size: cover;
  .login-form{
    background-color: #fff;
    padding: 10px 50px;
    min-width: 300px;
    .login-btn{
      width: 100%;
    }
    .login-head{
      height: 40px;
      width: 100%;
      margin: 10px 0;
      background: url('./logo_index.png') no-repeat;
      background-size: 50%;
      background-position: center;
    }
  }
}
</style>
