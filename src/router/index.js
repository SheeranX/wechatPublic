import Vue from 'vue'
import Router from 'vue-router'

import index from '../components/index.vue'
import mine from '../components/personnel.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      component:index,
      name:'index'
    },
    {
      path:'/personnel.vue',
      component:mine,
      name:'mine',
    }
  ]
})
