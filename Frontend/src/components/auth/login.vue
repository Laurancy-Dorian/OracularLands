<template xmlns:v-model="http://www.w3.org/1999/xhtml">

  <div class="container">
    <div v-if="loading" class="loading">Loading&#8230;</div>
    <div class="row">

      <div class="col-12 mx-auto tm-login-col">
        <div class="tm-bg-primary-dark tm-block tm-block-h-auto">
          <div class="row mt-2">
            <div class="col-12">

              <form action="index.html" method="post" class="tm-login-form">
                <div class="form-group">
                  <label for="username">Username</label>
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
                  <label for="password">Password</label>
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
                          :disabled="!pseudo_user || !password_user"
                  >
                    Login
                  </button>

                </div>
                <button class="mt-5 btn btn-primary btn-block text-uppercase">
                  Forgot your password?
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        pseudo_user: '',
        password_user: '',
        loading: false
      }
    },
    monted() {
      this.$auth = this.ressource('auth',{},{}, {
        before: () => {
          this.loading = true;
        },
        after: () => {
          this.loading = false;
        }

      });
    },
    methods: {
      sendLogin (e) {
        const body = {
          pseudo_user: this.pseudo_user,
          password_user: this.password_user
        }
        this.$http.post('auth', body).then(response => {
          console.log(response)
        }).then (response => {
          console.log(response)
        })
      }

    },

  }
</script>


