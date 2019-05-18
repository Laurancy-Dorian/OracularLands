import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/auth',
      name: 'Login',
      component: require ('../components/auth/login').default
    },
    {
      path: '/auth/new',
      name: 'Register',
      component: require ('../components/auth/register').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
