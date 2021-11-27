<template>
  <div class="upload-image">
    <div class="preview" @click="state.centerDialogVisible=true">
      <i v-if="!coverImage" class="el-icon-plus avatar-uploader-icon"></i>
      <img v-else :src="coverImage" class="avatar">
    </div>
  </div>
  <!-- state.centerDialogVisible=true 用来创建和销毁弹出框
      不销毁，穿三组图片时，穿不了第二张和第三张
   -->
  <el-dialog
    v-if="state.centerDialogVisible"
    v-model="state.centerDialogVisible"
    title="请选择文章封面图片"
    append-to-body
  >
    <el-tabs type="border-card"  v-model="tabName">
      <el-tab-pane label="素材库" name='1'>
        <image-list 
          :isShowAdd="false" 
          :isShowAction="false"
          :isShowSelected="true" 
          ref="imgList"
        />
      </el-tab-pane>
      <el-tab-pane 
        label="上传图片" 
        name="2" 
        style="display: flex; justify-content: center; align-items: center"
      >
        <label for="uploadCover" class="upload-image" style="display: block">
          <input 
            id="uploadCover" 
            type='file'
            ref='coverRef' 
            hidden 
            @change="onUploadCoverChange"
          />
          <i v-if="previewImg == ''" class="el-icon-plus avatar-uploader-icon" ></i>
          <img v-else :src="previewImg" style="width: 178px; height: 178px"/>
        </label>
      </el-tab-pane>
    </el-tabs>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.centerDialogVisible = false">取消</el-button>
        <el-button 
          type="primary" 
          @click="handelUploadCover"
        >
          确认
        </el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang='ts'>
import { ref, toRefs, reactive } from 'vue'
import { upLoadImage } from '@/api/image'
import imageList from '../../image/components/image-list.vue'
import { ElMessage } from 'element-plus'
export default {
  name: 'uploadCover',
  props: ['coverImage'],
  emits: ["update:coverImage"],
  components: { imageList },
  setup(props, {emit}) {
    const state = reactive({
      centerDialogVisible: false,
    })
    const tabName = ref('1')
    const previewImg = ref('')
    const coverRef = ref()
    const onUploadCoverChange = (e:any) => {
      // console.log(e.target.files[0])
      const blobData = window.URL.createObjectURL(coverRef.value.files[0])
      previewImg.value = blobData
    }
    // 上传图片，关闭弹框，回显图片
    // const { coverImage } = toRefs(props)
    // const imgUrl = ref('')
    const handelUploadCover = async () => {
      // 是上传图片栏则执行上传图片接口
      if(tabName.value == '2') {
        const file = coverRef.value.files[0]
        if(file) {
          const fd = new FormData()
          fd.append('image', file)
          const res = await upLoadImage(fd)
          if(res.data.message == 'OK'){
            // 上传图片，返回结果，关闭图层
            state.centerDialogVisible = false
            // 加载回显图片, 已由父组件传过来的props值替代
            // imgUrl.value = res.data.data.url
            // 将图片地址传到父组件
            emit('update:coverImage', res.data.data.url)
          }
        }
      } else {
        /* 父组件可以直接访问子组件数据 */
        // this.$refs除了可以获取Dom元素外，还可以获取组件
        const sonComponent = imgList.value
        const selectedIndex = sonComponent.selectedIndex
        if(selectedIndex == null) {
          ElMessage({
            showClose: true,
            message: `请选择一张图片`,
            type: 'error'
          })
          return
        }
        state.centerDialogVisible = false
        emit('update:coverImage', sonComponent.images[selectedIndex].url)
      }
    }
    /* 父组件可以直接访问子组件数据 */
    const imgList = ref()
    return {
      state,
      tabName,
      previewImg,
      coverRef,
      onUploadCoverChange,
      // imgUrl,
      handelUploadCover,
      imgList,
    }
  }
}
</script>

<style scoped>
  .upload-image {
    width: 178px;
    height: 178px;
    margin-right:  10px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .preview{
    width: 178px;
    height: 178px;
  }

  /* .upload-image .el-upload:hover {
    border-color: #409eff;
  } */

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>