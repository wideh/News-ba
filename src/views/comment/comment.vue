<template>
  <el-card class="filter-card">
    <template #header>
      <div class="card-header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </template>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%;margin-bottom: 20px;"
      size='mini'
      v-loading='state.loading'
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column
        label="标题"
        prop="title"
        width="600px"
      >
      </el-table-column>
      <el-table-column
        prop="total_comment_count"
        label="总评论数"
      ></el-table-column>
      <el-table-column
        label="粉丝评论数"
        prop="fans_comment_count"
      >
      </el-table-column>
      <el-table-column
        label="状态"
        width="150px"
      >
        <template #default="scope">
          <el-tag 
            v-if="scope.row.comment_status"
            type='success'
          >
            正常
          </el-tag>
          <el-tag 
            v-else
            type='danger'
          >
            关闭
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="120px"
      >
        <template #default="scope">
          <el-switch 
            v-model="scope.row.comment_status" 
            active-color="#13ce66" 
            inactive-color="#ff4949"
            :disabled="scope.row.statusDisable"
            @change="onStatusChange(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="prev, pager, next, sizes"
      background
      :current-page='currentPage'
      :page-size='pagesize'
      :page-sizes='[10, 20, 30, 40, 50]'
      :total="total_count"
      :disabled='state.loading'
    />
  </el-card>
</template>

<script lang='ts'>
export default {
  name: 'commentIndex'
}
</script>
<script setup lang='ts'>
  import { getArticleList, updateCommentStatus } from '@/api/article'
  import { ref, reactive } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'
  const state = reactive({
    loading: false, // 加载状态
  })
  const currentPage = ref(1) // 当前页
  const pagesize = ref(10) // 每页数量
  const total_count = ref('') // 总数据数
  const tableData = ref([])
  /* 获取评论列表，和获取文章共用同一个接口，只是多了response_type */
  const getAriticles = async () => {
    state.loading = true;
    const res = await getArticleList({
      page: currentPage.value,
      per_page: pagesize.value,
      response_type: 'comment'
    })
    // console.log(res)
    state.loading = false;
    let result
    try{
      result = JSON.parse(res.data)
    }catch(err){
      result = res.data
    }
    const results = result.data.results
    results.forEach((item: any) => {
      item.statusDisable = false
    });
    total_count.value = result.data.total_count
    tableData.value = results
  }
  getAriticles()
  const handleSizeChange = (val: number) => {
    // console.log(`每页 ${val} 条`);
    pagesize.value = val
    getAriticles()
  }
  const handleCurrentChange = (val: number) => {
    // console.log(`当前页: ${val}`);
    currentPage.value = val
    getAriticles()
  }
  /* 改变评论状态 */
  const onStatusChange = (row: any) => {
    ElMessageBox.confirm(
      '是否同意改变评论状态?',
      '注意',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    ).then(async() => {
      row.statusDisable = true
      try{
        const res = await updateCommentStatus(row.id, row.comment_status)
        row.statusDisable = false
        ElMessage({
          type: 'success',
          message: '已成功修改评论状态',
        })
        // if(res && res.status == 201 && res.data.message == 'OK'){
          getAriticles()
        // }
      }catch(err){
        ElMessage({
          type: 'error',
          message: '修改评论状态失败',
        })
        row.statusDisable = false
        getAriticles()
      }
    }).catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消',
      })
    })
  }
</script>


<style lang='less'>

</style>