<template>
  <div class="container">

    <div class="col-12 ">
      <div class="tm-bg-primary-dark tm-block tm-block-taller">
        <h2 class="tm-block-title">Liste des utilisateurs</h2>

        <table class="table">
          <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">PSEUDO</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="u in tabUsers" :key="u.id_user">

            <th scope="row">{{ u.id_user }}</th>
            <td>{{ u.pseudo_user }}</td>

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
        tabUsers : []
      }
    },
    mounted() {
      this.$http.get('users/').then(response => {
        this.tabUsers = response.body

      }, response => {
        console.log(response)
      });
    }
  }
</script>


