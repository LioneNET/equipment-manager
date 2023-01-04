<template>
  <div class="card">
    <div class="card-body">
        <h5 class="card-title d-flex align-items-center justify-content-between">
          Новое оборудование
          <button class="btn btn-outline-primary me-2" type="button" v-on:click="removeItem">убрать</button>
        </h5>
        <div class="input-group flex-wrap mb-3">
          <label class="input-group-text" for="inputGroupSelect02">Тип оборудования</label>
          <select v-model="selectedTypeID" v-on:change="changeType" class="form-select" id="inputGroupSelect02">
            <option selected disabled :value="null">Выберите</option>
            <option v-for="types in equipmentTypes.data" :value="types.id" :key="types.id">{{types.name}}</option>
          </select>
        </div>

        <div class="input-group flex-nowrap  mb-3">
          <span class="input-group-text">Серийный номер {{selectedType && `маска: ${selectedType.serial_mask}`}}</span>
          <input type="text" class="form-control"
            :disabled="!selectedTypeID"
            v-model="equipmentSerial" 
            :class="maskInvalid && 'is-invalid'" 
            :placeholder="selectedType ? `Маска оборудования ${selectedType.serial_mask}` : 'Серийный номер'">
        </div>

        <div class="input-group flex-nowrap  mb-3">
          <span class="input-group-text">Примечание</span>
          <input v-model="equipmentNote" type="text" class="form-control" placeholder="Примечание">
        </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
  import {EQUIPMENT_MODULE} from '@/stores/const'
  export default {
    name: 'EquipmentFormItem',
    props: {
      item: Object
    },
    data() {
      return {
        equipmentSerial: '',
        equipmentNote: '',
        maskInvalid: false,
        selectedType: null,
        selectedTypeID: null
      }
    },
    computed: {
      ...mapGetters({
        equipmentTypes: EQUIPMENT_MODULE.GET_EQUIPMENT_TYPES
      }),
    },
    watch: {
      equipmentSerial() {
        this.maskInvalid = !this.equipmentSerial.match(this.selectedType.regexp.replaceAll('%', ''))
        this.$emit('changeItem', {...this.item, serial: this.equipmentSerial})
      },
      equipmentNote() {
        this.$emit('changeItem', {...this.item, note: this.equipmentNote})
      }
    },
    mounted() {
      this.initForm()
    },
    methods: {
      ...mapActions({
        fetchEquipmentTypes: EQUIPMENT_MODULE.FETCH_EQUIPMENT_TYPE_DATA
      }),
      async initForm() {
        if(!this.equipmentTypes.data.length) {
          await this.fetchEquipmentTypes()
        }
      },
      removeItem() {
        this.$emit('removeItem', this.item)
      },
      changeType() {
        this.$emit('changeItem', {...this.item, equipment_id: this.selectedTypeID})
        this.selectedType = this.equipmentTypes.data.find(i=>i.id === this.selectedTypeID)
      }
    }
  }
</script>

<style scoped>
.card {
  margin-bottom: 15px;
}
</style>