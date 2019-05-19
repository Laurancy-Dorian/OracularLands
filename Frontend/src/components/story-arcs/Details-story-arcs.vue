<template>
  <div class="container-fluid p-5" style="">


      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-12">
          <img :src="path + image_story_arc">
        </div>
        <div class="col-lg-8 col-md-6 col-sm-12">
          <h1 class="display-3"> {{ title_story_arc }}</h1>
          <p class="lead">{{ description_story_arc }}</p>

        </div>
      </div>

      <hr class="my-4">
      <h3>Sessions disponibles pour cet arc</h3>
      <table class="table" style="">
        <thead>
        <tr>
          <th>#</th>
          <th>Nombre de joueurs</th>
          <th>Status</th>
          <th>S'inscrire</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">1</th>
          <td>1 / 3</td>
          <td></td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>3 / 3</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>3 / 4</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        </tbody>
      </table>
    </div>

</template>

<script>
  export default {
    data() {
      return {
        id_story_arc: '',
        title_story_arc: '',
        description_story_arc: '',
        image_story_arc: '',
        id_user: '',
        path: this.$http.options.root,
        message: ''
      }
    },
    mounted() {

      this.$http.get('story-arcs/' + this.$route.params.id).then(response => {
        this.id_story_arc = response.body.id_story_arc
        this.title_story_arc = response.body.title_story_arc
        this.description_story_arc = response.body.description_story_arc
        this.image_story_arc = response.body.image_story_arc
        this.id_user = response.body.id_user

      }, response => {
        this.message = "Il n'y a aucun arc"
      });

    }
  }
</script>


