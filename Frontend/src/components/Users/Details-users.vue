<template>
  <!--Main content-->
  <div class="container mt-5">

    <div v-if="message" class="row justify-content-md-center">
      <div  class="alert alert-danger" role="alert">
        {{ message }}
      </div>
    </div>
    <!-- row -->
    <div v-else class="tm-block-col ">
      <div class="tm-bg-primary-dark tm-block">

        <h2 class="tm-block-title">{{ pseudo_user }}</h2>


        <div class="tm-avatar-container">
          <img src="" alt="Avatar" class="img-fluid mb-4"/>
        </div>

        <router-link :to="'/users/' + id_user + '/story-arcs'">
          <button class="btn btn-primary text-uppercase">
            Voir les Arcs Narratifs de cet utilisateur
          </button>
        </router-link>


      </div>
    </div>
  </div>


</template>

<script>
  export default {
    data: function () {
      return {
        pseudo_user: '',
        id_user: '',
        message:''
      }
    },
    mounted() {
      const id_user = this.$route.params.id
      if (id_user == JSON.parse(localStorage.getItem('user')).id_user) {
        this.$router.push('/account')
      } else {
        this.$http.get('users/' + id_user).then(response => {
          this.id_user = response.body.id_user
          this.pseudo_user = response.body.pseudo_user

        }, response => {
          this.message = `Cet utilisateur n'existe pas`
        });
      }

    }

  }
</script>


