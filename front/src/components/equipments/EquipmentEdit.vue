<script setup>
import $api from '@/server';
</script>
<template>
<div class="row">
  <div class="col-md-12 p-3">

    <div class="card">
      <div class="card-header d-flex align-items-center justify-content-between">
        <span>Редактировать оборудование</span>
          <div class="btn-place d-flex">
            <button class="btn btn-outline-primary me-2" type="button" v-on:click="saveItems">Сохранить</button>
            <button class="btn btn-outline-danger me-2" type="button" v-on:click="deleteItems">Удалить</button>
          </div>
      </div>
      <div class="card-body">
          <div class="card mb-3">
            <div class="card-body">
              <p>Создает регулярное выражение, согласно входной маске</p>
              <p>N – цифра  от 0 до 9</p>
              <p>A – прописная  буква латинского  алфавита</p>
              <p>a – строчная буква латинского  алфавита</p>
              <p>X – прописная  буква латинского  алфавита  либо цифра  от 0 до 9</p>
              <p>Z –символ  из списка: “-“, “_”, “@”.</p>
            </div>
          </div>

          <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{errorMessage}}
          </div>
          <div v-if="successMessage" class="alert alert-success" role="alert">
            {{successMessage}}
          </div>
          <div class="input-group flex-wrap mb-3">
            <label class="input-group-text" for="inputGroupSelect02">Тип оборудования</label>
            <select v-model="selectedTypeID" v-on:change="changeType" class="form-select" id="inputGroupSelect02">
              <option selected disabled :value="null">Выберите</option>
              <option v-for="types in equipmentTypes" :value="types.id" :key="types.id">{{types.name}}</option>
            </select>
          </div>

          <div class="input-group flex-nowrap  mb-3">
            <span class="input-group-text" id="addon-wrapping">Серийный номер маска {{this.serial_mask}}</span>
            <input type="text" class="form-control" 
              v-model="item.serial"
              placeholder="Серийный номер">
          </div>

          <div class="input-group flex-nowrap  mb-3">
            <span class="input-group-text" id="addon-wrapping">Примечание</span>
            <input v-model="item.note" type="text" class="form-control" placeholder="Примечание">
          </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        item: {},
        serial_mask: '',
        selectedTypeID: null,
        errorMessage: false,
        successMessage: false
      }
    },
    computed: {
      equipmentTypes() {
        return this.$store.state.equipment.equipmentTypes
      }
    },
    watch: {
      selectedTypeID() {
        this.item.equipment_id = this.selectedTypeID
      }
    },
    methods: {
      async fetchItem() {
        try {
          const res = await $api().get(`equipment/${this.$route.params.id}`)
          if(!res.data.data['id']) {
            this.$router.push('/')
          }
          this.item = res.data.data
          this.selectedTypeID = res.data.data.equipment_id
          this.serial_mask = res.data.data.equipment_type[0].serial_mask
        } catch(e) {
          console.log(e)
        }
      },
      async saveItems() {
        this.errorMessage = false
        this.successMessage = false
        try {
          const res = await $api().put(`equipment/${this.item.id}`,{
            id: this.item.id,
            equipment_type_id: this.item.equipment_id,
            serial: this.item.serial,
            note: this.item.note
          })
          if(res.data['error']) {
            this.errorMessage = res.data['error']
          }else {
            this.successMessage = res.data['success']
          }
        } catch(e) {
          console.log(e)
        }
      },
      async deleteItems() {
        try {
          await $api().delete(`equipment/${this.item.id}`)
          this.$router.push('/')
        } catch(e) {
          console.log(e)
        }
      },
    },
    created() {
      if(!this.$store.state.equipment.equipmentTypes.length) {
        this.$store.dispatch('fetchEquipmentTypes')
      }
      this.fetchItem()
    }
  }
</script>

<style lang="scss" scoped>

</style>