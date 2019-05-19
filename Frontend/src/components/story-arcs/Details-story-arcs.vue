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
        <th></th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="s in sessions">
          <th scope="row">{{ s.id_session }}</th>
          <td>{{ s.nbr_players_session }}</td>
          <td>{{ s.status_session }}</td>
          <td>
            <button class="btn btn-primary">
              S'inscrire
            </button>

          </td>
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
        id_user: false,
        path: '',
        message: '',
        sessions: [
          {
            id_session : 1,
            status_session: "Annulé",
            nbr_players_session: "3"
          },
          {
            id_session : 2,
            status_session: "Terminé",
            nbr_players_session: "3"
          },
          {
            id_session : 3,
            status_session: "En cours",
            nbr_players_session: "4"
          },
          {
            id_session : 4,
            status_session: "Ouverte",
            nbr_players_session: "3"
          },
          {
            id_session : 5,
            status_session: "Annulé",
            nbr_players_session: "2"
          },

        ]
      }
    },
    methods: {
      sessionOuverte: function (statut) {
        return statut == 'Ouverte'
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


