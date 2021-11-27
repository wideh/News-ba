<template>
  <el-card class="filter-card">
    <template #header>
      <div class="card-header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </template>
    <el-row>
      <el-col :span="15">
        <el-form 
          ref="settingForm"
          :rules="formRules" 
          :model="userInfo" 
          label-width="80px" 
          size='mini'
        >
          <el-form-item label="编号">
            {{userInfo.id}}
          </el-form-item>
          <el-form-item label="手机">
            {{userInfo.mobile}}
          </el-form-item>
          <el-form-item label="媒体名称" prop="name">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体介绍" prop="intro">
            <el-input type="textarea" v-model="userInfo.intro"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <!-- 
              button 按钮的 click 事件有个默认参数
              当你没有指定参数的时候，他会默认传递一个没有用的数据
            -->
            <el-button 
              type="primary"
              :loading='saveLoading' 
              @click="onSave"
            >
              保存
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6" :offset="2">
        <!-- 
          触发input[type="file"]方式一：
          获取input元素后，函数触发其cilck()事件 
        -->
        <!-- <p @click="avatarInput.click()" style="cursor: pointer;">点击修改头像</p> -->
        <!-- 方式二：用label触发 -->
        <label for="avatarFile">
          <el-avatar 
            shape="square"
            :size="150" 
            fit="cover" 
            :src="userInfo.photo"
            style="cursor: pointer;"
          ></el-avatar>
          <p style="cursor: pointer">点击修改头像</p>
        </label>
        <input
          id="avatarFile" 
          type="file"
          ref="avatarInput"
          hidden
          @change="avatarFileChange"
        />
      </el-col>
    </el-row>
  </el-card>
  <el-dialog
    v-model="dialogVisible"
    title="修改头像"
    width="30%"
    @opened="dialogOpened"
    @close="dialogClose"
  >
    <div>
      <img
        ref="imgElement"
        style="max-width: 100%;display: block;height: 200px" 
        :src="previewImgUrl"
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button 
          type="primary" 
          :loading="confirmLoading"
          @click="onSaveAvatar"
        >
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang='ts'>
export default {
  name: 'settingsIndex'
}
</script>
<script setup lang="ts">
  import { getUserProfile, editUserProfile, updatePhoto } from "@/api/user.ts"
  // import globalBus from '@/utils/global-bus.ts'
  import { ElMessage } from 'element-plus'
  import 'cropperjs/dist/cropper.css';
  import Cropper from 'cropperjs';
  import { ref, reactive } from 'vue'
  import { useStore } from 'vuex'
  const store = useStore()
  /* 获取用户信息 */
  const userInfo = reactive({
    id: '',
    mobile: '',
    name: '',
    intro: '',
    email: '',
    photo: '',
  })
  const getUserInfo = async () => {
    const res = await getUserProfile()
    const userInfo1 = res.data.data
    userInfo.id = userInfo1.id
    userInfo.mobile = userInfo1.mobile
    userInfo.name = userInfo1.name
    userInfo.intro = userInfo1.intro
    userInfo.email = userInfo1.email
    userInfo.photo = userInfo1.photo
  }
  getUserInfo()
  /* 修改用户信息 */
  const saveLoading = ref(false) // 保存按钮是否禁用
  const onSave = () => {
    const data = {
      name: userInfo.name,
      intro: userInfo.intro,
      email: userInfo.email
    }
    // 提交时整体验证，如果不通过，则禁止请求
    settingForm.value.validate(async(valid: any) => {
      if (valid) {
        saveLoading.value = true
        try{
          const res = await editUserProfile(data)
          saveLoading.value = false
          if(res && res.status == '201') {
            getUserInfo()
            // globalBus.$emit('userName', userInfo.name)
            store.commit('updateUserInfo', {
              name: userInfo.name,
              photo: userInfo.photo
            })
          }
        } catch(err) {
          saveLoading.value = false
        }
      } else {
        return false
      }
  })
  }
  /**
   * 表单验证
   */
  const settingForm = ref()
  const formRules = reactive({
    name: [
      {required: true, message: '请输入媒体名称'},
      { min: 1, max: 7, message: '长度在 1 到 7 个字符'}
    ],
    intro: [
      { required: true, message: '请输入相关介绍内容' },
      { max: 60, message: '长度不超过 60 个字符'}
    ],
    email: [
      { required: true, message: '请输入邮箱' },
      { type: 'email', message: '请输入正确的邮箱格式'}
    ]
  })
  /**
   * 修改头像
   */
  const avatarInput = ref() // 获取input元素
  const imgElement = ref() // 获取img元素
  const dialogVisible = ref(false) // 弹出框显隐
  const previewImgUrl = ref('') // 预览图片地址
  const avatarFileChange = () => {
    // 得到输入的图片文件
    const files = avatarInput.value.files
    // console.log(files[0])
    // h5新增的api。URL.createObjectURL静态方法会创建一个 DOMString,其中包含一个表示参数中给出的对象的URL
    const blobData = window.URL.createObjectURL(files[0])
    // console.log(blobData)
    previewImgUrl.value = blobData
    dialogVisible.value = true
    // 解决接连两次选择相同图片不触发 change 事件问题
    avatarInput.value.value = ''
  }
  /* 等弹出框完全加载完，才创建裁切器 */
  const cropper = ref()
  const dialogOpened = () => {
    // 用法https://github.com/fengyuanchen/cropperjs
    // 一定要在img元素渲染出来，才能new Cropper
    // img必须是可见状态才能正常完成初始化，务必要在弹出框完全打开的状态去进行初始化。
    // 如果要预览图片发生变化更新裁切器：方式一replace,方式二destroy
    // 方式一
    if(cropper.value) {
      cropper.value.replace(previewImgUrl.value)
      return
    }
    cropper.value = new Cropper(imgElement.value, {
      aspectRatio: 1,
      viewMode: 1,
      dragMode: 'none',
      cropBoxResizable: false,
    })
  }
  // 方式二
  // const dialogClose = () => {
  //   // 关闭弹框，销毁裁切器
  //   cropper.value.destroy()
  // }
  const confirmLoading = ref(false)
  const onSaveAvatar = () => {
    cropper.value.getCroppedCanvas().toBlob(async(file:any) => {
      // console.log(file)
      confirmLoading.value = true
      const fd= new FormData()
      fd.append('photo', file)
      // 上传的图片文件不能过大，否则汇报403错误
      try{
        const res = await updatePhoto(fd)
        if(res && res.status == '201'){
          // 把服务端返回的图片进行展示有点慢
          // userInfo.photo = res.data.data.photo
          // 直接把裁切结果转为blob数据本地预览
          userInfo.photo = window.URL.createObjectURL(file)
          // globalBus.$emit('userPhoto', userInfo.photo)
          store.commit('updateUserInfo', {
            name: userInfo.name,
            photo: userInfo.photo
          })
          ElMessage({
            showClose: true,
            message: "修改头像成功",
            type: 'success'
          })
        }
      } catch(err) {
        // console.log(err)
        ElMessage({
          showClose: true,
          message: "修改头像失败，图片过大，请选择较小的图片",
          type: 'error'
        })
      }
      confirmLoading.value = false
      dialogVisible.value = false
    })
  }
</script>


<style>

</style>