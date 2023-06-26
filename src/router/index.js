import { createRouter, createWebHistory } from 'vue-router'
import PageNotFound from '../views/error/PageNotFound.vue'
import Main from '../views/main/Main.vue'
import About from '../views/about/About.vue'
import AxiosTest from '../views/sample/AxiosTest.vue'
import UtilTest from '../views/sample/UtilTest.vue'
import AmChartTest from '../views/sample/AmChartTest.vue'
import BootstrapMain from '../views/sample/BootstrapMain.vue'
import BootstrapTest from '../views/sample/BootstrapTest.vue'
import BootstrapTableTest from '../views/sample/BootstrapTableTest.vue'
import SmapTest from '../views/sample/SmapTest.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/main'},
    { path: '/notfound', component: PageNotFound},
    { path: '/:catchAll(.*)', redirect: '/notfound' },
    {
      path: '/main',
      name: 'main',
      component: Main,
      meta: {
        name: '메인 페이지'
      }
    },
    {
      path: '/about',
      name: 'about',      
      component: About,
      meta: {
        name: 'About 페이지'
      }
    },
    {
      path: '/test1',
      name: 'test1',      
      component: AxiosTest,
      meta: {
        name: 'Axios Test'
      }
    },
    {
      path: '/test2',
      name: 'test2',      
      component: UtilTest,
      meta: {
        name: 'Util Test'
      }
    },
    {
      path: '/test3',
      name: 'test3',      
      component: AmChartTest,
      meta: {
        name: 'amChart Test'
      }
    },
    {
      path: '/test4',
      name: 'test4',    
      component: BootstrapMain,
      children: [{
        path: '/test4/sample',
        name: 'test4-sample',      
        component: BootstrapTest,
        meta: {
          name: 'Bootstrap Sample Test'
        },

      },{
        path: '/test4/table',
        name: 'test4-table',      
        component: BootstrapTableTest,
        meta: {
          name: 'Bootstrap Table Test'
        },

      }]
    },
    {
      path: '/test5',
      name: 'test5',      
      component: SmapTest,
      meta: {
        name: 'S-Map Test'
      }
    }
  ]
})

console.log(router)

router.beforeEach((to, from, next) => {
  // console.log('to', to)
  // console.log('from', from)
  // console.log('next', next)
  
  beforeCheck(to, from, next)
})

const beforeCheck = (to, from, next) => {
  // 로그인 체크

  next();
}


export default router
