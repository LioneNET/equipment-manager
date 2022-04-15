<script setup>
import { RouterView, RouterLink } from "vue-router";
</script>

<template>
  <div class="container">
    <header>
      <div v-if="isLogin" class="wrapper">
        <nav class="navbar navbar-light bg-light">
          <form class="container-fluid justify-content-end">
            <RouterLink to="/" class="btn btn-outline-primary me-2" type="button">
              Поиск
            </RouterLink>
            <RouterLink to="/equipment" class="btn btn-outline-primary me-2" type="button">
              Добавить
            </RouterLink>
            <button :disabled="isLoading" class="btn btn-outline-primary me-2" type="button" v-on:click="handleLogout">
              <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Выход
            </button>
          </form>
        </nav>
      </div>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script>
export default {
  created() {
    if (!this.$store.state.auth.status.loggedIn) {
      this.$router.push("/login");
    }
  },
  methods: {
    async handleLogout() {
      await this.$store.dispatch("logout");
      this.$router.push('/login')
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.auth.isLoading
    },
    isLogin() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
};
</script>


<style>
@import "@/assets/bootstrap/bootstrap.min.css";
@import "@/assets/base.css";
</style>
