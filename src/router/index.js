import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/index')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/main'),
    children: [
      {
        name: 'homeIndex',
        path: '',
        component: () => import('../components/homeIndex')
      },
      {
        name: 'homeAuthor',
        path: 'homeAuthor',
        component: () => import('../components/homeAuthor')
      },
      {
        path: 'homeData',
        component: () => import('../components/homeData')
      },
      {
        path: 'detUser',
        component: () => import('../components/detUser')
      },
      {
        path: 'detPerson',
        component: () => import('../components/detPerson')
      },
      {
        path: 'addUser',
        component: () => import('../components/addUser')
      },
      {
        path: 'addMsg',
        component: () => import('../components/addMsg')
      },
      {
        path: 'leaving',
        component: () => import('../components/leavingMsg')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
