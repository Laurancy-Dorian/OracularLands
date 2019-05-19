<template>

  <div class="">
    <div class="row justify-content-md-center">
    <div v-if="message_alert" class="alert alert-danger" role="alert">
      {{ message_alert }}
    </div>
  </div>
    <div class="row justify-content-md-center">
      <div v-if="message_success" class="alert alert-success" role="alert">
        {{ message_success }}
      </div>
    </div>
    <!-- row -->
    <div class="row justify-content-md-center">
      <div class="tm-block-col col-lg-8 col-md-6 col-sm-12 tm-col-account-settings">
        <div class="tm-bg-primary-dark tm-block tm-block-settings">
          <h2 class="tm-block-title">Création d'un nouvel arc narratif</h2>

          <form class="tm-signup-form row" enctype="multipart/form-data">

            <!--Title-->
            <div class="form-group col-lg-6">
              <label for="title_story_arc">Titre de l'arc narratif</label>
              <input
                id="title_story_arc"
                name="title_story_arc"
                type="text"
                class="form-control validate"
                v-model:value="title_story_arc"

              />
            </div>

            <!--Image-->
            <div class="form-group col-lg-6">
              <label for="image_story_arc">Image</label>
              <div>
                <input type="file" id="image_story_arc" ref="image_story_arc" v-on:change="handleFileUpload()"/>
              </div>
            </div>

            <!--Description-->
            <div class="form-group col-12">
              <label for="description_story_arc">Description</label>
              <textarea
                id="description_story_arc"
                name="description_story_arc"
                type="text"
                class="form-control validate"
                v-model:value="description_story_arc"
              />
            </div>


            <div class="container">
              <div class="form-group col-12">
                <label class="tm-hide-sm">&nbsp;</label>
                <button
                  class="btn btn-primary btn-block text-uppercase"
                  @click.prevent="sendForm"
                  :disabled="send_disabled"
                >
                  Envoyer
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

    </div>
  </div>
  <!-- News jumbotron -->

</template>

<script>

  export default {
    data() {
      return {
        message_success: "",
        message_alert: "",
        description_story_arc: "",
        title_story_arc: "",
        image_story_arc: "",
      }
    },
    methods: {
      sendForm: function () {
          let formData = new FormData();
          let ok = 0;
          if (this.title_story_arc) {
            formData.append('title_story_arc', this.title_story_arc);
            ok ++ ;
          }
          if (this.description_story_arc) {
            formData.append('description_story_arc', this.description_story_arc)
            ok++
          }
          if ( this.image_story_arc) {
            formData.append('image_story_arc', this.image_story_arc);
          }

          this.$http.post('story-arcs',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          ).then(response=> {
            this.$router.push('/story-arcs/' + response.body.id_story_arc);
          }, response => {
            this.message_alert = response.body.errors[0].message
          })
      },

      handleFileUpload: function () {
        this.image_story_arc = this.$refs.image_story_arc.files[0]
      }
    },
    computed: {
      send_disabled: function () {   // Allows to disable the login button if the fields aren't filled
        return !this.title_story_arc
      }
    },
  }

</script>

