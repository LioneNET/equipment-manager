<script setup>
import { RouterLink } from "vue-router";
</script>


<template>
  <tr>
    <th scope="row">{{item.id}}</th>
    <td>{{item.equipment_type[0].name}}</td>
    <td>{{item.serial}}</td>
    <td>{{item.equipment_type[0].serial_mask}}</td>
    <td>{{item.note}}</td>
    <td>
      <RouterLink :to="'/equipment/'+item.id">изменить</RouterLink>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    item: Object
  }
};
</script>

<style scoped>
</style>