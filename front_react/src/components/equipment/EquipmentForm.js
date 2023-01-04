import React, {useEffect, useState} from 'react';
import EquipmentFormItem from "./EquipmentFormItem";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {actions, states} from "../../store/slices";
import {EQUIPMENT_MODULE} from "../../store/const";

let equipmentTypeFetchable = true

const EquipmentForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    equipmentTypes,
    equipmentIsLoading
  } = useSelector(states[EQUIPMENT_MODULE.GET_EQUIPMENT_STATE])
  const equipmentSaveAction = actions[EQUIPMENT_MODULE.POST_EQUIPMENT_LIST]
  const fetchEquipmentTypes = actions[EQUIPMENT_MODULE.FETCH_EQUIPMENT_TYPE_LIST]

  useEffect(() => {
    if (equipmentTypeFetchable) {
      const fetch = async () => {
        await dispatch(fetchEquipmentTypes())
        equipmentTypeFetchable = true
      }
      equipmentTypeFetchable = false
      fetch()
    }
  }, [])

  const [newItems, setNewItems] = useState([])
  const appendNewItem = () => {
    setNewItems([...newItems, {
      index: Date.now(),
      equipment_id: null,
      serial: null,
      note: ''
    }])
  }

  const removeItem = item => {
    setNewItems([...newItems.filter(searchItem => searchItem.index !== item.index)])
  }

  const changeItem = item => {
    setNewItems([...newItems.map(searchItem => searchItem.index === item.index ? item : searchItem)])
  }

  const saveNewItems = async () => {
    const resp = await dispatch(equipmentSaveAction({
      equipments: newItems.map(item => {
        return {
          equipment_type: item.equipment_id,
          equipment_items: [{note: item.note, serial_number: item.serial}]
        }
      })
    }))
    if(resp.payload) {
      navigate('/search')
    }
  }

  return (
      <div className="row">
        <div className="col-md-12 p-3">
          <div className="card">
            <div className="card-header align-items-center d-flex justify-content-between">
              <span>Добавить оборудование</span>
              <div className="btn-place d-flex">
                <button
                    disabled={!newItems.length || equipmentIsLoading}
                    className="btn btn-outline-primary me-2" type="button"
                    onClick={saveNewItems}>
                  {equipmentIsLoading ?
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"/> : null}
                  Сохранить
                </button>
                <button
                    disabled={!equipmentTypes.data.length}
                    className="btn btn-outline-primary me-2"
                    type="button" onClick={appendNewItem}>
                  Добавить
                </button>
              </div>
            </div>
            <div className="card-body item-overflow">

              <div className="card mb-3">
                <div className="card-body">
                  <p className="mb-0">Создает регулярное выражение, согласно входной маске</p>
                  <p className="mb-0">N – цифра от 0 до 9</p>
                  <p className="mb-0">A – прописная буква латинского алфавита</p>
                  <p className="mb-0">a – строчная буква латинского алфавита</p>
                  <p className="mb-0">X – прописная буква латинского алфавита либо цифра от 0 до 9</p>
                  <p className="mb-0">Z –символ из списка: “-“, “_”, “@”.</p>
                </div>
              </div>

              {
                newItems.map(item => (
                    <EquipmentFormItem
                        item={item}
                        key={item.index}
                        changeItem={changeItem}
                        removeItem={removeItem}
                    />
                ))
              }
            </div>
          </div>
        </div>
      </div>
  );
};

export default EquipmentForm;