<template>

  <div class="">
    <storyArcs :id_user="id_user"></storyArcs>
    <div class="container">
      <router-link :to="{name: 'Gamemaster.StoryArcsNew'}" class="btn btn-primary"> Ajouter un arc Narratif</router-link>
    </div>


  </div>
    <!-- News jumbotron -->

</template>

<script>
  import storyArcs from './Story-arcs.vue'

  export default {
    components: {storyArcs},
    data() {
      return {
        id_user: JSON.parse(localStorage.getItem('user')).id_user,
        storyArcs: [],
        path: this.$http.options.root,
        message_success: '',
        message_alert:''
      }
    },
    mounted() {

    }
  }

</script>

