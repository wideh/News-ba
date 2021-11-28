<template>
  <!-- <div class='publish'>发布文章</div> -->
  <el-card class="filter-card">
    <template #header>
      <div class="card-header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-if="$route.query?.id" :to="{ path: '/article' }">内容管理</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </template>
    <el-form 
      ref="publishForm" 
      :model="article" 
      :rules="formRules"
      label-width="60px" 
      size='mini'
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <!-- <div ref='editor' class="content" :class="{contentBorber: !isHasContent}">{{article.content}}</div> -->
        <div ref='editor' class="content" :class="{contentBorber: !isHasContent}"></div>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="article.cover.type">
          <!-- 
            el-radio 默认把 label 作为文本和选中之后的 value 值
           -->
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <template v-if="article.cover.type > 0">
          <!-- 
            @update-cover="onUpdateCover",默认就传子组件传过来的参数，但是此处需要
            接收子组件传过来的图片地址，以及附带传index，所以需要写为：
            写法一：@update-cover="(url) => onUpdateCover(index, url)" 
            写法二：@update-cover="onUpdateCover(index, $event)"
           -->
           <!-- 
             :cover-image="article.cover.images[index]"
              @update-cover="onUpdateCover(index, $event)"
              改用v-model来写v-model:coverImage='article.cover.images[index]'
            -->
          <div style="display: flex; justify-content: flex-start;">
            <upload-cover 
              v-for="(cover, index) in article.cover.type" 
              :key="index"
              v-model:coverImage='article.cover.images[index]'
            />
          </div>
        </template>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="article.channel_id" placeholder="请选择文章频道">
          <el-option 
            v-for="(channel, index) in channels"
            :key="'channel'+index"
            :label='channel.name'
            :value='channel.id'
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <!-- 
          button 按钮的 click 事件有个默认参数
          当你没有指定参数的时候，他会默认传递一个没有用的数据
         -->
        <el-button 
          type="primary"
          :disabled='loading' 
          @click="onPublish()"
        >
          {{$route.query?.id ? '修改' : '发表'}}
        </el-button>
        <el-button
          @click="onPublish(true)"
        >
          存入草稿
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang='ts'>
import { getArticleChannels, addArticle, getArticleById, editArticle } from '@/api/article'
import { upLoadImage } from '@/api/image'
import WangEditor from 'wangeditor'
import { onMounted, onBeforeUnmount, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import uploadCover from './components/upload-cover.vue'
export default {
  name: 'PublishIndex',
  components: {uploadCover},
  setup(props) {
    // 路由带有请求参数，由于setup没有this,所有用useRoute来获取this.$route
    const route = useRoute()
    const router = useRouter()

    /**
     * 获取选择框的频道列表
     * 如果用普通选项式api可放在created阶段
     */
    const channels = ref([]) // select.option的频道列表
    const loadChannels = async () => {
        const res = await getArticleChannels()
        // console.log(res)
        if ( res.status === 200) {
          channels.value = res.data.data.channels
        }
    }
    // 这样写貌似不能在最外层用await
    loadChannels()

    /**
     * 表单提交内容
     */
    let article = reactive({
      title: '', // 文章标题
      content: '', // 文章内容
      cover: { // 文章封面
        type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
        images: [] as any// 图片地址
      },
      channel_id: undefined, // 频道ID
    })

    /**
     * 新建和修改文章是用的同一个组件，所以要有判断
     * 如果请求参数里有 id ,则请求展示的文章内容
     * 如果用普通选项式api可放在created阶段
     */ 
    const /* 加载修改文章的信息 */loadArticle = async (id:any) => {
      const res = await getArticleById(id)
      // console.log(res)
      let result
      // try{
      //   result = JSON.parse(res.data)
      // }catch(err){
        result = res.data
      // }
      if(res && res.status == '200') {
        const article1 = result.data
        // reactive对象不能用解构赋值，即不能{...article1} 也不能toRefs(article1)
        article.title = article1?.title
        instance.txt.html(article1?.content)
        article.cover = article1?.cover
        article.channel_id = article1?.channel_id
      }
    }
    if (route.query?.id) {
      loadArticle(route.query?.id)
    }

    /**
     * 表单验证
     */
    // 表单提交时，验证
    const publishForm = ref()
    const isHasContent = ref(true) // 用于控制编辑框边界变为红色样式
    const formRules = reactive({
      title: [
        {required: true, message: '请输入文章标题', trigger: 'blur'},
        { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
      ],
      // 内容为特殊输入框，需自定义验证规则
      content: [
        {
          validator (rule: any, value: any, callback: any) {
            // if (value === '<p></p>') {
            if (instance.txt.html() === '') {
              // 验证失败
              isHasContent.value = false
              callback(new Error('请输入文章内容'))
            } else {
              // 验证通过
              isHasContent.value = true
              callback()
            }
          }
        },
        // 为了显示星号表示必选，需加上，但message写为空字符串，让验证提示不显示
        {required: true, message: ''},
      ],
      channel_id: [
        { required: true, message: '请选择文章频道' }
      ]
    })

    /**
     * 编辑文章、发布文章和存入草稿
     * 对应选项式api的methods
     */
    function onPublish(draft:boolean = false) {
      // publishForm.value获取表单，validate表单验证
      publishForm.value.validate(async(valid:any) => {
        // 验证失败，停止提交表单
        if(!valid) {
          return
        }
        // 验证通过，提交表单
        /**步骤：
         * 1.找到数据接口
         * 2.封装请求方法
         * 3.请求提交表单
         * 4.处理响应结果
         */
        article.content = instance.txt.html()
        if(article.cover.type == 1 && article.cover.images.length> 1){
          article.cover.images = article.cover.images.splice(0,1)
        } else if(article.cover.type == 1 && article.cover.images.length< 1){
          ElMessage({
            showClose: true,
            message: `请传入图片`,
            type: 'error'
          })
          return
        } else if(article.cover.type == 3 && (article.cover.images.length< 3 || article.cover.images.includes(undefined))){
          ElMessage({
            showClose: true,
            message: `请传入3张图片`,
            type: 'error'
          })
          return
        } else if(article.cover.type <1){
          article.cover.images = []
        }
        // 判断是否是编辑文章
        if (route.query?.id) {
          const res1:any = await editArticle(route.query?.id, article, draft)
          // console.log(res1);
          // 1.修改状态提示，2.修改成功后返回到内容管理页面
          if(res1 && res1.status == '201') {
            ElMessage({
              showClose: true,
              message: `${draft? '存入草稿':'修改'}成功`,
              type: 'success'
            })
            router.push('/article')
          } else {
            ElMessage({
              showClose: true,
              message: `${draft? '存入草稿':'修改'}失败`,
              type: 'error'
            })
          }
        } else {
          const res = await addArticle(article, draft)
          console.log(res)
          ElMessage({
            showClose: true,
            message: `${draft? '存入草稿':'发布'}成功`,
            type: 'success'
          })
          router.push('/article')
        }
      })
    }

    /**
     * 富文本使用 
     * https://www.wangeditor.com/doc/
     * https://github.com/lin-xin/vue-manage-system/blob/master/src/views/Editor.vue
     */
    const editor = ref();
    let instance:any;
    onMounted(() => {
        instance = new WangEditor(editor.value);
        // 自定义上传功能
        // resultFiles 是 input 中选中的文件列表
        // insertImgFn 是获取图片 url 后，插入到编辑器的方法
        instance.config.customUploadImg = async function (resultFiles: any, insertImgFn:any) {
          const fd = new FormData()
          fd.append('image',resultFiles[0])
          const res = await upLoadImage(fd)
          if(res.data.message == 'OK'){
            // 上传图片，返回结果，将图片插入到编辑器中
            insertImgFn(res.data.data.url)
          }
        }
        instance.create();
    });
    // 销毁富文本
    onBeforeUnmount(() => {
        instance.destroy();
        instance = null;
    });
    // 接收子组件传过来的图片地址
    const onUpdateCover = (index: number, url: string) => {
      article.cover.images[index] = url
    }
    return {
      channels,
      article,
      publishForm,
      isHasContent,
      formRules,
      onPublish,
      editor,
      onUpdateCover
    }
  }
};
</script>
/**
* (script setup lang='ts') 必须在script的后边，且是一样的lang='ts'
*/
<style lang="less" scoped>
.filter-card{
  margin-bottom: 30px;
}
.content{
  border-radius: 5px; 
  overflow: hidden; 
  border: 1px solid #DCDFE6;
  &:hover{
    border-color: #C0C4CC;
  }
  &:focus{
    border-color: #409EFF
  }
}
.contentBorber{
  border-color: red !important;
}
</style>
