<template>
  <!--Main content-->
  <div class="container mt-5">

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
    <div v-if="show_form" class="row justify-content-md-center">
      <div class="tm-block-col col-lg-8 col-md-6 col-sm-12 tm-col-account-settings">
        <div class="tm-bg-primary-dark tm-block tm-block-settings">
          <h2 class="tm-block-title">Inscription</h2>

          <form class="tm-signup-form row">

            <div class="form-group col-lg-6">
              <label for="name">Pseudo</label>
              <input
                id="name"
                name="name"
                type="text"
                class="form-control validate"
                v-model:value="pseudo_user"
              />
            </div>
            <div class="form-group col-lg-6">
              <label for="name">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                class="form-control validate"
                v-model:value="email_user"
              />
            </div>
            <div class="form-group col-lg-6">
              <label for="password">Mot de passe</label>
              <input
                id="password"
                name="password"
                type="password"
                class="form-control validate"
                v-model:value="password"
              />
            </div>
            <div class="form-group col-lg-6">
              <label for="password2">Confirmer le mot de passe</label>
              <input
                id="password2"
                name="password2"
                type="password"
                class="form-control validate"
                v-model:value="password2"
              />
            </div>
            <div class="container">
              <div class="form-group col-12">
                <label class="tm-hide-sm">&nbsp;</label>
                <button
                  class="btn btn-primary btn-block text-uppercase"
                  @click.prevent="sendAdd"
                  :disabled="!data_confirmed"
                >
                  Inscription
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>


</template>

<script>
  export default {

    data() {
      return {
        id_user: "",
        pseudo_user: "",
        email_user: "",

        password: "",
        password2: "",

        message_alert: "",
        message_success: "",

        show_form:true
      }
    },
    computed: {
      data_confirmed: function () {   // Allows to disable the login button if the fields aren't filled
        return (this.password == this.password2 && this.pseudo_user && this.email_user && this.password)
      }
    },
    methods: {
      sendAdd: function () {
        let body = {}
        let nbattr = 0

        if (typeof this.pseudo_user !== 'undefined') {
          body.pseudo_user = this.pseudo_user
          nbattr++
        }
        if (typeof this.email_user !== 'undefined') {
          body.email_user = this.email_user
          nbattr++
        }
        if (typeof this.password !== 'undefined') {
          body.password_user = this.password
          nbattr++
        }

        if (nbattr == 3) {
          this.$http.post('users/', body).then(response => {
            this.message_success = "Vous vous êtes bien inscrit ! Vous pouvez vous connecter"
            this.message_alert = ""
            this.password = ""
            this.pseudo_user = ""
            this.email_user = ""
            this.password2 = ""
            this.show_form = false
          }, response => {
            if (response.status == 400) {
              this.message_alert = "Vos données ne sont pas correctes"
            } else if (response.status == 409) {
              this.message_alert = "Désolé, ce pseudo est déjà pris"
            }
          })
        }


      }
    }
  }
</script>


