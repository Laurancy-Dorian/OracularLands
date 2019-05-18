<template>
  <div id="app">
    <div v-if="loading" class="loading">Loading&#8230;</div>

    <div id="main" class="main">
      <Menu></Menu>
      <router-view @loading-on="startLoadingAnimation"  @loading-off="endLoadingAnimation"></router-view>
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
      loading: false
    }
  },
  methods: {
    startLoadingAnimation: function() {
      this.loading = true;
    },
    endLoadingAnimation: function() {
      this.loading = false;
    }
  }

}
</script>

