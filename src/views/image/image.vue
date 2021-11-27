<template>
  <el-card class="filter-card">
    <template #header>
      <div class="card-header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>材料管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </template>
    <imageList />
  </el-card>
</template>

<script lang='ts'>
import imageList from './components/image-list.vue'
export default {
  name: 'ImageIndex',
  components: { imageList }
}
</script>