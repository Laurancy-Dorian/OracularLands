<template xmlns:v-model="http://www.w3.org/1999/xhtml">
  <div id="auth" class="container">
    <div class="row justify-content-md-center">
      <div v-if="message_alert" class="alert alert-danger" role="alert">
        {{ message_alert }}
      </div>
    </div>

    <div class="row centered-screen">

      <div class="col-12 mx-auto tm-login-col">
        <div class="tm-bg-primary-dark tm-block tm-block-h-auto">
          <div class="row mt-2">
            <div class="col-12">

              <form @change="resetMessageAlert" method="post" class="text-center tm-login-form form-signin">
                <div class="form-group">
                  <label for="username">Pseudo</label>
                  <input
                    name="username"
                    type="text"
                    class="form-control validate"
                    id="username"
                    v-model:value="pseudo_user"
                    required
                  />
                </div>
                <div class="form-group mt-3">
                  <label for="password">Mot de passe</label>
                  <input
                    name="password"
                    type="password"
                    class="form-control validate"
                    id="password"
                    v-model:value="password_user"
                    required
                  />
                </div>
                <div class="form-group mt-4">
                  <button @click.prevent="sendLogin"
                          class="btn btn-primary btn-block text-uppercase"
                          :disabled="login_disabled"
                  >
                    Connexion
                  </button>

                </div>
                <button class="mt-5 btn btn-primary btn-block text-uppercase">
                  Mot de passe oublié ?
                </button>


              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 mx-auto tm-login-col">
        <a href="/users/new" class="mt-5 btn btn-primary btn-block text-uppercase">
          Inscription
        </a>
      </div>
    </div>
  </div>

</template>

<script>
  import authStore from '../../stores/authStore' // The auth store

  export default {
    data: function () {
      return {
        pseudo_user: '',
        password_user: '',
        loading: false,
        message_alert: ""
      }
    },
    computed: {
      login_disabled: function () {   // Allows to disable the login button if the fields aren't filled
        return !this.pseudo_user || !this.password_user
      }
    },
    mounted : function() {
      authStore.watch(() => {
        if (authStore.getters.authStatus == 'loading') {  // Displays an animation on loading
          this.$emit('loading-on')
        } else {
          this.$emit('loading-off')
        }
      })

    },
    methods: {
      /**
       * When the user sends the forms
       * Calls the store for auth and dispatch an auth_request
       * If success, redirect to /account
       * If error, displays the error
       */
      sendLogin: function () {
        const body = {
          pseudo_user: this.pseudo_user,
          password_user: this.password_user
        }

        // Login Success
        authStore.dispatch('auth_request', body).then(response => {
          this.$router.push('account')

        }, response => {
          // Login error
          if (response.body.errors[0].code == '40006') {
            this.message_alert = 'Pseudo invalide'
          } else if (response.body.errors[0].code == '40007') {
            this.message_alert = 'Mot de passe invalide'
          } else {
            this.message_alert = response.body.errors[0].message
          }
        })
      },
      /* Resets the message to blank */
      resetMessageAlert: function () {
        this.message_alert = ""
      }
    }
  }
</script>


