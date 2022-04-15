<script setup>
import SearchIcon from '@/components/icons/SearchIcon.vue'
import Equipment from './Equipment.vue'
import Paginator from '../Paginator.vue'

</script>

<template>
  <div class="row">
    <div class="col-md-12 p-3">
      <div class="card">
        <div class="card-header">
          Поиск
        </div>
        <div class="card-body">
          <div class="search-form">
            <div class="input-group flex-wrap mb-3">
              <label class="input-group-text" for="inputGroupSelect02">Тип оборудования</label>
              <select v-model="searchByequipmentType" class="form-select" id="inputGroupSelect02">
                <option :value="'*'">Все</option>
                <option v-for="item in equipmentTypes" :value="item.id" :key="item.id">{{item.name}}</option>
              </select>
            </div>

            <div class="input-group mb-3">
              <label class="input-group-text" for="inputGroupSelect02">Тип поиска</label>
              <select v-model="searchType" class="form-select" id="inputGroupSelect02">
                <option value="serial">Серийный номер</option>
                <option value="note">Примечание</option>
                <option value="id">Код оборудования (ID)</option>
              </select>
            </div>

            <div class="input-group flex-nowrap  mb-3">
              <span class="input-group-text" id="addon-wrapping"><SearchIcon /></span>
              <input v-model="inputText" type="text" class="form-control" placeholder="Поиск" aria-label="Username" aria-describedby="addon-wrapping">
            </div>
          </div>

          <div class="search-items">
            <table v-if="equipmentItems.length" class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Тип</th>
                  <th scope="col">Серийный</th>
                  <th scope="col">Маска</th>
                  <th scope="col">Примечание</th>
                  <th scope="col">Изменить</th>
                </tr>
              </thead>
              <tbody>
                <Equipment v-for="item in equipmentItems" :key="item.id" v-bind:item="item" />
              </tbody>
            </table>
            <div v-else class="empty-data">
              <div class="alert alert-primary" role="alert">
                Нет данных
              </div>
            </div>
          </div>

          <div class="paginator">
            <Paginator v-if="paginatorReady" />
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
        searchType: 'serial',
        searchByequipmentType: '*',
        inputText: '',
        debounceTimer: null
      }
    },
    watch: {
      inputText(value) {

        if(this.debounceTimer) {
          clearTimeout(this.debounceTimer)
        }
        this.debounceTimer = setTimeout(() => {
          let query = ''
          if(value.trim().length >= 1) {
            query = {
              ...(this.searchByequipmentType !== '*' ? {equipment_id: this.searchByequipmentType} : {})
            }
            query[this.searchType] = value
          }
          this.$store.dispatch('fetchEquipments', query)
        },500)
      }
    },
    computed: {
      equipmentTypes() {
        return this.$store.state.equipment.equipmentTypes
      },
      equipmentItems() {
        return this.$store.state.equipment.equipments
      },
      paginatorReady() {
        return !!this.$store.state.equipment.equipmentsPagination
      }
    },
    created(){
      this.$store.dispatch('fetchEquipmentTypes', '')
      this.$store.dispatch('fetchEquipments', '')
    }
  }
</script>

<style scoped>

</style>