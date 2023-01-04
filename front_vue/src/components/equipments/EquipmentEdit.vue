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
          <div class="input-group flex-wrap mb-3">
            <label class="input-group-text" for="inputGroupSelect02">Тип оборудования</label>
            <select v-model="selectedTypeID" class="form-select" id="inputGroupSelect02">
              <option selected disabled :value="null">Выберите</option>
              <option v-for="types in equipmentTypes.data" :value="types.id" :key="types.id">{{types.name}}</option>
            </select>
          </div>

          <div class="input-group flex-nowrap  mb-3">
            <span class="input-group-text">Серийный номер маска {{this.serial_mask}}</span>
            <input type="text" class="form-control" 
              v-model="item.serial"
              placeholder="Серийный номер">
          </div>

          <div class="input-group flex-nowrap  mb-3">
            <span class="input-group-text">Примечание</span>
            <input v-model="item.note" type="text" class="form-control" placeholder="Примечание">
          </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  import {EQUIPMENT_MODULE, ALERT_MODULE} from '@/stores/const'
  export default {
    name: 'EquipmentEdit',
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
      ...mapGetters({
        equipmentData: EQUIPMENT_MODULE.GET_EQUIPMENT,
        equipmentPut: EQUIPMENT_MODULE.GET_PUT_EQUIPMENT_DATA,
        equipmentTypes: EQUIPMENT_MODULE.GET_EQUIPMENT_TYPES
      }),
    },
    methods: {
      ...mapActions({
        fetchEquipment: EQUIPMENT_MODULE.SHOW_EQUIPMENT_DATA,
        putEquipment: EQUIPMENT_MODULE.PUT_EQUIPMENT_DATA,
        deleteEquipment: EQUIPMENT_MODULE.DELETE_EQUIPMENT_DATA,
        fetchEquipmentTypes: EQUIPMENT_MODULE.FETCH_EQUIPMENT_TYPE_DATA,
        addAlert: ALERT_MODULE.ADD_ALERT,
      }),
      async initData() {
        await this.fetchEquipment(this.$route.params.id)
        await this.fetchEquipmentTypes()
        this.item = this.equipmentData.data
        this.selectedTypeID = this.equipmentData.data?.equipment_id
        this.serial_mask = this.equipmentData.data?.equipment_type[0]?.serial_mask
      },
      async saveItems() {
        const res = await this.putEquipment({
          id: this.item.id,
          data: {
            id: this.item.id,
            equipment_type_id: this.item.equipment_id,
            serial: this.item.serial,
            note: this.item.note
          }
        })
        if(res === true) {
          const key = Object.keys(this.equipmentPut)[0]
          const message = this.equipmentPut[key]
          this.addAlert({
            id: Date.now(),
            type: `alert-${key}`,
            message: message
          })
          await this.$router.push('/')
        }
      },
      async deleteItems() {
        await this.deleteEquipment(this.item.id)
        await this.$router.push('/')
      },
    },
    mounted() {
      this.initData()
    }
  }
</script>

<style lang="scss" scoped>

</style>