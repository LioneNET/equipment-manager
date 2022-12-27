<template>
  <header>
    <div class="wrapper">
      <nav class="navbar navbar-light bg-light">
        <form class="container-fluid justify-content-end">
          <RouterLink to="/" class="btn btn-outline-primary me-2" type="button">
            Поиск
          </RouterLink>
          <RouterLink to="/equipment" class="btn btn-outline-primary me-2" type="button">
            Добавить
          </RouterLink>
          <button class="btn btn-outline-primary me-2" type="button" v-on:click="handleLogout">
            Выход
          </button>
        </form>
      </nav>
      <Alert />
    </div>
  </header>
</template>

<script>
import Alert from "./Alert.vue";
import {AUTH_MODULE} from '@/stores/const'
import {mapActions} from "vuex";
export default {
  name: "Header",
  components: {Alert},
  methods: {
    ...mapActions({
      fetchLogout: AUTH_MODULE.FETCH_LOGOUT,
    }),
    async handleLogout() {
      await this.fetchLogout()
      await this.$router.push('/login')
    }
  },
}
</script>

<style scoped>

</style>