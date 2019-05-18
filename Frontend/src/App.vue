<template>
  <div id="app">

    <div id="main" class="main">
      <Menu></Menu>
      <router-view></router-view>
    </div>

    <footer id="footer" class="tm-footer row tm-mt-small">
      <div class="col-12 font-weight-light">
        <p class="text-center text-white mb-0 px-4 small">
        </p>
      </div>
    </footer>

  </div>
</template>

<script>
  import Menu from './components/Menu.vue'
export default {
  components: { Menu },
  name: 'App',
  data: function() {
    return {

    }
  }
}
</script>

<style src="./assets/css/bootstrap.min.css"></style>
<style src="./assets/css/fontawesome.min.css"></style>
<style src="./assets/css/oracularlands.css"></style>
