<template>
  <div class="container">

    <div class="col-12 ">
      <div class="tm-bg-primary-dark tm-block tm-block-taller">
        <h2 class="tm-block-title">Liste des utilisateurs</h2>

        <table class="table table-center table-striped">
          <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">PSEUDO</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="u in tabUsers" :key="u.id_user">

            <th scope="row">
              <span class="tablespan">{{ u.id_user }}</span>

            </th>
            <td>
              <span class="tablespan">{{ u.pseudo_user }}</span>

            </td>
            <td>
              <router-link :to="'/users/'+u.id_user" class="btn btn-primary btn-table">

                <span>Voir le profil</span>

              </router-link>
              <router-link :to="'/users/'+u.id_user+'/story-arcs'" class="btn btn-secondary btn-table">
                <span>Arcs Narratifs</span>

              </router-link>

            </td>
          </tr>

          </tbody>
        </table>
      </div>
    </div>
  </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        tabUsers: []
      }
    },
    mounted() {
      this.$http.get('users/').then(response => {
        this.tabUsers = response.body

      }, response => {
        console.log(response)
      });
    },
    methods: {}
  }
</script>


