<template>
  <div style='padding-bottom: 20px; display: flex; justify-content: space-between'>
    <el-radio-group v-model="collect" @change="collectChange">
      <el-radio-button :label="false">全部</el-radio-button>
      <el-radio-button :label="true">收藏</el-radio-button>
    </el-radio-group>
    <el-button
      v-if="isShowAdd"
      size='mini'
      type='primary'
      @click="dialogUploadVisible = true"
    >
      上传图片
    </el-button>
  </div>
  <!-- 素材列表 -->
  <el-row :gutter="10" style="margin-bottom: 10px">
    <el-col 
      style="position: relative" :lg='4' :xs='12' :sm='6' 
      v-for="(img ,index) in images" 
      :key="'img'+index"
      @click="selectedIndex = index"
    >
      <el-image
        style="width: 100%; height: 100px"
        :src="img.url"
        fit='cover'
      >
      </el-image>
      <div class="selectedimg" v-if="isShowSelected && selectedIndex == index" />
      <div class="image-action" v-if="isShowAction">
        <el-button 
          type="warning" 
          :icon="img.is_collected ? 'el-icon-star-on': 'el-icon-star-off'" 
          size="small"
          circle
          @click="onCollctImage(img)"
          :loading="img.loading"
        >
        </el-button>
        <el-button 
          type="danger" 
          icon="el-icon-delete-solid"
          size="small" 
          circle
          @click="onDelete(img)"
        >
        </el-button>
      </div>
    </el-col>
  </el-row>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    layout="prev, pager, next, sizes"
    background
    :current-page='currentPage'
    :page-size='pagesize'
    :page-sizes='[10, 20, 30, 40, 50]'
    :total="total_count"
  />
  <!-- 上传成功后，再次点开，不展示文件列表，用v-if来销毁，动态的渲染 -->
  <el-dialog
    v-if="dialogUploadVisible"
    v-model="dialogUploadVisible"
    title="上传素材"
    width="30%"
    :append-to-body='true'
    destroy-on-close
    center
  >
  <!-- 
    上传组件，通过action地址自动上传文件到后端，不经过axios，所以action地址需全写
    请求头部headers需要设置权限，所以需要获取用户权限，
    请求体body的参数名称name也需要改为image
   -->
    <el-upload
      style="padding: 0 20px"
      drag
      action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
      :headers="{Authorization: `Bearer ${user.token}`}"
      name="image"
      multiple
      :on-success="uploadSuccess"
    >
      <i class="el-icon-upload"></i>
      <!-- <i
        style="font-size: 67px;
          color: var(--el-text-color-placeholder);
          margin: 40px 0 16px;
          line-height: 50px;"
      >
        <upload-filled />
      </i> -->
      <div class="el-upload__text">
        拖拽文件到这或者 <em>点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          只能上传jpg/png文件且大小不能超过500kb
        </div>
      </template>
    </el-upload>
  </el-dialog>
</template>

<script lang='ts'>
import { getImages, collectImages, deleteImages } from '@/api/image'
import { ref } from 'vue'
export default {
  name: 'ImageIndex',
  props: {
    isShowAdd: {
      type: Boolean,
      default: true
    },
    isShowAction: {
      type: Boolean,
      default: true
    },
    isShowSelected: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    /* 获取加载图片 */
    const images = ref([])
    const currentPage = ref(1) // 当前页
    const pagesize = ref(10) // 每页数量
    const total_count = ref('') // 总数据数
    const collect = ref(false) // 是否收藏
    const loadImages = async () => {
      const res = await getImages({
        page: currentPage.value,
        per_page: pagesize.value,
        collect: collect.value
      })
      const results = res.data.data.results
      // 每个图片前端手动加上loading，用于控制每个图片收藏按钮的加载状态
      results.forEach((img: any) => {
        img.loading = false
      });
      images.value = results
      total_count.value = res.data.data.total_count
    }
    loadImages()
    const handleSizeChange = (val: number) => {
      // console.log(`每页 ${val} 条`);
      pagesize.value = val
      loadImages()
    }
    const handleCurrentChange = (val: number) => {
      // console.log(`当前页: ${val}`);
      currentPage.value = val
      loadImages()
    }
    const collectChange = (val: any) => {
      collect.value = val;
      currentPage.value = 1; // 重新置一
      loadImages()
    }
    /* 弹出弹框和获取用户权限 */
    const dialogUploadVisible = ref(false)
    const user = ref(JSON.parse(window.localStorage.getItem('user') as string))
    const uploadSuccess = () => {
      dialogUploadVisible.value = false
      loadImages()
    }
    /* 收藏图片 */
    const onCollctImage = async (img: any) => {
      img.loading = true
      const res = await collectImages(img.id, !img.is_collected)
      img.loading = false
      if(res && res.status == 201 && res.data.message == 'OK'){
        loadImages()
      }
    }
    /* 删除图片 */
    const onDelete = async (img: any) => {
      await deleteImages(img.id)
      loadImages()
    }
    /* 选中图片处理 */
    const selectedIndex = ref(null)
    return {
      images,
      currentPage,
      pagesize,
      total_count,
      collect,
      handleSizeChange,
      handleCurrentChange,
      collectChange,
      dialogUploadVisible,
      user,
      uploadSuccess,
      onCollctImage,
      onDelete,
      selectedIndex,
    }
  }
}
</script>

<style>
.image-action{
  height: 40px;
  background: rgba(204, 204, 204, 0.5);
  position: absolute;
  left: 5px;
  right: 5px;
  bottom: 4px;
  font-size: 25px;
  color: #fff;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.selectedimg{
  background: url('./selected.png') no-repeat; 
  background-size: cover;
  width: 36px;
  height: 36px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -18px;
  margin-top: -18px;
}
</style>