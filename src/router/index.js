import Vue from 'vue'
import Router from 'vue-router'
import { changeTitle } from '@/util'
import { routes } from './routes'


Vue.use(Router)

const router = new Router({
  mode:'history',
  routes
})

router.afterEach(route => {
  changeTitle(route.meta.title)
})

export default router
