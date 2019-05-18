<template>
  <!--Main content-->
  <div class="container mt-5">
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
            Upload New Photo
          </button>
        </div>
      </div>
      <div class="tm-block-col col-lg-8 col-md-6 col-sm-12 tm-col-account-settings">
        <div class="tm-bg-primary-dark tm-block tm-block-settings">
          <h2 class="tm-block-title">Account Settings</h2>
          <form action="" class="tm-signup-form row">
            <div class="form-group col-lg-6">
              <label for="name">Account Name</label>
              <input
                id="name"
                name="name"
                type="text"
                class="form-control validate"
              />
            </div>
            <div class="form-group col-lg-6">
              <label for="email">Account Email</label>
              <input
                id="email"
                name="email"
                type="email"
                class="form-control validate"
              />
            </div>
            <div class="form-group col-lg-6">
              <label for="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                class="form-control validate"
              />
            </div>
            <div class="form-group col-lg-6">
              <label for="password2">Re-enter Password</label>
              <input
                id="password2"
                name="password2"
                type="password"
                class="form-control validate"
              />
            </div>
            <div class="container">
              <div class="form-group col-12">
                <label class="tm-hide-sm">&nbsp;</label>
                <button
                  type="submit"
                  class="btn btn-primary btn-block text-uppercase"
                >
                  Update Your Profile
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
          Delete Your Account
        </button>
      </div>
    </div>
  </div>


</template>

<script>
  export default {}
</script>


