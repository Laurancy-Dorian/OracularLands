<template>

  <div>
    <side-bar></side-bar>

    <router-view></router-view>

  </div>

</template>

<script>
  import sideBar from './sideBar.vue'
  export default {
    components: {sideBar}
  }

</script>


