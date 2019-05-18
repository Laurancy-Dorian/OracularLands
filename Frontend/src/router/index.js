import Vue from 'vue'
import Router from 'vue-router'
import authStore from '../stores/authStore' // The auth store

const ifNotAuthenticated = (to, from, next) => {
  if (!authStore.getters.isAuthenticated) {
    next()
    return
  } else {
    next('/account')
  }

}

const ifAuthenticated = (to, from, next) => {
  if (authStore.getters.isAuthenticated) {
    next()
    return
  } else {
    next('/auth')
  }
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: require ('../components/auth/register').default
    },
    {
      path: '/auth',
      name: 'Login',
      component: require ('../components/auth/login').default,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/users/new',
      name: 'Register',
      component: require ('../components/auth/register').default
    },
    {
      path: '/account',
      name: 'Account',
      component: require ('../components/auth/register').default,
      beforeEnter: ifAuthenticated
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
