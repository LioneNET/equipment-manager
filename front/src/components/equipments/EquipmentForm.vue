<template>
  <div class="row">
    <div class="col-md-12 p-3">
      <div class="card">
        <div class="card-header align-items-center d-flex justify-content-between">
          <span>Добавить оборудование</span>
          <div class="btn-place d-flex">
            <button :disabled="!newItems.length" class="btn btn-outline-primary me-2" type="button"
                    v-on:click="saveNewItems">Сохранить
            </button>
            <button class="btn btn-outline-primary me-2" type="button" v-on:click="appendNewItem">Добавить</button>
          </div>
        </div>
        <div class="card-body item-overflow">

          <div class="card mb-3">
            <div class="card-body">
              <p class="mb-0">Создает регулярное выражение, согласно входной маске</p>
              <p class="mb-0">N – цифра от 0 до 9</p>
              <p class="mb-0">A – прописная буква латинского алфавита</p>
              <p class="mb-0">a – строчная буква латинского алфавита</p>
              <p class="mb-0">X – прописная буква латинского алфавита либо цифра от 0 до 9</p>
              <p class="mb-0">Z –символ из списка: “-“, “_”, “@”.</p>
            </div>
          </div>

          <EquipmentFromItem
              v-for="item in newItems"
              v-bind:item="item" :key="item.index"
              @change-item="changeItem"
              @remove-item="removeItem"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EquipmentFromItem from './EquipmentFormItem.vue'
import {mapActions} from "vuex";
import {EQUIPMENT_MODULE} from '@/stores/const'

export default {
  name: 'EquipmentForm',
  components: {EquipmentFromItem},
  data() {
    return {
      newItems: [],
    }
  },
  methods: {
    ...mapActions({
      postEquipments: EQUIPMENT_MODULE.POST_EQUIPMENT_DATA
    }),
    appendNewItem() {
      this.newItems.push({
        index: Date.now(),
        equipment_id: null,
        serial: null,
        note: ''
      })
    },
    removeItem(item) {
      this.newItems = [...this.newItems.filter(searchItem => searchItem.index !== item.index)]
    },
    changeItem(item) {
      this.newItems = [...this.newItems.map(searchItem => searchItem.index === item.index ? item : searchItem)]
    },
    async saveNewItems() {
      const res = await this.postEquipments({
        equipments: this.newItems.map(item => {
          return {
            equipment_type: item.equipment_id,
            equipment_items: [{note: item.note, serial_number: item.serial}]
          }
        })
      })
      if(res === true) {
        await this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
.item-overflow {
  max-height: calc(100vh - 150px);
  overflow: hidden;
  overflow-y: auto;
}
</style>