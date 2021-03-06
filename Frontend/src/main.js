// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import vueRessource from 'vue-resource'


Vue.config.productionTip = true

Vue.use(router)


/* Set the VueRessource for XMLHttpRequest */
Vue.use(vueRessource)
Vue.http.options.root = '/'
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
Vue.http.headers.common['Access-Control-Allow-Headers'] = 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type'

/* Custom header that indicates that we want data and not the Frontend application */
Vue.http.interceptors.push((request, next) => {
  request.headers.set('oracular-lands-data', 'true');
})

/**
 * HTTP Interceptor : Removes the token from locastorage if the response status is 401 (invalid token)
 */
Vue.http.interceptors.push((request, next) => {
  next((response) => {
    if (response.status == 401) {
      authStore.dispatch(AUTH_LOGOUT)
    }
  })
})


/**
 * HTTP Interceptor : Adds the action 'after' that allows to call a function after the response is received
 */
Vue.http.interceptors.push((request, next) => {
  next((response) => {
    if (request.after) {
      request.after.call(this, response)
    }
  })
})

/**
 * Set the token if present in localstorage
 */
const token = localStorage.getItem('user-token')
if (token) {
  Vue.http.headers.common['Authorization'] = 'Bearer ' + token
}

/* Stores */
const authStore = require('./stores/authStore').default;

const App = require('./App').default
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: {App},

  template: '<App/>'
})
