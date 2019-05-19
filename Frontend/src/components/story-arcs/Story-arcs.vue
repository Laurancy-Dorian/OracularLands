<template>

  <div class="">
      <div v-if="message" class="alert alert-dark" role="alert">
        {{message}}
      </div>
      <!-- News jumbotron -->
      <div v-for="st in storyArcs" class="div-alternate-background text-center p-1">

        <!-- Grid row -->
        <div class="row">

          <!-- Grid column -->
          <div class="col-md-4 offset-md-1 mx-3 my-3">

            <!-- Featured image -->
            <div class="view overlay">
              <img :src="path + st.image_story_arc" class="img-fluid img-jumbotron"
                   :alt="'Image de l\'arc narratif' + st.title_story_arc">
              <a>
                <div class="mask rgba-white-slight"></div>
              </a>
            </div>

          </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-md-7 text-md-left ml-3 mt-3">

            <!-- Excerpt -->
<!--            <a href="#!" class="green-text">
              <h6 class="h6 pb-1"><i class="fas fa-desktop pr-1"></i> Work</h6>
            </a>-->

            <h4 class="h4 mb-4">{{ st.title_story_arc }}</h4>

            <p class="font-weight-normal limit-text">{{ st.description_story_arc }}</p>
            <p class="font-weight-normal">De
              <router-link :to="'/users/' + st.id_user">{{ st.pseudo_user }}</router-link>
            </p>

            <router-link :to="'/story-arcs/' + st.id_story_arc" class="btn btn-primary">Voir la fiche de l'arc</router-link>
            <router-link :to="'/story-arcs/' + st.id_story_arc + '/sessions'" class="btn btn-secondary">Voir les sessions</router-link>

          </div>
          <!-- Grid column -->

        </div>
        <!-- Grid row -->

  </div>

  </div>
  <!-- News jumbotron -->

</template>

<script>
  export default {
    props: ['id_user'],
    data() {
      return {
        storyArcs: [],
        path: this.$http.options.root,
        message: ''
      }
    },
    mounted() {
      let idUser;
      if (!this.$route.params.id_user && this.id_user) {
        idUser = this.id_user
      } else if (this.$route.params.id_user) {
        idUser = this.$route.params.id_user
      }
      if (idUser) {
        this.$http.get('users/'+ this.$route.params.id_user +'/story-arcs/').then(response => {
          if (response.body.length >0) {
            this.storyArcs = response.body
          } else {
            this.message = "Aucun arc narratif"
          }


        }, response => {
          console.log(response)
        });
      } else {
        this.$http.get('story-arcs/').then(response => {
          this.storyArcs = response.body

        }, response => {
          this.message = "Il n'y a aucun arc"
        });
      }
    }
  }

</script>

