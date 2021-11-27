import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/',
    /*命名路由layout有一个默认子路由，这个名字没有意义，
    *正确的做法是：如果有默认子路由，就不要给父路由起名字了。
    name: 'layout', */
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '', // path为空，会作为默认为子路由渲染
        name: 'home',
        component: () => import('@/views/home/index.vue')
      },
      { /* 内容管理 */
        path: '/article', 
        name: 'article',
        component: () => import('@/views/article/index.vue')
      },
      { /* 发布文章 */
        path: '/publish',
        name: 'publish',
        component: () => import('@/views/publish/index.vue')
      },
      { /* 材料管理 */
        path: '/image',
        name: 'image',
        component: () => import('@/views/image/image.vue')
      },
      { /* 评论管理 */
        path: '/comment',
        name: 'comment',
        component: () => import('@/views/comment/comment.vue')
      },
      { /* 粉丝管理 */
        path: '/fans',
        name: 'fans',
        component: () => import('@/views/fans/fans.vue')
      },
      { /* 个人设置 */
        path: '/settings',
        name: 'settings',
        component: () => import('@/views/settings/settings.vue')
      }
    ]
  },
  { 
    path: '/jiu', 
    component: () => import('@/views/Home.vue')
  },
  { 
    path: '/china', 
    component: () => import('@/views/Echart.vue')
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 路由全局导航前置守卫：说白了所有页面的导航都会经过这里
// 守卫页面的导航的
// to:要去的路由
// from:来自哪里的路由信息
// next:放行的方法，允许通过
router.beforeEach((to, from, next) => {
  // ts报null不能赋值给string，用类型断言as any使其不报错
  const user = JSON.parse(window.localStorage.getItem('user') as any)
  // if (to.name !== 'login') {
  //   if (!user) {
  //     next({ name: 'login' })
  //   } else {
  //     next()
  //   }
  // }
  if (to.name !== 'login' && !user) {next({ name: 'login' })}
  else next()
  // 返回 false 以取消导航
  // return false
})
export default router
