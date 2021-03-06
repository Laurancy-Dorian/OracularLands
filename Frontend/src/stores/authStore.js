import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);




/**
 * Store for managing the authentification and session
 */

const state = {
  token: localStorage.getItem('user-token') || '',  // The session token
  status: ''
}

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
}

const actions = {
  auth_request: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => { // The Promise used for router redirect in login
      commit('AUTH_REQUEST')
      Vue.http.post('auth', user)
        .then(resp => {

          const token = resp.data.token
          localStorage.setItem('user-token', token) // store the token in localstorage
          localStorage.setItem('user', JSON.stringify(resp.data.user)) // store the token in localstorage
          Vue.http.headers.common['Authorization'] = 'Bearer ' + token

          commit('AUTH_SUCCESS', token)
          // you have your token, now log in your user :)
          //dispatch('USER_REQUEST')
          resolve(resp)
        })
        .catch(err => {
          commit('AUTH_ERROR', err)
          localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
          localStorage.removeItem('user') // clear your user's details from localstorage
          reject(err)
        })
    })
  },
  auth_logout: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit('AUTH_LOGOUT')
      localStorage.removeItem('user-token') // clear your user's token from localstorage
      localStorage.removeItem('user') // clear your user's details from localstorage
      delete Vue.http.headers.common['Authorization'];
      resolve()
    })
  }
}


// basic mutations, showing loading, success, error to reflect the api call status and the token when loaded
const mutations = {
  AUTH_REQUEST: (state) => {
    state.status = 'loading'
  },
  AUTH_SUCCESS: (state, token) => {
    state.status = 'success'
    state.token = token
  },
  AUTH_ERROR: (state) => {
    state.status = 'error'
  },
  AUTH_LOGOUT: (state, token) => {
    state.status = 'loggedout'
    state.token = null
  },
}


export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
