<template>
  <el-card class="filter-card">
    <template #header>
      <div class="card-header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </template>
    <el-form ref="form" :model="form" label-width="40px" size='mini'>
      <el-form-item label="状态">
        <el-radio-group v-model="status">
          <!-- 
            el-radio 默认把 label 作为文本和选中之后的 value 值
           -->
          <el-radio :label="null">全部</el-radio>
          <!-- <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
          <el-radio :label="4">已删除</el-radio> -->
          <el-radio 
            v-for="(item, index) in articleStatus"
            :key="index+'status'"
            :label="item.status"
          >{{item.text}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道">
        <el-select v-model="channelId" placeholder="请选择文章频道">
          <!-- <el-option 
            label='全部'
            :value='undefined'
          ></el-option> -->
          <el-option 
            v-for="(channel, index) in channels"
            :key="'channel'+index"
            :label='channel.name'
            :value='channel.id'
          ></el-option>
        </el-select>
      </el-form-item>
      <el-row>
        <el-col :span="6">
          <el-form-item label="日期">
              <el-date-picker
                v-model="pubdate"
                type="daterange"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="YYYY-MM-DD"
                value-format='YYYY-MM-DD'
              >
              </el-date-picker>
          </el-form-item>
      </el-col>
      </el-row>
      <el-form-item>
        <!-- 
          button 按钮的 click 事件有个默认参数
          当你没有指定参数的时候，他会默认传递一个没有用的数据
         -->
        <el-button 
          type="primary"
          :disabled='loading' 
          @click="onSearch"
        >
          查询
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>根据筛选条件共查询到 <span style='color: red'>{{total_count}}</span> 条结果：</span>
      </div>
    </template>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      class='list-table'
      size='mini'
      v-loading='loading'
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column
        label="封面"
      >
        <template #default="scope">
          <el-image 
            class='article-cover'
            :src="scope.row.cover.images[0]"
            fit='cover'
            lazy
           >
            <template #error>
              <div class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </template>
          </el-image>
          <!-- <img
            class='article-cover'
            v-if="scope.row.cover.images[0]"
            :src='scope.row.cover.images[0]' atl='' 
          />
          <img
            class='article-cover'
            v-else
            src='./no-cover.jpg' atl='' 
          /> -->
          <!-- 
            下面这种情况是在运行期间动态改变处理的。
            而本地图片必须在发包的时候就存在
           -->
          <!-- <img
            class='article-cover'
            :src='scope.row.cover.images[0] || './no.jpg' atl='' 
          /> -->
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
      ></el-table-column>
      <el-table-column
        label="状态"
      >
        <template #default="scope">
          <el-tag 
            :type='articleStatus[scope.row.status].type'
          >
            {{ articleStatus[scope.row.status].text }}
          </el-tag>
          <!-- 
            当 articleStatus的status不是数字或者和数组index不是恰好相同时
            用外层循环，内层判断
          -->
          <!-- <span v-for="(item, index) in articleStatus" :key='index'>
            <el-tag 
              v-if="item.status === scope.row.status"
              :type='item.type'
            >{{ item.text }}</el-tag>
          </span> -->
          <!-- <el-tag v-if='scope.row.status===0' type="warning">草稿</el-tag>
          <el-tag v-else-if='scope.row.status===1' >待审核</el-tag>
          <el-tag v-else-if='scope.row.status===2' type="success">审核通过</el-tag>
          <el-tag v-else-if='scope.row.status===3' type="danger">审核失败</el-tag>
          <el-tag v-else-if='scope.row.status===4' type="info">已删除</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="发布时间"
      ></el-table-column>
      <el-table-column
        label="操作"
      >
        <template #default="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            circle
            @click="$router.push(`/publish?id=${scope.row.id}`)"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="handleDelete(scope.row.id)"
          ></el-button>
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
      :disabled='loading'
    />
  </el-card>
</template>

<script lang='ts'>
import { getArticleList, getArticleChannels, deleteSingleArticle } from '@/api/article'
export default {
  name: 'ArticleIndex',
  props: {},
  data() {
    return {
      total_count: '', // 总文章条数
      currentPage: 1, // 当前页
      pagesize: 10, // 每页数量
      status: null, // 所选文章状态
      channels: [], // 文章频道列表
      channelId: undefined, // 所选频道id
      pubdate: null, // 日期
      loading: false, // 是否加载
      form: {
        name: '',
        
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      tableData: [], // 文章列表
      articleStatus: [
        { status:0, text: '草稿', type: 'warning'},
        { status:1, text: '待审核', type: ''},
        { status:2, text: '审核通过', type: 'success'},
        { status:3, text: '审核失败', type: 'danger'},
        { status:4, text: '已删除', type: 'info'},
      ],
    }
  },
  components: {},
  computed: {},
  watch: {},
  created() {
    this.loadChannels()
    this.loadAriticles()
  },
  methods: {
    async loadAriticles () {
      this.loading = true
      // const { data:{ data: res} } = await getArticleList({
      const res = await getArticleList({
        page: this.currentPage,
        per_page: this.pagesize,
        status: this.status,
        channel_id: this.channelId,
        // pubdate?.[0] TS特殊写法，数组pubdate不是null就取后面的索引0，否则此处就为null
        begin_pubdate: this.pubdate?.[0],
        end_pubdate: this.pubdate?.[1]
      })
      this.loading = false
      // console.log(res)
      let result
      try{
        result = JSON.parse(res.data)
      }catch(err){
        result = res.data
      }
      this.total_count = result.data.total_count
      this.tableData = result.data.results
    },
    async loadChannels () {
      const res = await getArticleChannels()
      // console.log(res)
      if ( res.status === 200) {
        const { data:{channels}} = res.data
        channels.unshift({name:'全部',id:undefined})
        this.channels = channels
      }
    },
    onSearch() {
      // this.currentPage = 1; // 从第一页查询
      this.loadAriticles()
    },
    handleSizeChange(val: number) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val
      this.loadAriticles()
    },
    handleCurrentChange(val: number) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val
      this.loadAriticles()
    },
    handleDelete (id:any) {
      this.$confirm('确认删除吗?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await deleteSingleArticle(id.toString())
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.loadAriticles()
      }).catch((err) => {
        console.log(err)
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
.filter-card{
  margin-bottom: 30px;
}
.list-table{
  margin-bottom: 20px;
}
.article-cover{
  width: 60px;
  background-size: cover;
  .image-slot{
    font-size: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.el-row{
  ::deep(.el-col){
    .el-input__inner{
      width: unset;
    }
  }
}
</style>
