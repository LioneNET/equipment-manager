<template>
  <div
      v-for="alert in alertData" :class="alert.type"
      class="alert d-flex justify-content-between"
      role="alert" :key="alert.id"
  >
    <span>{{ alert.message }}</span>
    <button type="button" class="btn-close" v-on:click="() => closeAlertHandler(alert)"></button>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {ALERT_MODULE} from '@/stores/const'

export default {
  name: "Alert",
  computed: {
    ...mapGetters({
      alertData: ALERT_MODULE.GET_ALERT,
    }),
  },
  methods: {
    ...mapActions({
      closeAlert: ALERT_MODULE.CLEAR_ALERT,
    }),
    closeAlertHandler(item) {
      this.closeAlert(item.id)
    }
  },
}
</script>

<style scoped>

</style>