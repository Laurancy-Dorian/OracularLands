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
    <div class="row tm-content-row">
      <div class="tm-block-col col-lg-4 col-md-6 col-sm-12 tm-col-avatar">
        <div class="tm-bg-primary-dark tm-block tm-block-avatar">
          <h2 class="tm-block-title">Avatar</h2>
          <div class="tm-avatar-container">
            <img src="" alt="Avatar" class="img-fluid mb-4"/>
            <a href="#" class="tm-avatar-delete-link">
              <i class="far fa-trash-alt tm-product-delete-icon"></i>
            </a>
          </div>
          <button class="btn btn-primary btn-block text-uppercase">
            Changer la photo
          </button>
        </div>
      </div>
      <div class="tm-block-col col-lg-8 col-md-6 col-sm-12 tm-col-account-settings">
        <div class="tm-bg-primary-dark tm-block tm-block-settings">
          <h2 class="tm-block-title">Paramètres du compte</h2>

          <form class="tm-signup-form row">
            <div class="form-group col-lg-6">
              <div>Pseudo</div>
              <div>{{ pseudo_user }}</div>
            </div>
            <div class="form-group col-lg-6">
              <diV>Email</diV>
              <div>
                {{ email_user }}
              </div>
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
                  @click.prevent="sendEdit"
                  :disabled="!password_confimed"
                >
                  Mettre à jour le profil
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row justify-content-end">
        <button class="btn btn-secondary text-uppercase">
          Supprimer votre compte
        </button>
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
        message_success: ""
      }
    },
    computed: {
      password_confimed: function () {   // Allows to disable the login button if the fields aren't filled
        return this.password == this.password2 && this.pseudo_user
      }
    },
    methods: {
      sendEdit: function () {
        let body = {}
        let nbattr = 0

        if (typeof this.pseudo_user !== 'undefined') {
          body.pseudo_user = this.pseudo_user
          nbattr++
        }
        if (typeof this.password !== 'undefined') {
          body.password_user = this.password
          nbattr++
        }

        if (nbattr > 0) {
          this.$http.patch('users/' + this.id_user, body).then(response => {
            this.message_success = "Vos données ont bien été mises à jour"
            this.message_alert = ""

            localStorage.setItem('user', JSON.stringify({
              id_user: this.id_user,
              pseudo_user: this.pseudo_user
            }));


          }, response => {
            console.log(response)
            if (response.status == 400) {
              this.message_alert = "Vos données ne sont pas correctes"
            } else if (response.status == 409) {
              this.message_alert = "Désolé, ce pseudo est déjà pris"
            }
            this.message_success = ""
          })
        }



      }
    },
    mounted() {
      const id_user = JSON.parse(localStorage.getItem('user')).id_user
      if (!id_user) {
        localStorage.removeItem('user-token') // clear your user's token from localstorage
        localStorage.removeItem('user') // clear your user's details from localstorage
        this.$router.push('auth')
      }
      this.$http.get('users/' + id_user).then(response => {
        this.id_user = response.body.id_user
        this.email_user = response.body.email_user
        this.pseudo_user = response.body.pseudo_user

      }, response => {
        console.log(response)
        localStorage.removeItem('user-token') // clear your user's token from localstorage
        localStorage.removeItem('user') // clear your user's details from localstorage
        this.$router.push('auth')
      });
    }
  }
</script>


