import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {states} from "../../store/slices";
import {EQUIPMENT_MODULE} from "../../store/const";

const EquipmentFormItem = ({item, changeItem, removeItem}) => {
  const {
    equipmentTypes
  } = useSelector(states[EQUIPMENT_MODULE.GET_EQUIPMENT_STATE])

  const [selectedType, setSelectedType] = useState(0)
  const [maskInvalid, setMaskInvalid] = useState(false)

  const equipmentSerialInput = value => {
    setMaskInvalid(!value.match(selectedType.regexp.replaceAll('%', '')))
    changeItem({...item, serial: value})
  }

  const changeType = value => {
    changeItem({...item, equipment_id: value})
    setSelectedType(equipmentTypes.data.find(i => i.id === value))
  }

  const noteInput = value => {
    changeItem({...item, note: value})
  }

  return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title d-flex align-items-center justify-content-between">
            Новое оборудование
            <button className="btn btn-outline-primary me-2" type="button" onClick={() => removeItem(item)}>убрать</button>
          </h5>
          <div className="input-group flex-wrap mb-3">
            <label className="input-group-text">Тип оборудования</label>
            <select defaultValue={0} className="form-select" onChange={({target}) => changeType(Number(target.value))}>
              <option disabled value={0}>Выберите</option>
              {
                equipmentTypes.data.map(types => <option value={types.id} key={types.id}>{types.name}</option>)
              }
            </select>
          </div>

          <div className="input-group flex-nowrap  mb-3">
            <span
                className="input-group-text">Серийный номер {selectedType && `маска: ${selectedType.serial_mask}`}</span>
            <input
                disabled={!selectedType}
                onInput={({target}) => equipmentSerialInput(target.value)}
                type="text"
                className={`form-control ${maskInvalid && 'is-invalid'}`}
                placeholder={selectedType ? `Маска оборудования ${selectedType.serial_mask}` : 'Серийный номер'}
            />
          </div>

          <div className="input-group flex-nowrap  mb-3">
            <span className="input-group-text">Примечание</span>
            <input
                onInput={({target}) => noteInput(target.value)}
                type="text"
                className="form-control"
                placeholder="Примечание"
            />
          </div>
        </div>
      </div>
  );
};

export default EquipmentFormItem;