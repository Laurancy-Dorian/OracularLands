<template>
  <nav class="navbar navbar-expand-xl">
    <div class="container h-100">
      <router-link to="/" class="navbar-brand" >
        <h1 class="tm-site-title mb-0">Oracular &nbsp; Lands</h1>
      </router-link>

      <!-- Burger for burger menu -->
      <button class="navbar-toggler ml-auto mr-0" type="button" data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fa fa-bars tm-nav-icon"></i>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <ul class="navbar-nav mx-auto h-100">

          <!-- Sessions -->
          <li v-if="user_connected" class="nav-item">
            <router-link to="/sessions-playing" class="nav-link active" >
              <i class="fas fa-dice"></i>
              Sessions
            </router-link>
          </li>

          <!--Story Arcs-->
          <li class="nav-item">
            <router-link to="/story-arcs" class="nav-link">
              <i class="fas fa-book"></i>
              Arcs Narratifs
            </router-link>
          </li>

          <!--Users-->
          <li class="nav-item">
            <router-link to="/users" class="nav-link">
              <i class="fas fa-users"></i>
              Utilisateurs
            </router-link>
          </li>

          <!--GM Panel-->
          <li v-if="user_connected" class="nav-item dropdown">

            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
              <i class="fas fa-dice-d20"></i>
              <div>
                <span>Espace MJ</span>
                <i class="fas fa-angle-down"></i>
              </div>
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link v-bind:to="'/users/' + id_user + '/story-arcs'" class="dropdown-item" ><i class="fas fa-book"></i><span>Arcs Narratifs</span></router-link>
              <router-link v-bind:to="'/users/' + id_user + '/sessions'" class="dropdown-item"><i class="fas fa-dice"></i><span>Sessions</span></router-link>
              <router-link to="/folders" class="dropdown-item"><i class="fas fa-folder-open"></i><span>Documents</span></router-link>
            </div>
          </li>
        </ul>

        <!-- Profile -->
        <ul  class="navbar-nav mx-auto h-100">

          <li v-if="user_connected" class="nav-item dropdown" role="button" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
            <a class="nav-link dropdown-toggle" href="#">
              <i class="far fa-user"></i>
              <div>
                <span>{{ pseudo_user }}</span>
                <i class="fas fa-angle-down"></i>
              </div>

            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link to="/account" class="dropdown-item" ><i class="fa fa-cog"></i><span>Profil</span></router-link>
              <a class="dropdown-item" @click="signout"><i class="fas fa-sign-out-alt"></i><span>Déconnexion</span></a>
            </div>

          </li>

          <li v-show="!user_connected" class="nav-item">
            <router-link to="/auth" class="nav-link">
              <i class="far fa-user"></i>
              <span>Se connecter</span>
            </router-link>
          </li>

        </ul>


      </div>
    </div>
  </nav>

</template>

<script>
  import authStore from '../stores/authStore' // The auth store

  export default {
    data: function () {
      return {
        active: 0
      }
    },
    computed: {
      user_connected: function () {   // Allows to disable the login button if the fields aren't filled
        return authStore.getters.isAuthenticated
      },
      pseudo_user: function () {   // Allows to disable the login button if the fields aren't filled
        return JSON.parse(localStorage.getItem('user')).pseudo_user
      },
      id_user: function () {   // Allows to disable the login button if the fields aren't filled
        return JSON.parse(localStorage.getItem('user')).id_user
      },
    },
    methods: {
      signout: function () {
        authStore.dispatch('auth_logout').then(() => {
          this.$router.push('/')
        })

      }
    }
  }
</script>


