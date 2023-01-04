<template>
  <div class="container">
    <main>
      <component :is="layout">
        <router-view/>
      </component>
    </main>
  </div>
</template>

<script>
import Terminator from "./views/Terminator.vue";
import MainPage from "./views/MainPage.vue";
export default {
  name: 'App',
  components: {
    Terminator,
    MainPage
  },
  computed: {
    layout() {
      return this.$route.meta.isAuth ? 'MainPage' : 'Terminator';
    }
  }
};
</script>


<style>
@import "@/assets/bootstrap/bootstrap.min.css";
@import "@/assets/base.css";
</style>
