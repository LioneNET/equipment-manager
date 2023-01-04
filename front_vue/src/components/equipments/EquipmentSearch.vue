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
                <option v-for="item in equipmentTypeData.data" :value="item.id" :key="item.id">{{item.name}}</option>
              </select>
            </div>

            <div class="input-group mb-3">
              <label class="input-group-text" for="inputGroupSelect03">Тип поиска</label>
              <select v-model="searchType" class="form-select" id="inputGroupSelect03">
                <option value="serial">Серийный номер</option>
                <option value="note">Примечание</option>
                <option value="id">Код оборудования (ID)</option>
              </select>
            </div>

            <div class="input-group flex-nowrap  mb-3">
              <span class="input-group-text" id="addon-wrapping"><SearchIcon /></span>
              <input
                @input="({target}) => searchHandler(target.value)"
                type="text"
                class="form-control"
                placeholder="Поиск">
            </div>
          </div>

          <div class="search-items">
            <table v-if="equipmentData.data.length" class="table table-hover">
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
                <Equipment v-for="item in equipmentData.data" :key="item.id" v-bind:item="item" />
              </tbody>
            </table>
            <div v-else class="empty-data">
              <div class="alert alert-primary" role="alert">
                Нет данных
              </div>
            </div>
          </div>

          <div class="paginator">
            <Paginator v-if="isShowPagination" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {EQUIPMENT_MODULE} from '@/stores/const'
  import {mapActions, mapGetters} from 'vuex'
  import SearchIcon from '@/components/icons/SearchIcon.vue'
  import Equipment from './Equipment.vue'
  import Paginator from '../Paginator.vue'

  export default {
    name: 'EquipmentSearch',
    components: {
      SearchIcon,
      Equipment,
      Paginator
    },
    data() {
      return {
        searchType: 'serial',
        searchByequipmentType: '*',
        inputText: '',
        debounceTimer: null
      }
    },
    computed: {
      ...mapGetters({
        equipmentData: EQUIPMENT_MODULE.GET_EQUIPMENTS,
        equipmentTypeData: EQUIPMENT_MODULE.GET_EQUIPMENT_TYPES
      }),
      isShowPagination() {
        return this.equipmentData.meta.total > this.equipmentData.meta.per_page
      }
    },
    mounted() {
      this.initFormData()
    },
    methods: {
      ...mapActions({
        fetchEquipment: EQUIPMENT_MODULE.FETCH_EQUIPMENT_DATA,
        fetchEquipmentType: EQUIPMENT_MODULE.FETCH_EQUIPMENT_TYPE_DATA
      }),
      async initFormData() {
        await this.fetchEquipmentType()
        await this.fetchEquipment()
      },
      searchHandler(value) {
        clearTimeout(this.timerID)
        this.timerID = setTimeout(async () => {
          const query = {
            ...(this.searchByequipmentType !== '*' ? {equipment_id: this.searchByequipmentType} : {})
          }
          query[this.searchType] = value
          await this.fetchEquipment(query)
        }, 450)
      }
    },
  }
</script>

<style scoped>

</style>