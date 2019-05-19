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
      path: '/auth',
      name: 'Login',
      component: require('../components/auth/login').default,
      props: true,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/users/new',
      name: 'Register',
      component: require('../components/auth/register').default,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/account',
      name: 'Account',
      component: require('../components/Users/Account').default,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/story-arcs',
      name: 'StoryArcs',
      component: require('../components/story-arcs/Story-arcs').default,
      alias: ''
    },
    {
      path: '/story-arcs/:id(\\d+)',
      name: 'StoryArcsDetails',
      component: require('../components/story-arcs/Details-story-arcs').default,
    },
    {
      path: '/users/:id_user(\\d+)/story-arcs',
      name: 'StoryArcsByUser',
      component: require('../components/story-arcs/Story-arcs').default,
    },
    {
      path: '/users',
      name: 'Users',
      component: require('../components/users/Users').default,
    },
    {
      path: '/users/:id(\\d+)',
      name: 'UsersDetails',
      component: require('../components/Users/Details-users').default,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/sessions-playing',
      name: 'SessionsPlaying',
      component: require('../components/sessions/Sessions').default,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/sessions',
      name: 'Sessions',
      component: require('../components/sessions/Sessions').default,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/folders',
      name: 'Folders',
      component: require('../components/folders/Folders').default,
      beforeEnter: ifAuthenticated
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
