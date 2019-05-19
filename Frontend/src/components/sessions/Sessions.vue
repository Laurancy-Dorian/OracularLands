<template>
  <div class="container-fluid p-5" style="">
    <h2>Vos sessions</h2>
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
          <button class="btn btn-secondary">
            Voir
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

  }
</script>
